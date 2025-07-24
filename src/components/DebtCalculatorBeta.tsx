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

  const resetCalculator = () => {
    // Wyczyść localStorage
    localStorage.removeItem('debt_calculator_beta_used');
    
    // Zresetuj wszystkie stany
    setIncome('');
    setIncomeType('');
    setPaydayDebt('');
    setBankDebt('');
    setCurrentStep(1);
    setHasUsedCalculator(false);
    setResult({ message: '', type: null, showForm: false });
    
    console.log('🔄 Kalkulator BETA został zresetowany');
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
            <p className="text-warm-neutral-600 mb-6">
              Kalkulator może być użyty tylko raz na sesję
            </p>
          </div>
          
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
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="text-center animate-fade-in w-full max-w-md mx-auto">
            {/* Większy header z migającą ikoną */}
            <div className="mb-8">
              <div className="relative w-20 h-20 bg-gradient-to-r from-navy-900 to-business-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl">💰</span>
                {/* Migająca ikona wskazująca */}
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs">👆</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
                Jaki jest Twój dochód?
              </h3>
              <p className="text-base sm:text-lg text-warm-neutral-600 font-medium">
                Podaj miesięczny dochód netto
              </p>
            </div>

            {/* Duże pole input z lepszą widocznością */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border-2 border-blue-200 mb-6 shadow-lg">
              <div className="relative">
                <Input
                  type="text"
                  value={income}
                  onChange={handleIncomeChange}
                  placeholder="4 000"
                  className="pr-16 text-center h-20 text-2xl sm:text-3xl font-bold border-3 border-blue-300 focus:border-blue-500 rounded-xl shadow-inner"
                  autoFocus
                />
                <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl font-bold">
                  PLN
                </span>
                {/* Migająca animacja dla pustego pola */}
                {!income && (
                  <div className="absolute inset-0 rounded-xl animate-pulse border-2 border-yellow-400 pointer-events-none"></div>
                )}
              </div>
              
              {/* Wskazówka pod polem */}
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-navy-700 font-medium">
                  Wpisz swoją kwotę tutaj ⬆️
                </p>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Duży przycisk */}
            <Button 
              onClick={goToNextStep} 
              disabled={!income || parsePLN(income) < 3000} 
              className={`w-full h-16 text-lg font-bold rounded-xl transition-all duration-300 ${
                income && parsePLN(income) >= 3000
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 border-0'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {income && parsePLN(income) < 3000 
                ? '⚠️ Minimum 3000 PLN' 
                : '✅ Dalej →'
              }
            </Button>

            {/* Komunikat o minimum */}
            {income && parsePLN(income) < 3000 && (
              <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-fade-in">
                <p className="text-red-700 font-medium text-sm">
                  ⚠️ Przy dochodzie poniżej 3000 PLN nie możemy pomóc z oddłużeniem
                </p>
              </div>
            )}
          </div>
        );

      case 2:
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
              <h3 className="text-xl font-bold text-navy-900 mb-2">Ostatni krok!</h3>
              <p className="text-warm-neutral-600 mb-4">
                Podaj sumę kredytów bankowych (może być 0)
              </p>
              
              {/* Wyraźna instrukcja */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <p className="text-blue-800 text-sm font-medium">
                  💡 To ostatnia dana - potem sprawdzimy Twój wynik!
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Input section */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                <Label className="text-navy-800 font-medium text-sm block mb-3">
                  Suma wszystkich kredytów bankowych
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    value={bankDebt}
                    onChange={handleBankChange}
                    placeholder="0"
                    className="pr-12 text-right h-16 text-xl text-center border-2 border-gray-300 focus:border-blue-500"
                    autoFocus
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-lg">PLN</span>
                </div>
                <p className="text-warm-neutral-500 text-xs mt-2 text-center">
                  Wpisz 0 jeśli nie masz kredytów bankowych
                </p>
              </div>
              
              {/* Podsumowanie - wyraźnie oddzielone */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-300 rounded-xl p-4">
                <h4 className="font-semibold text-navy-900 mb-3 text-center">📋 Twoje dane:</h4>
                <div className="space-y-2 text-sm">
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
                    <span className="font-semibold text-green-600">{bankDebt || '0'} PLN</span>
                  </div>
                </div>
              </div>

              {/* Duży przycisk analizy */}
              <Button 
                onClick={calculate} 
                className="w-full font-bold py-5 text-lg rounded-xl h-16 bg-gradient-to-r from-navy-900 to-business-blue-600 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                <Calculator className="w-6 h-6 mr-3" />
                🔍 Sprawdź swój wynik
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
          <div className="bg-white rounded-2xl shadow-xl border-0 p-4 sm:p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[700px] w-full">
            <div>
              {/* Header z większymi elementami */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="flex justify-center items-center mb-3 sm:mb-4">
                  <div className="bg-gradient-to-r from-navy-900 to-business-blue-600 p-3 sm:p-4 rounded-full">
                    <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 mb-2 sm:mb-3">
                  Kalkulator Oddłużania BETA
                </h2>
                <p className="text-base sm:text-lg text-warm-neutral-600 font-medium">
                  Krok {currentStep} z {totalSteps}
                </p>
              </div>

              {/* Progress bar z większymi elementami */}
              <div className="mb-4 sm:mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                  <div 
                    className="bg-gradient-to-r from-navy-900 to-business-blue-600 h-3 sm:h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm sm:text-base">
                  <span className="text-warm-neutral-600">Postęp</span>
                  <span className="font-bold text-navy-900">{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
              </div>

              {/* Sekcja z Dariuszem - większa i bardziej widoczna */}
              <div className="text-center mb-6 sm:mb-8 bg-gradient-to-r from-navy-50 via-business-blue-50 to-prestige-gold-50 rounded-xl p-4 sm:p-6 border-2 border-prestige-gold-200 shadow-lg">
                <div className="flex justify-center items-center mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="relative">
                      <img 
                        src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                        alt="Dariusz Wentrych"
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 border-prestige-gold-400 object-cover shadow-lg"
                      />
                      {/* Badge ekspert */}
                      <div className="absolute -bottom-1 -right-1 bg-prestige-gold-500 rounded-full p-1 sm:p-1.5">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-base sm:text-lg lg:text-xl font-bold text-navy-900">
                        Dariusz Wentrych
                      </div>
                      <div className="text-sm sm:text-base text-navy-700 font-semibold">
                        Ekspert w oddłużeniu • 20+ lat doświadczenia
                      </div>
                      <div className="text-xs sm:text-sm text-navy-600 mt-1 font-medium">
                        15.000+ zadowolonych klientów
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Komunikat motywacyjny */}
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-prestige-gold-300">
                  <p className="text-sm sm:text-base text-navy-800 font-semibold">
                    💪 "Pomogłem już tysiącom Polaków wyjść z długów"
                  </p>
                  <p className="text-xs sm:text-sm text-navy-600 mt-1">
                    Sprawdzę Twoją sytuację i zaproponuję najlepsze rozwiązanie
                  </p>
                </div>
              </div>
            </div>

            {/* Główna zawartość z większymi paddingami */}
            <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
              {renderStepContent()}
            </div>

            {/* Nawigacja z większymi przyciskami */}
            {!hasUsedCalculator && currentStep > 1 && currentStep < 4 && (
              <div className="flex justify-between items-center mt-6 sm:mt-8">
                <Button
                  variant="outline"
                  onClick={goToPrevStep}
                  className="flex items-center h-12 sm:h-14 px-4 sm:px-6 text-base font-medium border-2 hover:bg-gray-50"
                >
                  ← Cofnij
                </Button>
                <div className="text-base sm:text-lg font-bold text-navy-900">
                  {currentStep} / {totalSteps}
                </div>
              </div>
            )}

            {/* Wynik z większymi elementami */}
            {result.message && (
              <div className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl border-2 ${getResultClasses()} animate-fade-in`}>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getResultIcon()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium leading-relaxed text-sm sm:text-base lg:text-lg">
                      {result.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bezpieczeństwo i zaufanie na dole */}
            <div className="mt-6 sm:mt-8 text-center border-t pt-4 sm:pt-6">
              <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-warm-neutral-600">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  <span className="font-medium">100% bezpieczeństwo</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
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

export default DebtCalculatorBeta;