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
  const { trackConversionWithIpCheck } = useSupabaseTracking();
  const behaviorDetection = useSuspiciousBehaviorDetection('debt_calculator_classic');
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
    const calculatorUsed = localStorage.getItem('debt_calculator_used');
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

    // Zapisz dane do localStorage dla porównania
    localStorage.setItem('calculator_data_classic', JSON.stringify({
      income: incomeVal,
      paydayDebt: paydayVal,
      bankDebt: bankVal,
      timestamp: Date.now()
    }));
    
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
      
      // Track konwersję dla testu A/B glowna1_calculator (tylko raz na IP)
      console.log('🧮 Calculator positive result - checking IP and tracking conversion');
      const converted = await trackConversionWithIpCheck('calculator_success', 'A', 'glowna1_calculator');
      
      if (converted) {
        console.log('✅ Conversion tracked - redirecting to /kontakt');
      } else {
        console.log('🚫 IP already converted - redirecting without tracking');
      }
      
      // Przekieruj do strony kontakt (zawsze, niezależnie od trackingu)
      window.location.href = '/kontakt?income=' + encodeURIComponent(incomeVal) + '&paydayDebt=' + encodeURIComponent(paydayVal) + '&bankDebt=' + encodeURIComponent(bankVal) + '&result=positive&data=' + encodedData;
      return;
    }

    if (total <= maxLim) {
      // Zakoduj dane i dodaj do URL dla trackingu
      const encodedData = btoa(`${incomeVal},${paydayVal},${bankVal}`);
      
      // Track konwersję dla testu A/B glowna1_calculator (tylko raz na IP)
      console.log('🧮 Calculator warning result - checking IP and tracking conversion');
      const converted = await trackConversionWithIpCheck('calculator_success', 'A', 'glowna1_calculator');
      
      if (converted) {
        console.log('✅ Conversion tracked - redirecting to /kontakt');
      } else {
        console.log('🚫 IP already converted - redirecting without tracking');
      }
      
      // Przekieruj do strony kontakt (zawsze, niezależnie od trackingu)
      window.location.href = '/kontakt?income=' + encodeURIComponent(incomeVal) + '&paydayDebt=' + encodeURIComponent(paydayVal) + '&bankDebt=' + encodeURIComponent(bankVal) + '&result=warning&data=' + encodedData;
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

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 items-start h-full">
        {/* Formularz rejestracyjny - pokazuje się automatycznie po pozytywnym wyniku */}
        {result.showForm ? (
          <div className="animate-fade-in h-full">
            <QuickRegistrationForm calculatorData={{ income, paydayDebt, bankDebt }} />
          </div>
        ) : (
          <>
            {/* Kalkulator - oryginalny widok z blokadą */}
            <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[600px] w-full">
              <div>
                <div className="text-center mb-3 lg:mb-4">
                  <div className="flex justify-center items-center mb-2 lg:mb-3">
                    <div className="bg-gradient-to-r from-navy-900 to-business-blue-600 p-2 lg:p-3 rounded-full">
                      <Calculator className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-lg lg:text-xl xl:text-2xl font-bold text-navy-900 mb-1 lg:mb-2">
                    Kalkulator Oddłużania
                  </h2>
                  <p className="text-warm-neutral-600 text-sm lg:text-base leading-relaxed">
                    {hasUsedCalculator ? 
                      "Kalkulator został już wykorzystany" : 
                      "Sprawdź, czy możemy Ci pomóc w konsolidacji chwilówek"
                    }
                  </p>
                </div>

                {/* Sekcja z Dariuszem i zespołem - bardzo zmniejszona */}
                <div className="text-center mb-3 lg:mb-4 bg-gradient-to-r from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 rounded-xl p-2 lg:p-3 border border-warm-neutral-200">
                  <div className="flex justify-center items-center mb-1 lg:mb-2">
                    <div className="flex items-center space-x-1">
                      {/* Dariusz main photo - bardzo zmniejszony */}
                      <img 
                        src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                        alt="Dariusz Wentrych"
                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-prestige-gold-400 shadow-md object-cover"
                      />
                      
                      {/* Plus icon - bardzo zmniejszony */}
                      <Plus className="w-1.5 h-1.5 lg:w-2 lg:h-2 text-prestige-gold-400" />
                      
                      {/* Team members - bardzo zmniejszeni */}
                      <div className="flex items-center space-x-0.5">
                        <Avatar className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-prestige-gold-400">
                          <AvatarImage 
                            src="/lovable-uploads/763d172c-71d2-4164-a6e6-97c3127b6592.png"
                            alt="Członek zespołu"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xs">KZ</AvatarFallback>
                        </Avatar>
                        <Avatar className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-prestige-gold-400">
                          <AvatarImage 
                            src="/lovable-uploads/cbddfa95-6c86-4139-b791-f13477aaea8a.png"
                            alt="Członek zespołu"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xs">MK</AvatarFallback>
                        </Avatar>
                        <Avatar className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-prestige-gold-400">
                          <AvatarImage 
                            src="/lovable-uploads/73083e2d-4631-4f25-abd0-a482d29bb838.png"
                            alt="Członek zespołu"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xs">AS</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                  <div className="mb-1">
                    <h3 className="text-xs lg:text-sm font-semibold text-navy-800">Eksperci w oddłużeniu</h3>
                    <p className="text-xs text-warm-neutral-600">20+ lat doświadczenia</p>
                  </div>
                </div>

                {/* Zmieniona informacja na pozytywną i zachęcającą */}
                {!hasUsedCalculator && (
                  <div className="mt-3 mb-4 p-4 bg-gradient-to-r from-success-50 to-blue-50 border-2 border-success-300 rounded-xl shadow-md">
                    <div className="flex items-center justify-center">
                      <div className="bg-success-100 p-2 rounded-full mr-3">
                        <Shield className="w-5 h-5 text-success-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-success-800 text-sm font-bold">
                          ✨ Podaj prawdziwe dane - to gwarantuje najlepszą pomoc
                        </p>
                        <p className="text-success-700 text-xs mt-1">
                          Precyzyjna analiza = skuteczne rozwiązanie Twojego problemu
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 lg:space-y-4">
                <div>
                  <Label htmlFor="income" className="text-navy-800 font-medium text-sm lg:text-base">
                    Twój dochód netto (umowa o pracę)
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="income"
                      type="text"
                      value={income}
                      onChange={handleIncomeChange}
                      placeholder="4 000"
                      disabled={hasUsedCalculator}
                      className={`pr-12 text-right h-12 lg:h-14 xl:h-16 text-lg lg:text-xl xl:text-2xl font-semibold ${hasUsedCalculator ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-sm lg:text-base">
                      PLN
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="payday" className="text-navy-800 font-medium text-sm lg:text-base">
                    Suma wszystkich chwilówek/parabanków
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="payday"
                      type="text"
                      value={paydayDebt}
                      onChange={handlePaydayChange}
                      placeholder="70 000"
                      disabled={hasUsedCalculator}
                      className={`pr-12 text-right h-12 lg:h-14 xl:h-16 text-lg lg:text-xl xl:text-2xl font-semibold ${hasUsedCalculator ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-sm lg:text-base">
                      PLN
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bank" className="text-navy-800 font-medium text-sm lg:text-base">
                    Suma wszystkich kredytów bankowych
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="bank"
                      type="text"
                      value={bankDebt}
                      onChange={handleBankChange}
                      placeholder="50 000"
                      disabled={hasUsedCalculator}
                      className={`pr-12 text-right h-12 lg:h-14 xl:h-16 text-lg lg:text-xl xl:text-2xl font-semibold ${hasUsedCalculator ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-sm lg:text-base">
                      PLN
                    </span>
                  </div>
                </div>

                <Button
                  onClick={calculate}
                  disabled={hasUsedCalculator}
                  className={`w-full font-bold py-4 lg:py-5 text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 h-14 lg:h-16 ${
                    hasUsedCalculator 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white'
                  }`}
                >
                  <Calculator className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  {hasUsedCalculator ? 'Kalkulator został wykorzystany' : 'Sprawdź czy Ci pomożemy'}
                </Button>

                {hasUsedCalculator && !result.showForm && (
                  <div className="p-3 lg:p-4 rounded-xl border-2 bg-blue-50 border-blue-200 text-blue-700">
                    <p className="font-medium leading-relaxed text-sm lg:text-base text-center">
                      📞 Masz pytania? Zadzwoń bezpośrednio: <strong>+48 663 024 522</strong>
                    </p>
                  </div>
                )}

                {result.message && !result.showForm && (
                  <div className={`p-3 lg:p-4 rounded-xl border-2 ${getResultClasses()}`}>
                    <div className="flex items-start space-x-3">
                      {getResultIcon()}
                      <div className="flex-1">
                        <p className="font-medium leading-relaxed text-sm lg:text-base">
                          {result.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DebtCalculator;
