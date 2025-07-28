import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import PolishCitizensNotice from './PolishCitizensNotice';

const TopHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(12);

  useEffect(() => {
    // Timer odliczający 12 sekund
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setIsVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Ukryj po przewinięciu 800px - WYŁĄCZONE TYMCZASOWO
    // const handleScroll = () => {
    //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //   if (scrollTop > 800) {
    //     setIsVisible(false);
    //   }
    // };
    
    // window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      // window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) {
    return (
      <div className="bg-navy-900 text-white py-2 px-4 text-center text-sm">
        <p>🔒 Bezpieczne i dyskretne doradztwo finansowe</p>
        <PolishCitizensNotice />
      </div>
    );
  }

  return (
    <>
      {/* Sekcja kwalifikacji */}
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
                  <span className="font-bold text-base sm:text-lg md:text-xl block text-green-100 mb-2">Kwalifikujesz się do oddłużenia i konsolidacji!</span>
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
                
                <div className="flex flex-col items-center gap-2 mt-4">
                  <ChevronDown className="w-6 h-6 text-green-200 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Normalny header */}
      <div className="bg-navy-900 text-white py-2 px-4 text-center text-sm">
        <p>🔒 Bezpieczne i dyskretne doradztwo finansowe</p>
        <PolishCitizensNotice />
      </div>
    </>
  );
};
export default TopHeader;