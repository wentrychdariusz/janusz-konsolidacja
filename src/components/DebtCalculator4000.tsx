import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, CheckCircle, AlertCircle, XCircle, Plus, Star, Shield } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import QuickRegistrationForm from './QuickRegistrationForm';
import { supabase } from '@/integrations/supabase/client';

const DebtCalculator4000 = () => {
  const [income, setIncome] = useState('');
  const [paydayDebt, setPaydayDebt] = useState('');
  const [bankDebt, setBankDebt] = useState('');
  const [hasUsedCalculator, setHasUsedCalculator] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    type: 'positive' | 'warning' | 'negative' | null;
    showForm: boolean;
  }>({ message: '', type: null, showForm: false });

  // Sprawdź czy kalkulator był już używany
  useEffect(() => {
    const calculatorUsed = localStorage.getItem('debt_calculator_4000_used');
    if (calculatorUsed === 'true') {
      setHasUsedCalculator(true);
    }
  }, []);

  // Stałe z oryginalnego kalkulatora
  const MARGIN = 10000;

  const parsePLN = (val: string) => {
    const clean = (val || '').toString().replace(/\s+/g, '').replace(',', '.');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  };

  const nonBankLimit = (income: number) => 
    income <= 3500 ? income * (50000 / 3500) : 50000 + (income - 3500) * 40;
  
  const totalLimit = (income: number) => income * 22.5;
  
  const postCostLimit = (income: number) => income * 30;

  const saveCalculatorData = async (incomeVal: number, paydayVal: number, bankVal: number) => {
    try {
      const sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      await supabase
        .from('calculator_usage')
        .insert({
          session_id: sessionId,
          income: incomeVal,
          debt_amount: paydayVal + bankVal
        });

      console.log('💾 Dane kalkulatora zapisane do bazy danych');
    } catch (error) {
      console.error('Błąd podczas zapisywania danych kalkulatora:', error);
    }
  };

  const calculate = async () => {
    // Blokada ponownego użycia
    if (hasUsedCalculator) {
      return;
    }

    const incomeVal = parsePLN(income);
    const paydayVal = parsePLN(paydayDebt);
    const bankVal = parsePLN(bankDebt);

    if (!incomeVal || !paydayVal) {
      setResult({
        message: 'Podaj dochód oraz kwotę chwilówek/parabanków, abyśmy mogli pomóc.',
        type: 'warning',
        showForm: false
      });
      return;
    }

    // Zapisz dane do bazy danych
    await saveCalculatorData(incomeVal, paydayVal, bankVal);

    // Oznacz kalkulator jako użyty
    localStorage.setItem('debt_calculator_4000_used', 'true');
    setHasUsedCalculator(true);

    // Wyślij custom event żeby inne komponenty wiedziały o zmianie
    window.dispatchEvent(new CustomEvent('calculatorUsed'));

    // Przygotuj dane do przekazania agentowi
    const baseUrl = '/kontakt?income=' + encodeURIComponent(incomeVal) + 
                   '&paydayDebt=' + encodeURIComponent(paydayVal) + 
                   '&bankDebt=' + encodeURIComponent(bankVal) + 
                   '&source=4000_page';

    // Limity z marginesem
    const nbLim = nonBankLimit(incomeVal) + MARGIN;
    const baseLim = totalLimit(incomeVal) + MARGIN;
    const maxLim = postCostLimit(incomeVal) + MARGIN;
    const total = paydayVal + bankVal;

    if (paydayVal > 0 && paydayVal < 5000) {
      setResult({
        message: 'W przypadku długów poniżej 5000 PLN zalecamy bezpośredni kontakt z konsultantem.',
        type: 'warning',
        showForm: true
      });
      return;
    }

    if (incomeVal < 3000) {
      setResult({
        message: 'Niestety, przy dochodzie poniżej 3000 PLN nie możemy zaproponować skutecznego rozwiązania.',
        type: 'negative',
        showForm: false
      });
      return;
    }

    if (total <= nbLim && paydayVal >= 5000) {
      // Track przekierowanie z kalkulatora
      console.log('🧮 Calculator 4000 positive result - tracking redirect to /kontakt');
      // Przekieruj do strony kontakt z informacjami dla agenta
      window.location.href = baseUrl + '&result=positive';
      return;
    }

    if (total <= baseLim) {
      // Track przekierowanie z kalkulatora
      console.log('🧮 Calculator 4000 positive result - tracking redirect to /kontakt');
      // Przekieruj do strony kontakt z informacjami dla agenta
      window.location.href = baseUrl + '&result=positive';
      return;
    }

    if (total <= maxLim) {
      // Track przekierowanie z kalkulatora
      console.log('🧮 Calculator 4000 warning result - tracking redirect to /kontakt');
      // Przekieruj do strony kontakt z informacjami dla agenta
      window.location.href = baseUrl + '&result=warning';
      return;
    }

    // Dla bardzo wysokich długów
    console.log('🧮 Calculator 4000 high debt - redirect to consultant');
    window.location.href = baseUrl + '&result=consultant&reason=high_debt';
  };

  const formatNumber = (value: string) => {
    // Usuń wszystkie spacje i pozostaw tylko cyfry
    const num = value.replace(/\s/g, '').replace(/\D/g, '');
    // Formatuj z spacjami co 3 cyfry
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasUsedCalculator) {
      setIncome(formatNumber(e.target.value));
    }
  };

  const handlePaydayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasUsedCalculator) {
      setPaydayDebt(formatNumber(e.target.value));
    }
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasUsedCalculator) {
      setBankDebt(formatNumber(e.target.value));
    }
  };

  const resetCalculator = () => {
    // Wyczyść localStorage
    localStorage.removeItem('debt_calculator_4000_used');
    
    // Zresetuj wszystkie stany
    setIncome('');
    setPaydayDebt('');
    setBankDebt('');
    setHasUsedCalculator(false);
    setResult({
      message: '',
      type: null,
      showForm: false
    });

    console.log('🔄 Kalkulator 4000 został zresetowany');
  };

  const getResultIcon = () => {
    switch (result.type) {
      case 'positive':
        return <CheckCircle className="w-6 h-6 text-success-600" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-prestige-gold-600" />;
      case 'negative':
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return null;
    }
  };

  const getResultClasses = () => {
    switch (result.type) {
      case 'positive':
        return 'text-success-700 bg-success-50 border-success-200';
      case 'warning':
        return 'text-prestige-gold-700 bg-prestige-gold-50 border-prestige-gold-200';
      case 'negative':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return '';
    }
  };

  if (hasUsedCalculator) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-2 border-warm-neutral-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">Kalkulator wykorzystany</h3>
            <p className="text-warm-neutral-600 mb-6">
              Kalkulator może być użyty tylko raz na sesję
            </p>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl border-2 bg-blue-50 border-blue-200 text-blue-700">
                <p className="font-medium">
                  📞 Masz pytania? Zadzwoń: <strong>+48 663 024 522</strong>
                </p>
              </div>
              
              {/* Przycisk reset do testowania */}
              <div className="p-4 rounded-xl border-2 bg-yellow-50 border-yellow-200">
                <p className="text-yellow-800 text-sm mb-3">
                  🧪 <strong>Tryb testowy:</strong> Możesz zresetować kalkulator
                </p>
                <Button 
                  onClick={resetCalculator} 
                  variant="outline" 
                  className="w-full h-12 bg-white border-2 border-yellow-400 text-yellow-800 hover:bg-yellow-50 font-semibold"
                >
                  🔄 Reset kalkulatora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-2 border-warm-neutral-200">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-navy-900 to-business-blue-600 rounded-full flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900">Kalkulator Oddłużenia</h3>
          </div>
          <p className="text-warm-neutral-600 text-sm">
            Sprawdź swoją sytuację finansową w 3 prostych krokach
          </p>
        </div>

        <div className="space-y-6">
          {/* Dochód */}
          <div>
            <Label htmlFor="income" className="text-navy-900 font-semibold text-base mb-3 block">
              💰 Miesięczny dochód netto (PLN)
            </Label>
            <Input
              id="income"
              type="text"
              value={income}
              onChange={handleIncomeChange}
              placeholder="4 000"
              className="h-14 text-lg font-medium text-center border-2 border-navy-400 focus:border-navy-600"
              disabled={hasUsedCalculator}
            />
          </div>

          {/* Chwilówki */}
          <div>
            <Label htmlFor="payday" className="text-navy-900 font-semibold text-base mb-3 block">
              🏦 Chwilówki i parabanki (PLN)
            </Label>
            <Input
              id="payday"
              type="text"
              value={paydayDebt}
              onChange={handlePaydayChange}
              placeholder="30 000"
              className="h-14 text-lg font-medium text-center border-2 border-navy-400 focus:border-navy-600"
              disabled={hasUsedCalculator}
            />
          </div>

          {/* Kredyty bankowe */}
          <div>
            <Label htmlFor="bank" className="text-navy-900 font-semibold text-base mb-3 block">
              🏛️ Kredyty bankowe (PLN)
            </Label>
            <Input
              id="bank"
              type="text"
              value={bankDebt}
              onChange={handleBankChange}
              placeholder="20 000"
              className="h-14 text-lg font-medium text-center border-2 border-navy-400 focus:border-navy-600"
              disabled={hasUsedCalculator}
            />
          </div>

          {/* Przycisk oblicz */}
          <Button
            onClick={calculate}
            disabled={hasUsedCalculator || !income || !paydayDebt}
            className="w-full h-16 text-lg font-bold bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {hasUsedCalculator ? 'Kalkulator wykorzystany' : 'SPRAWDŹ MOŻLIWOŚCI'}
          </Button>

          {/* Wynik */}
          {result.message && (
            <div className={`p-4 rounded-xl border-2 ${getResultClasses()}`}>
              <div className="flex items-center gap-3 mb-2">
                {getResultIcon()}
                <span className="font-semibold">Wynik analizy:</span>
              </div>
              <p className="mb-4">{result.message}</p>
              
              {result.showForm && (
                <div className="mt-4 pt-4 border-t border-current/20">
                  <QuickRegistrationForm />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sekcja z ekspertami */}
        <div className="mt-8 pt-6 border-t border-warm-neutral-200">
          <div className="text-center">
            <p className="text-warm-neutral-600 text-sm mb-4">
              🏆 Zaufało nam już ponad <strong className="text-prestige-gold-600">15,000</strong> klientów
            </p>
            
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="flex -space-x-2">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" />
                  <AvatarFallback>DW</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/lovable-uploads/47a03bb7-de4c-4a31-87c2-1a15bb5c649d.png" />
                  <AvatarFallback>EK</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/lovable-uploads/330d84ab-e471-4a60-a2ba-b131b0db582d.png" />
                  <AvatarFallback>AW</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <div className="flex justify-center items-center gap-6 text-xs text-warm-neutral-500">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Bezpieczne</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Sprawdzone</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>5.0/5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtCalculator4000;