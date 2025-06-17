
import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import DebtCalculator from './DebtCalculator';

const FloatingAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  // Sprawdzanie pozycji scroll - pokazuj awatar od sekcji "Mamy największe zaufanie", ukrywaj w sekcji kalkulatora
  useEffect(() => {
    const handleScroll = () => {
      // Szukamy sekcji "Mamy największe zaufanie klientów w Polsce"
      const headings = document.querySelectorAll('h2');
      let trustSection: HTMLElement | null = null;
      let calculatorSection: HTMLElement | null = null;
      
      headings.forEach((heading) => {
        if (heading.textContent?.includes('Mamy największe zaufanie klientów w Polsce')) {
          trustSection = heading as HTMLElement;
        }
        if (heading.textContent?.includes('SPRAWDŹ CZY MOŻEMY CI POMÓC')) {
          calculatorSection = heading as HTMLElement;
        }
      });
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Pokazuj awatar od sekcji zaufania
      let shouldShowFromTrust = false;
      if (trustSection) {
        const sectionRect = trustSection.getBoundingClientRect();
        const sectionTop = scrollY + sectionRect.top;
        const isMobile = window.innerWidth < 768;
        const offset = isMobile ? windowHeight * 0.8 : 400;
        shouldShowFromTrust = scrollY >= sectionTop - offset;
      }
      
      // Ukrywaj awatar w sekcji kalkulatora
      let shouldHideInCalculator = false;
      if (calculatorSection) {
        const sectionRect = calculatorSection.getBoundingClientRect();
        const sectionTop = scrollY + sectionRect.top;
        const offset = 200; // Ukrywaj 200px przed sekcją kalkulatora
        shouldHideInCalculator = scrollY >= sectionTop - offset;
      }
      
      // Logika końcowa: pokaż jeśli jesteśmy po sekcji zaufania, ale ukryj w sekcji kalkulatora
      setShowAvatar(shouldShowFromTrust && !shouldHideInCalculator);
      
      console.log('Avatar visibility check:', {
        scrollY,
        shouldShowFromTrust,
        shouldHideInCalculator,
        finalShow: shouldShowFromTrust && !shouldHideInCalculator
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Sprawdź od razu przy załadowaniu
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAvatarClick = () => {
    if (!isDragging) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Nie renderuj awatara, jeśli nie powinien być widoczny
  if (!showAvatar) {
    return null;
  }

  return (
    <>
      {/* Floating Avatar - Fixed in bottom right corner */}
      <div
        className={`fixed bottom-6 right-6 z-50 cursor-pointer transition-all duration-500 ease-out ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onClick={handleAvatarClick}
      >
        {/* Avatar Container z napisem */}
        <div className="relative group flex items-center space-x-3">
          {/* Napis po lewej stronie awatara - zawsze widoczny */}
          <div className="bg-white rounded-xl shadow-lg p-3 border-2 border-prestige-gold-400 transition-all duration-300 whitespace-nowrap animate-fade-in">
            <div className="text-navy-900 font-semibold text-sm">
              Zobacz, czy Ci pomogę?
            </div>
            {/* Strzałka wskazująca na awatar */}
            <div className="absolute right-0 top-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-white transform -translate-y-1/2 translate-x-full"></div>
          </div>
          
          {/* Avatar Image */}
          <div className="w-20 h-20 rounded-full border-4 border-prestige-gold-400 shadow-xl bg-white overflow-hidden hover:scale-110 transition-transform duration-300">
            <img 
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
              alt="Dariusz Wentrych"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Chat Icon Indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center border-2 border-white">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
          
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full border-4 border-prestige-gold-400 opacity-30 animate-ping"></div>
        </div>
      </div>

      {/* Modal z kalkulatorem - poprawione wymiary i przewijanie */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Calculator Content z przewijaniem */}
            <div className="flex-1 overflow-y-auto p-6">
              <DebtCalculator />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAvatar;
