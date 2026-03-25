import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, CheckCircle, AlertCircle, XCircle, Plus, Star, Shield } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import QuickRegistrationForm from './QuickRegistrationForm';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';
import { useSuspiciousBehaviorDetection } from '../hooks/useSuspiciousBehaviorDetection';

const DebtCalculator = () => {
  const { trackConversion } = useSupabaseTracking();
  const behaviorDetection = useSuspiciousBehaviorDetection('debt_calculator_classic');
  const [income, setIncome] = useState('');
  const [paydayDebt, setPaydayDebt] = useState('');
  const [bankDebt, setBankDebt] = useState('');
  const [hasBikReport, setHasBikReport] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasUsedCalculator, setHasUsedCalculator] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    type: 'positive' | 'warning' | 'negative' | null;
    showForm: boolean;
  }>({ message: '', type: null, showForm: false });

  const totalSteps = 3;

  // Sprawdź czy kalkulator był już używany
  useEffect(() => {
    const calculatorUsed = localStorage.getItem('debt_calculator_used');
    if (calculatorUsed === 'true') {
      setHasUsedCalculator(true);
      setCurrentStep(3);
    }
  }, []);

  // Nawigacja kroków
  const goToNextStep = () => {
    if (currentStep < totalSteps && !hasUsedCalculator) {
      setCurrentStep(prev => prev + 1);
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

    // Sprawdzenie minimalnego dochodu
    if (incomeVal < 3000) {
      setResult({
        message: 'Niestety, przy dochodzie poniżej 3000 PLN nie możemy zaproponować skutecznego rozwiązania.',
        type: 'negative',
        showForm: false
      });
      return;
    }

    // Analizuj dane finansowe pod kątem podejrzanych zachowań
    behaviorDetection.analyzeFinancialData({
      income: incomeVal,
      paydayDebt: paydayVal,
      bankDebt: bankVal
    });

    // Zapisz dane do bazy danych
    await saveCalculatorData(incomeVal, paydayVal, bankVal);

    // Oznacz kalkulator jako użyty
    localStorage.setItem('debt_calculator_used', 'true');
    setHasUsedCalculator(true);
    
    // Wyślij custom event żeby inne komponenty wiedziały o zmianie
    window.dispatchEvent(new CustomEvent('calculatorUsed'));

    // Limity z marginesem
    const nbLim = nonBankLimit(incomeVal) + MARGIN;
    const baseLim = totalLimit(incomeVal) + MARGIN;
    const maxLim = postCostLimit(incomeVal) + MARGIN;

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
      // Zakoduj dane i dodaj do URL dla trackingu
      const encodedData = btoa(`${incomeVal},${paydayVal},${bankVal}`);
      
      // Track konwersję dla testu A/B glowna1_calculator
      console.log('🧮 Calculator positive result - tracking conversion and redirect to /kontakt');
      trackConversion('calculator_success', 'A', 'glowna1_calculator');
      // Przekieruj do strony kontakt zamiast pokazywać formularz
      window.location.href = '/kontakt?income=' + encodeURIComponent(incomeVal) + '&paydayDebt=' + encodeURIComponent(paydayVal) + '&bankDebt=' + encodeURIComponent(bankVal) + '&hasBikReport=' + encodeURIComponent(hasBikReport === true ? 'tak' : 'nie') + '&result=positive&data=' + encodedData;
      return;
    }

    if (total <= maxLim) {
      // Zakoduj dane i dodaj do URL dla trackingu
      const encodedData = btoa(`${incomeVal},${paydayVal},${bankVal}`);
      
      // Track konwersję dla testu A/B glowna1_calculator
      console.log('🧮 Calculator warning result - tracking conversion and redirect to /kontakt');
      trackConversion('calculator_success', 'A', 'glowna1_calculator');
      // Przekieruj do strony kontakt zamiast pokazywać formularz
      window.location.href = '/kontakt?income=' + encodeURIComponent(incomeVal) + '&paydayDebt=' + encodeURIComponent(paydayVal) + '&bankDebt=' + encodeURIComponent(bankVal) + '&hasBikReport=' + encodeURIComponent(hasBikReport === true ? 'tak' : 'nie') + '&result=warning&data=' + encodedData;
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
      const newValue = formatNumber(e.target.value);
      setIncome(newValue);
      
      // Sprawdź czy poprzednie dane z localStorage różnią się od nowych
      const storedData = localStorage.getItem('previous_income_data');
      if (storedData) {
        const prevIncome = JSON.parse(storedData);
        const currentIncome = parsePLN(newValue);
        if (Math.abs(prevIncome - currentIncome) > prevIncome * 0.2) { // 20% różnica
          behaviorDetection.addSuspiciousFlag('income_inconsistency_vs_previous');
          console.log('🚨 Detected income inconsistency vs previous data');
        }
      }
      
      // Sprawdź dane z głównej strony
      const originalData = localStorage.getItem('original_main_data');
      if (originalData) {
        try {
          const parsed = JSON.parse(originalData);
          const currentIncome = parsePLN(newValue);
          if (Math.abs(parsed.income - currentIncome) > parsed.income * 0.15) { // 15% różnica
            behaviorDetection.addSuspiciousFlag('income_inconsistency_vs_main_page');
            console.log('🚨 Detected income inconsistency vs main page data');
          }
        } catch (error) {
          console.error('Error parsing original data:', error);
        }
      }
      
      // Zapisz aktualne dane
      localStorage.setItem('previous_income_data', JSON.stringify(parsePLN(newValue)));
    }
  };

  const handlePaydayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasUsedCalculator) {
      const newValue = formatNumber(e.target.value);
      setPaydayDebt(newValue);
      
      // Sprawdź czy poprzednie dane z localStorage różnią się od nowych
      const storedData = localStorage.getItem('previous_payday_data');
      if (storedData) {
        const prevPayday = JSON.parse(storedData);
        const currentPayday = parsePLN(newValue);
        if (Math.abs(prevPayday - currentPayday) > Math.max(prevPayday * 0.3, 5000)) { // 30% różnica lub 5000 PLN
          behaviorDetection.addSuspiciousFlag('payday_debt_inconsistency_vs_previous');
          console.log('🚨 Detected payday debt inconsistency vs previous data');
        }
      }
      
      // Sprawdź dane z głównej strony
      const originalData = localStorage.getItem('original_main_data');
      if (originalData) {
        try {
          const parsed = JSON.parse(originalData);
          const currentPayday = parsePLN(newValue);
          if (Math.abs(parsed.paydayDebt - currentPayday) > Math.max(parsed.paydayDebt * 0.2, 3000)) { // 20% różnica lub 3000 PLN
            behaviorDetection.addSuspiciousFlag('payday_debt_inconsistency_vs_main_page');
            console.log('🚨 Detected payday debt inconsistency vs main page data');
          }
        } catch (error) {
          console.error('Error parsing original data:', error);
        }
      }
      
      // Zapisz aktualne dane
      localStorage.setItem('previous_payday_data', JSON.stringify(parsePLN(newValue)));
    }
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasUsedCalculator) {
      const newValue = formatNumber(e.target.value);
      setBankDebt(newValue);
      
      // Sprawdź czy poprzednie dane z localStorage różnią się od nowych
      const storedData = localStorage.getItem('previous_bank_data');
      if (storedData) {
        const prevBank = JSON.parse(storedData);
        const currentBank = parsePLN(newValue);
        if (Math.abs(prevBank - currentBank) > Math.max(prevBank * 0.3, 5000)) { // 30% różnica lub 5000 PLN
          behaviorDetection.addSuspiciousFlag('bank_debt_inconsistency_vs_previous');
          console.log('🚨 Detected bank debt inconsistency vs previous data');
        }
      }
      
      // Sprawdź dane z głównej strony
      const originalData = localStorage.getItem('original_main_data');
      if (originalData) {
        try {
          const parsed = JSON.parse(originalData);
          const currentBank = parsePLN(newValue);
          if (Math.abs(parsed.bankDebt - currentBank) > Math.max(parsed.bankDebt * 0.2, 3000)) { // 20% różnica lub 3000 PLN
            behaviorDetection.addSuspiciousFlag('bank_debt_inconsistency_vs_main_page');
            console.log('🚨 Detected bank debt inconsistency vs main page data');
          }
        } catch (error) {
          console.error('Error parsing original data:', error);
        }
      }
      
      // Zapisz aktualne dane
      localStorage.setItem('previous_bank_data', JSON.stringify(parsePLN(newValue)));
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

  const renderStepContent = () => {
    if (hasUsedCalculator) {
      return (
        <div className="text-center animate-fade-in">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">Kalkulator wykorzystany</h3>
            <p className="text-warm-neutral-600 mb-6">Kalkulator może być użyty tylko raz na sesję</p>
          </div>
          <div className="p-4 rounded-xl border-2 bg-blue-50 border-blue-200 text-blue-700">
            <p className="font-medium">📞 Masz pytania? Zadzwoń: <strong>+48 663 024 522</strong></p>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="text-center animate-fade-in w-full max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-navy-900 to-business-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Jaki jest Twój dochód?</h3>
              <p className="text-warm-neutral-600">Podaj miesięczny dochód netto</p>
            </div>
            <div className="relative mb-6">
              <Input
                type="text"
                value={income}
                onChange={handleIncomeChange}
                placeholder="4 000"
                className="pr-16 text-center h-16 text-2xl font-bold border-4 border-blue-400 focus:border-blue-600 rounded-xl"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl font-bold">PLN</span>
            </div>
            <Button
              onClick={goToNextStep}
              disabled={!income || parsePLN(income) < 3000}
              className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
            >
              {parsePLN(income) < 3000 && income ? '⚠️ Minimum 3000 PLN' : '✅ Dalej →'}
            </Button>
            {income && parsePLN(income) < 3000 && (
              <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-700 font-medium text-sm">⚠️ Przy dochodzie poniżej 3000 PLN nie możemy pomóc</p>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Chwilówki i parabanki</h3>
              <p className="text-warm-neutral-600">Suma wszystkich chwilówek i pożyczek pozabankowych</p>
            </div>
            <div className="relative mb-4">
              <Input
                type="text"
                value={paydayDebt}
                onChange={handlePaydayChange}
                placeholder="30 000"
                className="pr-16 text-center h-16 text-2xl font-bold border-4 border-red-400 focus:border-red-600 rounded-xl"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-xl font-bold">PLN</span>
            </div>
            <Button
              onClick={goToNextStep}
              disabled={!paydayDebt}
              className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-navy-900 to-business-blue-600 text-white"
            >
              Dalej →
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏦</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Kredyty bankowe</h3>
              <p className="text-warm-neutral-600">Suma wszystkich kredytów bankowych</p>
            </div>
            <div className="relative mb-4">
              <Input
                type="text"
                value={bankDebt}
                onChange={handleBankChange}
                placeholder="20 000"
                className="pr-16 text-center h-16 text-2xl font-bold border-4 border-green-400 focus:border-green-600 rounded-xl"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-xl font-bold">PLN</span>
            </div>
            <div className="bg-green-100 border-2 border-green-500 rounded-xl p-4 mb-4">
              <p className="text-green-900 font-bold">💡 Wpisz 0 jeśli nie masz kredytów bankowych</p>
            </div>
            <Button
              onClick={calculate}
              disabled={!bankDebt && bankDebt !== '0'}
              className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-navy-900 to-business-blue-600 text-white"
            >
              <Calculator className="w-5 h-5 mr-2" />
              🔍 Sprawdź swój wynik
            </Button>
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
          <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 h-full flex flex-col justify-between min-h-[600px] w-full">
            <div>
              <div className="text-center mb-4">
                <div className="flex justify-center items-center mb-3">
                  <div className="bg-gradient-to-r from-navy-900 to-business-blue-600 p-3 rounded-full">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-navy-900 mb-1">Kalkulator Konsolidacji</h2>
                <p className="text-sm text-warm-neutral-600">Krok {currentStep} z {totalSteps}</p>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-navy-900 to-business-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }} 
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-warm-neutral-600">Postęp</span>
                  <span className="font-bold text-navy-900">{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
              </div>

              {/* Expert section */}
              <div className="text-center mb-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-3 border-2 border-blue-200">
                <div className="flex justify-center items-center">
                  <img 
                    src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                    alt="Dariusz Wentrych"
                    className="w-10 h-10 rounded-full border-2 border-prestige-gold-400 object-cover mr-3"
                  />
                  <div className="text-left">
                    <div className="text-sm font-bold text-navy-900 flex items-center gap-1">
                      Dariusz Wentrych
                      <div className="flex">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </div>
                    <div className="text-xs text-green-700 font-medium">✅ Ekspert nr 1 w konsolidacji kredytów</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step content */}
            <div className="flex-1 flex items-center justify-center px-2">
              {renderStepContent()}
            </div>

            {/* Result message */}
            {result.message && (
              <div className={`mt-4 p-4 rounded-xl border-2 ${getResultClasses()}`}>
                <div className="flex items-start space-x-3">
                  {getResultIcon()}
                  <p className="font-medium leading-relaxed text-sm">{result.message}</p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-4 text-center border-t pt-4">
              <div className="flex items-center justify-center space-x-4 text-xs text-warm-neutral-600">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="font-medium">100% bezpieczeństwo</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="font-medium">Darmowa analiza</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtCalculator;
