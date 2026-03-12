import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

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

interface CalculatorNowyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculatorNowyModal = ({ isOpen, onClose }: CalculatorNowyModalProps) => {
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
      onClose();
      navigate(`/kontakt-nowy?${params.toString()}`);
    }, 400);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedSalary(null);
    setSelectedDebt(null);
    setSelectedBik(null);
    onClose();
  };

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
      <div className="bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 rounded-xl md:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[98vh] md:max-h-[95vh] overflow-hidden relative flex flex-col">
        {/* Close Button */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
          <button
            onClick={handleClose}
            className="w-8 h-8 md:w-10 md:h-10 bg-warm-neutral-100 hover:bg-warm-neutral-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-warm-neutral-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-6 md:pt-10">
          {/* Progress bar */}
          <div className="mb-6">
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

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                alt="Dariusz Wentrych"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-business-blue-200 shadow-xl object-cover"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-warm-neutral-600 max-w-lg mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 sm:space-y-4">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onSelect(option)}
                className={`
                  w-full text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300
                  transform hover:scale-[1.02] hover:shadow-xl
                  ${selectedValue === option.value
                    ? 'border-business-blue-600 bg-business-blue-50 shadow-lg ring-2 ring-business-blue-200'
                    : 'border-warm-neutral-200 bg-white hover:border-business-blue-300 shadow-md'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl sm:text-4xl">{option.emoji}</span>
                  <span className="text-lg sm:text-xl font-bold text-navy-900">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Trust */}
          <div className="mt-8 text-center">
            <p className="text-warm-neutral-500 text-sm sm:text-base">
              🔒 Twoje dane są bezpieczne i poufne
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorNowyModal;
