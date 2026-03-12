import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const salaryOptions = [
  { emoji: '💵', label: 'Poniżej 4 000 zł', value: 'ponizej_4000', range: '0-4000' },
  { emoji: '💰', label: '4 000 – 6 000 zł', value: '4000_6000', range: '4000-6000' },
  { emoji: '💎', label: '6 000 – 8 000 zł', value: '6000_8000', range: '6000-8000' },
  { emoji: '🏆', label: 'Powyżej 8 000 zł', value: 'powyzej_8000', range: '8000+' },
];

const debtOptions = [
  { emoji: '💰', label: 'Do 50 000 zł', value: 'do_50000', range: '0-50000' },
  { emoji: '💳', label: '50 000 – 150 000 zł', value: '50000_150000', range: '50000-150000' },
  { emoji: '🏦', label: 'Powyżej 150 000 zł', value: 'powyzej_150000', range: '150000+' },
];

const bikOptions = [
  { emoji: '✅', label: 'Tak, mam raport', value: 'tak' },
  { emoji: '❌', label: 'Nie mam', value: 'nie' },
];

const CalculatorNowy = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSalary, setSelectedSalary] = useState<{ value: string; range: string } | null>(null);
  const [selectedDebt, setSelectedDebt] = useState<{ value: string; range: string } | null>(null);
  const [selectedBik, setSelectedBik] = useState<string | null>(null);

  const totalSteps = 3;

  const handleSalarySelect = (value: string, range: string) => {
    setSelectedSalary({ value, range });
    setTimeout(() => setStep(2), 400);
  };

  const handleDebtSelect = (value: string, range: string) => {
    setSelectedDebt({ value, range });
    setTimeout(() => setStep(3), 400);
  };

  const handleBikSelect = (value: string) => {
    setSelectedBik(value);
    setTimeout(() => {
      const params = new URLSearchParams({
        salary_range: selectedSalary!.range,
        salary_category: selectedSalary!.value,
        debt_range: selectedDebt!.range,
        debt_category: selectedDebt!.value,
        has_bik: value,
      });
      navigate(`/kontakt?${params.toString()}`);
    }, 400);
  };

  const getStepContent = () => {
    if (step === 1) {
      return {
        title: 'Ile zarabiasz na rękę?',
        subtitle: 'Dzięki temu dobierzemy najlepsze rozwiązanie',
        options: salaryOptions,
        onSelect: (opt: any) => handleSalarySelect(opt.value, opt.range),
        selectedValue: selectedSalary?.value,
      };
    }
    if (step === 2) {
      return {
        title: 'Ile łącznie masz do spłaty?',
        subtitle: 'Wybierz przedział zadłużenia',
        options: debtOptions,
        onSelect: (opt: any) => handleDebtSelect(opt.value, opt.range),
        selectedValue: selectedDebt?.value,
      };
    }
    return {
      title: 'Czy masz aktualny raport BIK?',
      subtitle: 'BIK to takie prawo jazdy bankowe. Bank to sprawdza przed decyzją.',
      options: bikOptions,
      onSelect: (opt: any) => handleBikSelect(opt.value),
      selectedValue: selectedBik,
    };
  };

  const { title, subtitle, options, onSelect, selectedValue } = getStepContent();

  return (
    <div className="font-lato min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50">
      <LiveNotifications />
      <div className="pt-8 pb-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-warm-neutral-500 mb-2">
              <span>Krok {step} z {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-warm-neutral-200 rounded-full h-2.5">
              <div
                className="bg-business-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Header z ekspertem */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img
                src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                alt="Dariusz Wentrych"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-business-blue-200 shadow-xl object-cover"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-warm-neutral-600 max-w-lg mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Opcje wyboru */}
          <div className="space-y-4 sm:space-y-5">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onSelect(option)}
                className={`
                  w-full text-left p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300
                  transform hover:scale-[1.02] hover:shadow-xl
                  ${selectedValue === option.value
                    ? 'border-business-blue-600 bg-business-blue-50 shadow-lg ring-2 ring-business-blue-200'
                    : 'border-warm-neutral-200 bg-white hover:border-business-blue-300 shadow-md'
                  }
                `}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="text-4xl sm:text-5xl">{option.emoji}</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Cofnij */}
          {step > 1 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setStep(step - 1)}
                className="text-business-blue-600 hover:underline font-medium text-lg"
              >
                ← Wróć do poprzedniego pytania
              </button>
            </div>
          )}

          {/* Zaufanie */}
          <div className="mt-10 text-center">
            <p className="text-warm-neutral-500 text-base sm:text-lg">
              🔒 Twoje dane są bezpieczne i poufne
            </p>
            <p className="text-warm-neutral-400 text-sm sm:text-base mt-2">
              Ponad <strong>15 000</strong> klientów skorzystało z naszej pomocy
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CalculatorNowy;
