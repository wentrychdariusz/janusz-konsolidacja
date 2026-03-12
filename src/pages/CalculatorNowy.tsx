import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
import LiveNotifications from '../components/LiveNotifications';

const debtOptions = [
  {
    emoji: '💰',
    label: 'Do 50 000 zł',
    value: 'do_50000',
    range: '0-50000',
  },
  {
    emoji: '💳',
    label: '50 000 – 150 000 zł',
    value: '50000_150000',
    range: '50000-150000',
  },
  {
    emoji: '🏦',
    label: 'Powyżej 150 000 zł',
    value: 'powyzej_150000',
    range: '150000+',
  },
];

const CalculatorNowy = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string, range: string) => {
    setSelected(value);
    
    // Krótkie opóźnienie dla efektu wizualnego, potem przekierowanie
    setTimeout(() => {
      const params = new URLSearchParams({
        debt_range: range,
        debt_category: value,
      });
      navigate(`/kontakt?${params.toString()}`);
    }, 400);
  };

  return (
    <div className="font-lato min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50">
      <TopHeader />
      <LiveNotifications />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          
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
              Ile łącznie masz do spłaty?
            </h1>
            <p className="text-lg sm:text-xl text-warm-neutral-600 max-w-lg mx-auto">
              Wybierz przedział, a dobierzemy najlepsze rozwiązanie dla Ciebie
            </p>
          </div>

          {/* Opcje wyboru */}
          <div className="space-y-4 sm:space-y-5">
            {debtOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value, option.range)}
                className={`
                  w-full text-left p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300
                  transform hover:scale-[1.02] hover:shadow-xl
                  ${selected === option.value
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

          {/* Zaufanie */}
          <div className="mt-10 text-center">
            <p className="text-warm-neutral-500 text-base sm:text-lg">
              🔒 Twoje dane są bezpieczne i poufne
            </p>
            <p className="text-warm-neutral-400 text-sm sm:text-base mt-2">
              Ponad <strong>12 000</strong> klientów skorzystało z naszej pomocy
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CalculatorNowy;
