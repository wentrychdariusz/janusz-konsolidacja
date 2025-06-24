

import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import DebtCalculator from './DebtCalculator';

const FloatingAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    console.log('FloatingAvatar mounted');

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Znajdź sekcję "Dlaczego wybierają nas klienci?" (TrustedClientsSection)
      const trustedClientsSection = Array.from(document.querySelectorAll('h2')).find(h2 => 
        h2.textContent?.includes('Dlaczego wybierają nas klienci')
      )?.closest('section');
      
      // Znajdź sekcję kalkulatora "SPRAWDŹ CZY MOŻEMY CI POMÓC"
      const calculatorSection = document.querySelector('[data-section="calculator"]') || 
                               document.getElementById('calculator') ||
                               Array.from(document.querySelectorAll('h2')).find(h2 => 
                                 h2.textContent?.includes('SPRAWDŹ CZY MOŻEMY CI')
                               )?.closest('section');
      
      let shouldShow = false;
      
      if (trustedClientsSection && calculatorSection) {
        const trustedClientsSectionRect = trustedClientsSection.getBoundingClientRect();
        const trustedClientsSectionTop = scrollY + trustedClientsSectionRect.top;
        const trustedClientsSectionBottom = trustedClientsSectionTop + trustedClientsSectionRect.height;
        
        const calculatorSectionRect = calculatorSection.getBoundingClientRect();
        const calculatorSectionTop = scrollY + calculatorSectionRect.top;
        const calculatorSectionBottom = calculatorSectionTop + calculatorSectionRect.height;
        
        // Ukryj awatar 40px po sekcji "Dlaczego wybierają nas klienci?"
        const hideAfterTrustedClients = trustedClientsSectionBottom + 40;
        
        // Pokaż awatar ponownie 40px po kalkulatorze
        const showAfterCalculator = calculatorSectionBottom + 40;
        
        console.log('Avatar visibility check:', {
          scrollY,
          hideAfterTrustedClients,
          showAfterCalculator,
          calculatorSectionTop,
          calculatorSectionBottom
        });
        
        // Logika: ukryj awatar po sekcji "Dlaczego wybierają nas klienci?" aż do 40px po kalkulatorze
        if (scrollY >= hideAfterTrustedClients && scrollY < showAfterCalculator) {
          shouldShow = false;
        } else {
          shouldShow = true;
        }
      }
      
      console.log('Final avatar decision:', {
        shouldShow
      });
      
      setShowAvatar(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Sprawdź od razu przy załadowaniu
    setTimeout(() => {
      handleScroll();
      console.log('Initial scroll check completed');
    }, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAvatarClick = () => {
    if (!isDragging) {
      console.log('Avatar clicked, opening modal');
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    console.log('Modal closed');
    setIsOpen(false);
  };

  console.log('FloatingAvatar render:', { showAvatar, isOpen });

  if (!showAvatar) {
    console.log('Avatar hidden, showAvatar:', showAvatar);
    return null;
  }

  return (
    <>
      {/* Floating Avatar - Fixed in bottom right corner */}
      <div
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 cursor-pointer transition-all duration-500 ease-out ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onClick={handleAvatarClick}
      >
        {/* Avatar Container z napisem */}
        <div className="relative group flex items-center space-x-2 md:space-x-3">
          {/* Napis po lewej stronie awatara */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-2 md:p-3 border-2 border-prestige-gold-400 transition-all duration-300 whitespace-nowrap animate-fade-in relative">
            <div className="text-navy-900 font-semibold text-xs md:text-sm relative z-0">
              Zobacz, czy Ci pomogę?
            </div>
            {/* Strzałka wskazująca na awatar */}
            <div className="absolute right-0 top-1/2 w-0 h-0 border-t-2 border-b-2 border-l-2 md:border-t-4 md:border-b-4 md:border-l-4 border-t-transparent border-b-transparent border-l-white transform -translate-y-1/2 translate-x-full z-0"></div>
          </div>
          
          {/* Avatar Image */}
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-3 md:border-4 border-prestige-gold-400 shadow-xl bg-white overflow-hidden hover:scale-110 transition-transform duration-300 relative z-0">
              <img 
                src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                alt="Dariusz Wentrych"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Chat Icon Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-5 h-5 md:w-6 md:h-6 bg-success-500 rounded-full flex items-center justify-center border-2 border-white z-0">
              <MessageCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-white relative z-10" />
            </div>
            
            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full border-3 md:border-4 border-prestige-gold-400 opacity-30 animate-ping z-0"></div>
          </div>
        </div>
      </div>

      {/* Modal z kalkulatorem */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[98vh] md:max-h-[95vh] overflow-hidden relative flex flex-col">
            {/* Close Button */}
            <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
              <div 
                className="absolute inset-0 -m-[25px] md:-m-[30px] cursor-pointer" 
                onClick={handleClose}
              />
              <button
                onClick={handleClose}
                className="relative w-8 h-8 md:w-10 md:h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Calculator Content */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6">
              <DebtCalculator />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAvatar;

