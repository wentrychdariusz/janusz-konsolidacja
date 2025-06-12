
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, CheckCircle, AlertCircle, XCircle, Plus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import QuickRegistrationForm from './QuickRegistrationForm';

const DebtCalculator = () => {
  const [income, setIncome] = useState('');
  const [paydayDebt, setPaydayDebt] = useState('');
  const [bankDebt, setBankDebt] = useState('');
  const [result, setResult] = useState<{
    message: string;
    type: 'positive' | 'warning' | 'negative' | null;
    showForm: boolean;
  }>({ message: '', type: null, showForm: false });

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

  const calculate = () => {
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
      setResult({
        message: 'Jesteśmy w stanie Ci pomóc! Wypełnij dane kontaktowe, a nasz ekspert skontaktuje się z Tobą w ciągu 24 godzin.',
        type: 'positive',
        showForm: true
      });
      return;
    }

    if (total <= maxLim) {
      setResult({
        message: 'Jesteśmy w stanie Ci pomóc! Wypełnij dane kontaktowe, a doradca omówi możliwe rozwiązania.',
        type: 'warning',
        showForm: true
      });
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
    setIncome(formatNumber(e.target.value));
  };

  const handlePaydayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaydayDebt(formatNumber(e.target.value));
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankDebt(formatNumber(e.target.value));
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
            <QuickRegistrationForm />
          </div>
        ) : (
          <>
            {/* Kalkulator - kompaktowa wersja dla modala */}
            <div className="bg-white rounded-2xl shadow-xl border-0 p-4 h-full flex flex-col justify-between max-h-[80vh] w-full">
              <div>
                <div className="text-center mb-4">
                  <div className="flex justify-center items-center mb-3">
                    <div className="bg-gradient-to-r from-navy-900 to-business-blue-600 p-3 rounded-full">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-navy-900 mb-2">
                    Kalkulator Oddłużania
                  </h2>
                  <p className="text-warm-neutral-600 text-sm leading-relaxed">
                    Sprawdź, czy możemy Ci pomóc w konsolidacji chwilówek
                  </p>
                </div>

                {/* Sekcja z Dariuszem i zespołem - kompaktowa wersja */}
                <div className="text-center mb-4 bg-gradient-to-r from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 rounded-xl p-3 border border-warm-neutral-200">
                  <div className="flex justify-center items-center mb-2">
                    <div className="flex items-center space-x-2">
                      {/* Dariusz main photo */}
                      <img 
                        src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                        alt="Dariusz Wentrych"
                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-prestige-gold-400 shadow-md object-cover"
                      />
                      
                      {/* Plus icon */}
                      <Plus className="w-3 h-3 text-prestige-gold-400" />
                      
                      {/* Team members */}
                      <div className="flex items-center space-x-1">
                        <Avatar className="w-6 h-6 border-2 border-prestige-gold-400">
                          <AvatarImage 
                            src="/lovable-uploads/763d172c-71d2-4164-a6e6-97c3127b6592.png"
                            alt="Członek zespołu"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xs">KZ</AvatarFallback>
                        </Avatar>
                        <Avatar className="w-6 h-6 border-2 border-prestige-gold-400">
                          <AvatarImage 
                            src="/lovable-uploads/cbddfa95-6c86-4139-b791-f13477aaea8a.png"
                            alt="Członek zespołu"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xs">MK</AvatarFallback>
                        </Avatar>
                        <Avatar className="w-6 h-6 border-2 border-prestige-gold-400">
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
                    <h3 className="text-sm font-semibold text-navy-800">Dariusz Wentrych i Eksperci</h3>
                    <p className="text-xs text-warm-neutral-600">20+ lat doświadczenia w oddłużeniu</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="income" className="text-navy-800 font-medium text-sm">
                    Twój dochód netto
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="income"
                      type="text"
                      value={income}
                      onChange={handleIncomeChange}
                      placeholder="4 000"
                      className="pr-12 text-right h-10 text-base"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-sm">
                      PLN
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="payday" className="text-navy-800 font-medium text-sm">
                    Kwota chwilówek / parabanków
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="payday"
                      type="text"
                      value={paydayDebt}
                      onChange={handlePaydayChange}
                      placeholder="70 000"
                      className="pr-12 text-right h-10 text-base"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-sm">
                      PLN
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bank" className="text-navy-800 font-medium text-sm">
                    Kwota kredytów bankowych
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="bank"
                      type="text"
                      value={bankDebt}
                      onChange={handleBankChange}
                      placeholder="50 000"
                      className="pr-12 text-right h-10 text-base"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 text-sm">
                      PLN
                    </span>
                  </div>
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-4 text-base rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Sprawdź czy Ci pomożemy
                </Button>

                {result.message && !result.showForm && (
                  <div className={`p-3 rounded-xl border-2 ${getResultClasses()}`}>
                    <div className="flex items-start space-x-3">
                      {getResultIcon()}
                      <div className="flex-1">
                        <p className="font-medium leading-relaxed text-sm">
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
