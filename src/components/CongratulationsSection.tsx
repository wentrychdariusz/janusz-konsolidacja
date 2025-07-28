import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CongratulationsSection = () => {
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

    // Ukryj po przewinięciu 800px
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 800) {
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
    <div className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-6 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <img 
                src="/lovable-uploads/b9b35046-fcce-41cb-a198-66822e648611.png" 
                alt="Książka Nowe Życie Bez Długów - Dariusz Wentrych" 
                className="w-32 h-40 lg:w-36 lg:h-44 object-cover rounded-lg shadow-xl flex-shrink-0" 
              />
              <div className="text-center lg:text-left max-w-lg">
                <span className="font-semibold text-2xl lg:text-3xl block animate-bounce text-yellow-50 mb-2">Gratulacje!</span>
                <span className="font-bold text-lg lg:text-xl block text-green-100 mb-3">Kwalifikujesz się do oddłużenia i konsolidacji!</span>
                <span className="text-base lg:text-lg text-green-50 leading-relaxed">Masz szansę na darmową konsultację o wartości 1000 zł z Dariuszem Wentrychem oraz zdobycie bestsellerowej książki "Nowe życie bez długów"</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="text-emerald-100 text-base lg:text-lg bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg max-w-2xl">
              • Wyjście z zadłużenia • Zmniejszenie rat • Spokojne życie bez długów
            </div>
            
            <div className="text-center text-white">
              <div className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold text-lg">
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
  );
};
export default CongratulationsSection;