import React, { useState, useEffect } from 'react';
import { ChevronDown, Gift, X } from 'lucide-react';
import DebtCalculatorBeta from './DebtCalculatorBeta';

const CongratulationsSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(12);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setIsVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Scroll handler
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 800) { // Hide after scrolling 800px
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
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
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="text-center text-white">
                <div className="bg-yellow-500 text-black px-6 py-3 rounded-lg mb-4 font-bold">
                  ⏰ Ten komunikat zniknie za {countdown} sekund
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <p className="text-xl font-semibold mb-3 text-yellow-50">🎯 Kwalifikujesz się do oddłużenia i konsolidacji!</p>
                  <p className="text-lg text-green-50 mb-2">Zapoznaj się z całą stroną i dowiedz się:</p>
                  <div className="text-green-100 text-base space-y-1">
                    <p>✅ Jak zmniejszyć raty nawet o 50%</p>
                    <p>✅ Jak pozbyć się stresu finansowego</p>
                    <p>✅ Jak odzyskać kontrolę nad budżetem</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 mt-4">
                  <p className="text-green-100 text-sm">Przewiń w dół, aby poznać szczegóły</p>
                  <ChevronDown className="w-6 h-6 text-green-200 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal z kalkulatorem */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[98vh] md:max-h-[95vh] overflow-hidden relative flex flex-col">
            {/* Close Button */}
            <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="relative w-8 h-8 md:w-10 md:h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Calculator Content */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6">
              <DebtCalculatorBeta />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CongratulationsSection;