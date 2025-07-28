import React from 'react';
import { ChevronDown, Award } from 'lucide-react';
const CongratulationsSection = () => {
  return <div className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-4 px-4">
      <div className="container mx-auto">
        <div className="text-center text-white">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img 
                src="/lovable-uploads/b9b35046-fcce-41cb-a198-66822e648611.png" 
                alt="Książka Nowe Życie Bez Długów - Dariusz Wentrych" 
                className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 object-cover rounded-lg shadow-xl flex-shrink-0"
              />
              <div className="text-center sm:text-left">
                <span className="font-semibold text-lg sm:text-xl md:text-2xl block">Gratulacje!</span>
                <span className="text-sm sm:text-base md:text-lg">Masz szansę na darmową konsultację o wartości 1000 zł z Dariuszem Wentrychem oraz zdobycie bestsellerowej książki "Nowe życie bez długów"</span>
              </div>
            </div>
            <div className="text-green-100 text-sm sm:text-base bg-green-700/30 px-4 py-2 rounded-lg">
              • Wyjście z zadłużenia • Zmniejszenie rat nawet o 50%
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <ChevronDown className="w-6 h-6 text-green-200 animate-bounce" />
          </div>
        </div>
      </div>
    </div>;
};
export default CongratulationsSection;