import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CongratulationsSection = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 800) { // Hide after scrolling 800px
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-4 px-4">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img 
                src="/lovable-uploads/b9b35046-fcce-41cb-a198-66822e648611.png" 
                alt="Książka Nowe Życie Bez Długów - Dariusz Wentrych" 
                className="w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-44 object-cover rounded-lg shadow-xl flex-shrink-0"
              />
              <div className="text-center sm:text-left">
                <span className="font-semibold text-lg sm:text-xl md:text-2xl block animate-bounce text-yellow-50">Gratulacje!</span>
                <span className="text-sm sm:text-base md:text-lg text-green-50">Masz szansę na darmową konsultację o wartości 1000 zł z Dariuszem Wentrychem oraz zdobycie bestsellerowej książki "Nowe życie bez długów"</span>
              </div>
            </div>
            <div className="text-emerald-100 text-sm sm:text-base bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              • Wyjście z zadłużenia • Zmniejszenie rat • Spokojne życie bez długów
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <ChevronDown className="w-6 h-6 text-green-200 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsSection;