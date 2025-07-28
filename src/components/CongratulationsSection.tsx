import React from 'react';
import { ChevronDown, Award } from 'lucide-react';

const CongratulationsSection = () => {
  return (
    <div className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-4 px-4">
      <div className="container mx-auto">
        <div className="text-center text-white">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-200" />
              <span className="font-semibold text-base sm:text-lg">
                Gratulacje! Masz szansę na darmową konsultację o wartości 1000 zł
              </span>
            </div>
            <div className="text-green-100 text-sm sm:text-base">
              • Wyjście z zadłużenia • Zmniejszenie rat nawet o 50%
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <ChevronDown className="w-6 h-6 text-green-200 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsSection;