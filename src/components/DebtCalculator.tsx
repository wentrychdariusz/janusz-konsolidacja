
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
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
        message: 'Świetna wiadomość! Możemy Ci pomóc – wypełnij formularz kontaktowy, a skontaktujemy się z Tobą.',
        type: 'positive',
        showForm: true
      });
      return;
    }

    if (total <= maxLim) {
      setResult({
        message: 'Postaramy się pomóc – wypełnij formularz, a doradca omówi możliwe rozwiązania.',
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Kalkulator */}
        <div className="bg-white rounded-2xl shadow-xl border-0 p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-gradient-to-r from-navy-900 to-business-blue-600 p-3 rounded-full">
                <Calculator className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-navy-900 mb-2">
              Kalkulator Oddłużania
            </h2>
            <p className="text-warm-neutral-600">
              Sprawdź, czy możemy Ci pomóc w konsolidacji chwilówek
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="income" className="text-navy-800 font-medium">
                Twój dochód netto
              </Label>
              <div className="relative mt-2">
                <Input
                  id="income"
                  type="text"
                  value={income}
                  onChange={handleIncomeChange}
                  placeholder="4 000"
                  className="pr-12 text-right"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-neutral-500">
                  PLN
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="payday" className="text-navy-800 font-medium">
                Kwota chwilówek / parabanków
              </Label>
              <div className="relative mt-2">
                <Input
                  id="payday"
                  type="text"
                  value={paydayDebt}
                  onChange={handlePaydayChange}
                  placeholder="70 000"
                  className="pr-12 text-right"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-neutral-500">
                  PLN
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="bank" className="text-navy-800 font-medium">
                Kwota kredytów bankowych
              </Label>
              <div className="relative mt-2">
                <Input
                  id="bank"
                  type="text"
                  value={bankDebt}
                  onChange={handleBankChange}
                  placeholder="50 000"
                  className="pr-12 text-right"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-neutral-500">
                  PLN
                </span>
              </div>
            </div>

            <Button
              onClick={calculate}
              className="w-full bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Sprawdź możliwość pomocy
            </Button>

            {result.message && (
              <div className={`p-4 rounded-xl border-2 ${getResultClasses()}`}>
                <div className="flex items-start space-x-3">
                  {getResultIcon()}
                  <p className="font-medium leading-relaxed">
                    {result.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Formularz kontaktowy - pokazuje się tylko przy pozytywnym wyniku */}
        {result.showForm && (
          <div className="animate-fade-in">
            <div className="mb-4 text-center">
              <h3 className="text-xl font-bold text-navy-900 mb-2">
                Skontaktuj się z nami
              </h3>
              <p className="text-warm-neutral-600">
                Nasz ekspert skontaktuje się z Tobą w ciągu 24 godzin
              </p>
            </div>
            <QuickRegistrationForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtCalculator;
