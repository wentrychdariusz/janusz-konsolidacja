import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, CheckCircle, AlertCircle, XCircle, Plus, Star, Shield, Briefcase, Users, Building } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import QuickRegistrationForm from './QuickRegistrationForm';
import { supabase } from '@/integrations/supabase/client';

const DebtCalculatorBeta = () => {
  const [income, setIncome] = useState('');
  const [incomeType, setIncomeType] = useState('');
  const [paydayDebt, setPaydayDebt] = useState('');
  const [bankDebt, setBankDebt] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [hasUsedCalculator, setHasUsedCalculator] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    type: 'positive' | 'warning' | 'negative' | null;
    showForm: boolean;
  }>({ message: '', type: null, showForm: false });

  const totalSteps = 4;

  // Sprawdź czy kalkulator był już używany
  useEffect(() => {
    const calculatorUsed = localStorage.getItem('debt_calculator_beta_used');
    if (calculatorUsed === 'true') {
      setHasUsedCalculator(true);
      setCurrentStep(6); // Pokaż końcowy ekran
    }
  }, []);

  // Auto-przejście do następnego kroku
  const goToNextStep = () => {
    if (currentStep < totalSteps && !hasUsedCalculator) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1 && !hasUsedCalculator) {
      setCurrentStep(prev => prev - 1);
    }
  };

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

  const saveCalculatorData = async (incomeVal: number, paydayVal: number, bankVal: number, incomeTypeVal: string) => {
    try {
      const sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      await supabase
        .from('calculator_usage')
        .insert({
          session_id: sessionId,
          income: incomeVal,
          debt_amount: paydayVal + bankVal,
          income_type: incomeTypeVal // Dodajemy typ dochodu
        });
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

    if (!incomeType) {
      setResult({
        message: 'Wybierz typ swojego dochodu, aby kontynuować analizę.',
        type: 'warning',
        showForm: false
      });
      return;
    }

    // Sprawdzenie minimalnego dochodu
    if (incomeVal < 3000) {
      setResult({
        message: 'Niestety, przy dochodzie poniżej 3000 PLN nie możemy zaproponować skutecznego rozwiązania.',
        type: 'negative',
        showForm: false
      });
      return;
    }

    // Zapisz dane do bazy danych z typem dochodu
    await saveCalculatorData(incomeVal, paydayVal, bankVal, incomeType);

    // Oznacz kalkulator jako użyty
    localStorage.setItem('debt_calculator_beta_used', 'true');
    setHasUsedCalculator(true);
    
    // Wyślij custom event żeby inne komponenty wiedziały o zmianie
    window.dispatchEvent(new CustomEvent('calculatorUsed'));

    // Limity z marginesem (można je modyfikować w zależności od typu dochodu)
    let nbLim = nonBankLimit(incomeVal) + MARGIN;
    let baseLim = totalLimit(incomeVal) + MARGIN;
    let maxLim = postCostLimit(incomeVal) + MARGIN;

    // Modyfikacja limitów w zależności od typu dochodu
    switch (incomeType) {
      case 'umowa_o_prace':
        // Najwyższe limity - stabilny dochód
        break;
      case 'umowa_zlecenie':
        // Obniżone limity o 25%
        nbLim *= 0.75;
        baseLim *= 0.75;
        maxLim *= 0.75;
        break;
      case 'inne':
        // Obniżone limity o 40%
        nbLim *= 0.6;
        baseLim *= 0.6;
        maxLim *= 0.6;
        break;
    }

    if (paydayVal > nbLim) {
      setResult({
        message: 'Niestety przy tej kwocie chwilówek nie możemy zaoferować bezpiecznej konsolidacji.',
        type: 'negative',
        showForm: false
      });
      return;
    }

    const total = paydayVal + bankVal;

    if (total <= baseLim) {
      // Track przekierowanie z kalkulatora
      console.log('🧮 Calculator Beta positive result - tracking redirect to /kontakt');
      // Przekieruj do strony kontakt zamiast pokazywać formularz
      window.location.href = '/kontakt?income=' + encodeURIComponent(incomeVal) + '&paydayDebt=' + encodeURIComponent(paydayVal) + '&bankDebt=' + encodeURIComponent(bankVal) + '&incomeType=' + encodeURIComponent(incomeType) + '&result=positive&source=beta';
      return;
    }

    if (total <= maxLim) {
      // Track przekierowanie z kalkulatora
      console.log('🧮 Calculator Beta warning result - tracking redirect to /kontakt');
      // Przekieruj do strony kontakt zamiast pokazywać formularz
      window.location.href = '/kontakt?income=' + encodeURIComponent(incomeVal) + '&paydayDebt=' + encodeURIComponent(paydayVal) + '&bankDebt=' + encodeURIComponent(bankVal) + '&incomeType=' + encodeURIComponent(incomeType) + '&result=warning&source=beta';
      return;
    }

    setResult({
      message: 'Na ten moment nie możemy zaproponować skutecznego rozwiązania. Zachęcamy do kontaktu, gdyby Twoja sytuacja się zmieniła.',
      type: 'negative',
      showForm: false
    });
  };

  const formatNumber = (value: string) => {
    const num = value.replace(/\D/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasUsedCalculator) {
      setIncome(formatNumber(e.target.value));
    }
  };

  const handleIncomeTypeSelect = (type: string) => {
    setIncomeType(type);
    setTimeout(goToNextStep, 300);
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

  const getIncomeTypeLabel = (type: string) => {
    switch (type) {
      case 'umowa_o_prace':
        return 'Umowa o pracę';
      case 'umowa_zlecenie':
        return 'Umowa zlecenie';
      case 'inne':
        return 'Inne źródła dochodu';
      default:
        return '';
    }
  };

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div 
        className="bg-gradient-to-r from-navy-900 to-business-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );

  const renderStepContent = () => {
    if (hasUsedCalculator) {
      return (
        <div className="text-center animate-fade-in">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">Kalkulator wykorzystany</h3>
            <p className="text-warm-neutral-600">
              Kalkulator może być użyty tylko raz
            </p>
          </div>
          <div className="p-4 rounded-xl border-2 bg-blue-50 border-blue-200 text-blue-700">
            <p className="font-medium">
              📞 Masz pytania? Zadzwoń: <strong>+48 663 024 522</strong>
            </p>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-navy-900 to-business-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Rodzaj dochodu</h3>
              <p className="text-warm-neutral-600">
                Wybierz źródło swojego dochodu
              </p>
            </div>
            <div className="space-y-3">
              <Button
                type="button"
                variant={incomeType === 'umowa_o_prace' ? 'default' : 'outline'}
                onClick={() => handleIncomeTypeSelect('umowa_o_prace')}
                className={`h-16 w-full text-left justify-start p-4 text-base ${
                  incomeType === 'umowa_o_prace' 
                    ? 'bg-gradient-to-r from-navy-900 to-business-blue-600 text-white' 
                    : 'hover:bg-blue-50 border-2'
                }`}
              >
                <div className="flex items-center w-full">
                  <div className="text-2xl mr-4">💼</div>
                  <div>
                    <div className="font-semibold">Umowa o pracę</div>
                    <div className={`text-sm ${incomeType === 'umowa_o_prace' ? 'text-blue-100' : 'text-gray-500'}`}>
                      Stały miesięczny dochód
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                type="button"
                variant={incomeType === 'umowa_zlecenie' ? 'default' : 'outline'}
                onClick={() => handleIncomeTypeSelect('umowa_zlecenie')}
                className={`h-16 w-full text-left justify-start p-4 text-base ${
                  incomeType === 'umowa_zlecenie' 
                    ? 'bg-gradient-to-r from-navy-900 to-business-blue-600 text-white' 
                    : 'hover:bg-blue-50 border-2'
                }`}
              >
                <div className="flex items-center w-full">
                  <div className="text-2xl mr-4">📋</div>
                  <div>
                    <div className="font-semibold">Umowa zlecenie</div>
                    <div className={`text-sm ${incomeType === 'umowa_zlecenie' ? 'text-blue-100' : 'text-gray-500'}`}>
                      Współpraca, B2B, freelance
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                type="button"
                variant={incomeType === 'inne' ? 'default' : 'outline'}
                onClick={() => handleIncomeTypeSelect('inne')}
                className={`h-16 w-full text-left justify-start p-4 text-base ${
                  incomeType === 'inne' 
                    ? 'bg-gradient-to-r from-navy-900 to-business-blue-600 text-white' 
                    : 'hover:bg-blue-50 border-2'
                }`}
              >
                <div className="flex items-center w-full">
                  <div className="text-2xl mr-4">🏛️</div>
                  <div>
                    <div className="font-semibold">Inne źródła</div>
                    <div className={`text-sm ${incomeType === 'inne' ? 'text-blue-100' : 'text-gray-500'}`}>
                      Renta, emerytura, działalność
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-navy-900 to-business-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Jaki jest Twój dochód?</h3>
              <p className="text-warm-neutral-600">Podaj miesięczny dochód netto</p>
            </div>
            <div className="relative">
              <Input
                type="text"
                value={income}
                onChange={handleIncomeChange}
                placeholder="4 000"
                className="pr-12 text-right h-16 text-xl text-center"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-lg">PLN</span>
            </div>
            <Button onClick={goToNextStep} disabled={!income || parsePLN(income) < 3000} className="mt-4 w-full h-12 bg-gradient-to-r from-navy-900 to-business-blue-600 text-white">
              Dalej →
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Chwilówki i parabanki</h3>
              <p className="text-warm-neutral-600">
                Suma wszystkich chwilówek i pożyczek pozabankowych
              </p>
            </div>
            <div className="relative">
              <Input
                type="text"
                value={paydayDebt}
                onChange={handlePaydayChange}
                placeholder="70 000"
                className="pr-12 text-right h-16 text-xl text-center"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-lg">
                PLN
              </span>
            </div>
            <p className="text-warm-neutral-500 text-sm mt-2">
              Podaj dokładną kwotę - to kluczowe dla analizy
            </p>
            <Button onClick={goToNextStep} disabled={!paydayDebt} className="mt-4 w-full h-12 bg-gradient-to-r from-navy-900 to-business-blue-600 text-white">
              Dalej →
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏦</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Kredyty bankowe</h3>
              <p className="text-warm-neutral-600">
                Suma wszystkich kredytów z banków (opcjonalne)
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  value={bankDebt}
                  onChange={handleBankChange}
                  placeholder="0"
                  className="pr-12 text-right h-16 text-xl text-center"
                  autoFocus
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-lg">PLN</span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dochód:</span>
                  <span className="font-semibold">{income} PLN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Typ:</span>
                  <span className="font-semibold">{getIncomeTypeLabel(incomeType)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chwilówki:</span>
                  <span className="font-semibold text-red-600">{paydayDebt || '0'} PLN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kredyty:</span>
                  <span className="font-semibold">{bankDebt || '0'} PLN</span>
                </div>
              </div>

              <Button onClick={calculate} className="w-full font-bold py-4 text-lg rounded-xl h-16 bg-gradient-to-r from-navy-900 to-business-blue-600 text-white">
                <Calculator className="w-5 h-5 mr-2" />
                Sprawdź wynik
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid grid-cols-1 gap-6 items-start h-full">
        {result.showForm ? (
          <div className="animate-fade-in h-full">
            <QuickRegistrationForm calculatorData={{ income, paydayDebt, bankDebt }} />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[600px] w-full">
            <div>
              <div className="text-center mb-6">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-gradient-to-r from-navy-900 to-business-blue-600 p-3 rounded-full">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-navy-900 mb-2">
                  Kalkulator Oddłużania BETA
                </h2>
                <p className="text-warm-neutral-600">
                  Krok {currentStep} z {totalSteps}
                </p>
              </div>

              {renderProgressBar()}

              {/* Sekcja z Dariuszem - mniejsza */}
              <div className="text-center mb-6 bg-gradient-to-r from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 rounded-xl p-3 border border-warm-neutral-200">
                <div className="flex justify-center items-center mb-2">
                  <div className="flex items-center space-x-1">
                    <img 
                      src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                      alt="Dariusz Wentrych"
                      className="w-8 h-8 rounded-full border-2 border-prestige-gold-400 object-cover"
                    />
                    <Plus className="w-1.5 h-1.5 text-prestige-gold-400" />
                    <div className="flex items-center space-x-0.5">
                      <Avatar className="w-5 h-5 border-2 border-prestige-gold-400">
                        <AvatarImage src="/lovable-uploads/763d172c-71d2-4164-a6e6-97c3127b6592.png" className="object-cover" />
                        <AvatarFallback className="text-xs">KZ</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-5 h-5 border-2 border-prestige-gold-400">
                        <AvatarImage src="/lovable-uploads/cbddfa95-6c86-4139-b791-f13477aaea8a.png" className="object-cover" />
                        <AvatarFallback className="text-xs">MK</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-navy-800 font-semibold">Eksperci w oddłużeniu • 20+ lat</p>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              {renderStepContent()}
            </div>

            {/* Nawigacja */}
            {!hasUsedCalculator && currentStep > 1 && currentStep < 4 && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={goToPrevStep}
                  className="flex items-center"
                >
                  ← Cofnij
                </Button>
                <div className="text-sm text-warm-neutral-500">
                  {currentStep}/5
                </div>
              </div>
            )}

            {/* Wynik */}
            {result.message && (
              <div className={`mt-6 p-4 rounded-xl border-2 ${getResultClasses()} animate-fade-in`}>
                <div className="flex items-start space-x-3">
                  {getResultIcon()}
                  <div className="flex-1">
                    <p className="font-medium leading-relaxed">
                      {result.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtCalculatorBeta;