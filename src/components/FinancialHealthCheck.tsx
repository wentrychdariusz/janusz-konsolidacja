import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Heart, TrendingUp, Shield, Star, CheckCircle, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const FinancialHealthCheck = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({
    income: '',
    incomeType: '',
    paydayDebts: '',
    bankDebts: ''
  });
  const [hasCompleted, setHasCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState<{
    score: number;
    level: string;
    qualified: boolean;
    message: string;
  } | null>(null);

  const totalSteps = 4;

  // Sprawdź czy test był już robiony
  useEffect(() => {
    const completed = localStorage.getItem('health_check_completed');
    if (completed === 'true') {
      setHasCompleted(true);
    }
  }, []);

  const parsePLN = (val: string) => {
    const clean = (val || '').toString().replace(/\s+/g, '').replace(',', '.');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  };

  const formatNumber = (value: string) => {
    const num = value.replace(/\D/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Algorytm oddłużenia - używamy tego samego co w kalkulatorze
  const MARGIN = 10000;
  
  const nonBankLimit = (income: number) => 
    income <= 3500 ? income * (50000 / 3500) : 50000 + (income - 3500) * 40;
  
  const totalLimit = (income: number) => income * 22.5;
  
  const postCostLimit = (income: number) => income * 30;

  const calculateHealthScore = (allAnswers: any) => {
    const income = parsePLN(allAnswers.income);
    const paydayDebts = parsePLN(allAnswers.paydayDebts) || 0;
    const bankDebts = parsePLN(allAnswers.bankDebts) || 0;

    let score = 0;

    // 1. Dochód (0-40 pkt) - zgodnie z algorytmem kalkulatora
    if (income < 3000) {
      score += 0; // Poniżej 3000 PLN nie możemy pomóc
    } else if (income >= 6000) {
      score += 40;
    } else if (income >= 4000) {
      score += 35;
    } else {
      score += 25; // 3000-3999 PLN
    }

    // 2. Typ dochodu (0-20 pkt) - stabilność zatrudnienia
    if (allAnswers.incomeType === 'umowa_o_prace') score += 20;
    else if (allAnswers.incomeType === 'umowa_zlecenie') score += 15;
    else score += 10;

    // 3. Algorytm oddłużenia - główny wskaźnik kwalifikacji (0-40 pkt)
    const totalDebts = paydayDebts + bankDebts;
    if (totalDebts > 0) {
      // Modyfikacja limitów w zależności od typu dochodu
      let nbLim = nonBankLimit(income) + MARGIN;
      let baseLim = totalLimit(income) + MARGIN;
      let maxLim = postCostLimit(income) + MARGIN;

      switch (allAnswers.incomeType) {
        case 'umowa_zlecenie':
          nbLim *= 0.75;
          baseLim *= 0.75;
          maxLim *= 0.75;
          break;
        case 'inne':
          nbLim *= 0.6;
          baseLim *= 0.6;
          maxLim *= 0.6;
          break;
      }

      // Sprawdzamy czy możemy pomóc zgodnie z algorytmem
      if (paydayDebts > nbLim) {
        score += 0; // Nie można pomóc - za dużo chwilówek
      } else {
        const totalDebt = paydayDebts + bankDebts;
        if (totalDebt <= baseLim) {
          score += 40; // Idealna sytuacja - możemy pomóc
        } else if (totalDebt <= maxLim) {
          score += 25; // Można pomóc z ograniczeniami
        } else {
          score += 10; // Trudny przypadek
        }
      }
    } else {
      score += 35; // Brak długów to duży plus, ale nie maksimum
    }

    return Math.min(score, 100);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers };
    const stepKey = getStepKey(currentStep);
    newAnswers[stepKey] = value;
    setAnswers(newAnswers);

    // Przejście do następnego kroku
    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Na końcu oblicz finalny wynik
        const finalScore = calculateHealthScore(newAnswers);
        setScore(finalScore);
        completeHealthCheck(finalScore, newAnswers);
      }
    }, 800);
  };

  const getStepKey = (step: number) => {
    const keys = ['income', 'incomeType', 'paydayDebts', 'bankDebts'];
    return keys[step - 1];
  };

  const completeHealthCheck = async (finalScore: number, finalAnswers: any) => {
    // Kwalifikacja bazuje na algorytmie oddłużenia
    const income = parsePLN(finalAnswers.income);
    const paydayDebts = parsePLN(finalAnswers.paydayDebts) || 0;
    const bankDebts = parsePLN(finalAnswers.bankDebts) || 0;
    
    let qualified = false;
    
    if (paydayDebts > 0 || bankDebts > 0) {
      // Używamy tego samego algorytmu co w kalkulatorze
      let nbLim = nonBankLimit(income) + MARGIN;
      let baseLim = totalLimit(income) + MARGIN;
      
      // Modyfikacja limitów w zależności od typu dochodu
      switch (finalAnswers.incomeType) {
        case 'umowa_zlecenie':
          nbLim *= 0.75;
          baseLim *= 0.75;
          break;
        case 'inne':
          nbLim *= 0.6;
          baseLim *= 0.6;
          break;
      }
      
      // Sprawdzamy zgodnie z algorytmem oddłużenia
      const totalDebt = paydayDebts + bankDebts;
      
      // Kwalifikacja jeśli możemy pomóc (chwilówki w limicie)
      qualified = paydayDebts <= nbLim && totalDebt <= baseLim;
    } else {
      // Brak długów - automatyczna kwalifikacja jeśli dochód > 3000
      qualified = income >= 3000;
    }
    let level = '';
    let message = '';

    if (income < 3000) {
      level = 'Nie kwalifikujesz się';
      message = 'Niestety, przy dochodzie poniżej 3000 PLN nie możemy zaproponować skutecznego rozwiązania oddłużeniowego.';
      qualified = false;
    } else if (qualified) {
      if (finalScore >= 90) {
        level = 'Finansowy Mistrz';
        message = 'Gratulacje! Twoja kondycja finansowa jest doskonała. Zakwalifikowałeś się do naszych najlepszych ofert konsolidacyjnych!';
      } else {
        level = 'Finansowy Ekspert';
        message = 'Bardzo dobra kondycja! Zakwalifikowałeś się do programu konsolidacji długów z preferencyjnymi warunkami.';
      }
    } else if (finalScore >= 60) {
      level = 'Finansowy Praktyk';
      message = 'Dobra kondycja z potencjałem na więcej. Skontaktuj się z nami - możemy pomóc poprawić Twoją sytuację.';
    } else {
      level = 'Finansowy Początkujący';
      message = 'Kondycja wymaga poprawy, ale nie martw się! Nasi eksperci pomogą Ci opracować plan naprawczy.';
    }

    setFinalResult({
      score: finalScore,
      level,
      qualified,
      message
    });

    // Zapisz do localStorage
    localStorage.setItem('health_check_completed', 'true');
    setHasCompleted(true);

    // Zapisz do bazy danych
    try {
      const sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
        await supabase
          .from('calculator_usage')
          .insert({
          session_id: sessionId,
          income: parsePLN(finalAnswers.income),
          debt_amount: (parsePLN(finalAnswers.paydayDebts) || 0) + (parsePLN(finalAnswers.bankDebts) || 0),
          income_type: finalAnswers.incomeType,
          health_check_score: finalScore,
          qualified: qualified
          });

        // Przekieruj kwalifikowane leady (bazując na algorytmie, nie tylko score)
        if (qualified) {
          console.log('🎯 Health Check - qualified by debt algorithm, redirecting to contact');
          setTimeout(() => {
            window.location.href = `/kontakt?source=healthcheck&score=${finalScore}&qualified=true&income=${parsePLN(finalAnswers.income)}&paydayDebts=${parsePLN(finalAnswers.paydayDebts) || 0}&bankDebts=${parsePLN(finalAnswers.bankDebts) || 0}`;
          }, 3000);
        }
    } catch (error) {
      console.error('Błąd podczas zapisywania health check:', error);
    }
  };

  const resetHealthCheck = () => {
    localStorage.removeItem('health_check_completed');
    setHasCompleted(false);
    setCurrentStep(1); // Zawsze zaczynam od kroku 1 - kwota zarobków
    setScore(0);
    setAnswers({
      income: '',
      incomeType: '',
      paydayDebts: '',
      bankDebts: ''
    });
    setFinalResult(null);
  };

  const renderStep = () => {
    if (hasCompleted && finalResult) {
      return (
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              finalResult.qualified ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              {finalResult.qualified ? (
                <Award className="w-12 h-12 text-green-600" />
              ) : (
                <TrendingUp className="w-12 h-12 text-yellow-600" />
              )}
            </div>
            
            <div className="mb-6">
              <div className="text-6xl font-bold text-navy-900 mb-2">
                {finalResult.score}/100
              </div>
              <div className={`text-xl font-semibold mb-4 ${
                finalResult.qualified ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {finalResult.level}
              </div>
            </div>

            {finalResult.qualified && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  🎉 Gratulacje! Zakwalifikowałeś się!
                </h3>
                <p className="text-green-700">
                  Twoja kondycja finansowa kwalifikuje Cię do naszych najlepszych programów konsolidacyjnych.
                </p>
              </div>
            )}

            <p className="text-warm-neutral-600 mb-6 leading-relaxed">
              {finalResult.message}
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border-2 bg-blue-50 border-blue-200 text-blue-700">
                <p className="font-medium">
                  📞 Porozmawiaj z ekspertem: <strong>+48 663 024 522</strong>
                </p>
              </div>
              
              <Button
                onClick={resetHealthCheck}
                variant="outline"
                className="w-full h-12 bg-white border-2 border-yellow-400 text-yellow-800 hover:bg-yellow-50"
              >
                🔄 Sprawdź ponownie
              </Button>
            </div>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Twoje miesięczne zarobki</h3>
              <p className="text-warm-neutral-600">
                Wyższe zarobki = lepsza kondycja finansowa
              </p>
            </div>
            <div className="relative">
              <Input
                type="text"
                value={answers.income}
                onChange={(e) => setAnswers({...answers, income: formatNumber(e.target.value)})}
                placeholder="5 000"
                className="pr-12 text-right h-16 text-xl text-center"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-lg">
                PLN
              </span>
            </div>
            <Button 
              onClick={() => handleAnswer(answers.income)} 
              disabled={!answers.income || parsePLN(answers.income) < 3000}
              className={`mt-4 w-full h-12 ${
                answers.income && parsePLN(answers.income) < 3000
                  ? 'bg-red-500 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
              }`}
            >
              {answers.income && parsePLN(answers.income) < 3000 
                ? 'Minimum 3000 PLN' 
                : 'Dalej →'
              }
            </Button>
            {answers.income && parsePLN(answers.income) < 3000 && (
              <p className="text-red-600 text-sm mt-2 text-center">
                ⚠️ Przy dochodzie poniżej 3000 PLN nie możemy pomóc
              </p>
            )}
          </div>
        );

      case 2:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Rodzaj zatrudnienia</h3>
              <p className="text-warm-neutral-600">
                Stabilność wpływa na kondycję finansową
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => handleAnswer('umowa_o_prace')}
                variant="outline"
                className="w-full h-16 text-left justify-start p-4 hover:bg-blue-50 border-2"
              >
                <div className="flex items-center w-full">
                  <div className="text-2xl mr-4">💼</div>
                  <div>
                    <div className="font-semibold">Umowa o pracę</div>
                    <div className="text-sm text-gray-500">Najwyższa stabilność</div>
                  </div>
                </div>
              </Button>
              <Button
                onClick={() => handleAnswer('umowa_zlecenie')}
                variant="outline"
                className="w-full h-16 text-left justify-start p-4 hover:bg-blue-50 border-2"
              >
                <div className="flex items-center w-full">
                  <div className="text-2xl mr-4">📋</div>
                  <div>
                    <div className="font-semibold">Zlecenie/B2B</div>
                    <div className="text-sm text-gray-500">Dobra stabilność</div>
                  </div>
                </div>
              </Button>
              <Button
                onClick={() => handleAnswer('inne')}
                variant="outline"
                className="w-full h-16 text-left justify-start p-4 hover:bg-blue-50 border-2"
              >
                <div className="flex items-center w-full">
                  <div className="text-2xl mr-4">🏛️</div>
                  <div>
                    <div className="font-semibold">Inne źródła</div>
                    <div className="text-sm text-gray-500">Średnia stabilność</div>
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
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Chwilówki i parabanki</h3>
              <p className="text-warm-neutral-600">
                Suma wszystkich pożyczek pozabankowych
              </p>
            </div>
            <div className="relative">
              <Input
                type="text"
                value={answers.paydayDebts}
                onChange={(e) => setAnswers({...answers, paydayDebts: formatNumber(e.target.value)})}
                placeholder="0"
                className="pr-12 text-right h-16 text-xl text-center"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-lg">
                PLN
              </span>
            </div>
            <p className="text-warm-neutral-500 text-sm mt-2">
              Wpisz 0 jeśli nie masz chwilówek
            </p>
            <Button 
              onClick={() => handleAnswer(answers.paydayDebts)} 
              className="mt-4 w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 text-white"
            >
              Dalej →
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏦</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Kredyty bankowe</h3>
              <p className="text-warm-neutral-600">
                Suma wszystkich kredytów z banków
              </p>
            </div>
            <div className="relative">
              <Input
                type="text"
                value={answers.bankDebts}
                onChange={(e) => setAnswers({...answers, bankDebts: formatNumber(e.target.value)})}
                placeholder="0"
                className="pr-12 text-right h-16 text-xl text-center"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-lg">
                PLN
              </span>
            </div>
            <p className="text-warm-neutral-500 text-sm mt-2">
              Wpisz 0 jeśli nie masz kredytów bankowych
            </p>
            <Button 
              onClick={() => handleAnswer(answers.bankDebts)} 
              className="mt-4 w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 text-white"
            >
              Sprawdź wynik →
            </Button>
          </div>
        );

      // Kontynuuj dla pozostałych kroków...
      default:
        return <div>Krok {currentStep}</div>;
    }
  };

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 xl:p-10 min-h-[600px] w-full">
      <div className="text-center mb-6">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2">
          💚 Health Check Finansowy
        </h2>
        {!hasCompleted && (
          <p className="text-warm-neutral-600">
            Krok {currentStep} z {totalSteps}
          </p>
        )}
      </div>

      {!hasCompleted && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-warm-neutral-600">Twój wynik:</span>
            <span className={`text-lg font-bold ${getScoreColor()}`}>
              {score}/100 pkt
            </span>
          </div>
          <Progress value={(score / 100) * 100} className="h-3" />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center">
        {renderStep()}
      </div>
    </div>
  );
};

export default FinancialHealthCheck;