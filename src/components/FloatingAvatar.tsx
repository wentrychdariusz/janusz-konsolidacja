
import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import DebtCalculator from './DebtCalculator';

const FloatingAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [hasUsedCalculator, setHasUsedCalculator] = useState(false);

  // Sprawdzanie pozycji scroll - pokazuj awatar od sekcji "Mamy największe zaufanie", ukrywaj w sekcji kalkulatora
  useEffect(() => {
    // Funkcja sprawdzająca localStorage
    const checkCalculatorUsage = () => {
      const calculatorUsed = localStorage.getItem('debt_calculator_used');
      const isUsed = calculatorUsed === 'true';
      setHasUsedCalculator(isUsed);
      return isUsed;
    };

    // Sprawdź na początku
    checkCalculatorUsage();

    // Nasłuchuj zmian w localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'debt_calculator_used') {
        checkCalculatorUsage();
      }
    };

    // Nasłuchuj custom event gdy kalkulator zostanie użyty
    const handleCalculatorUsed = () => {
      checkCalculatorUsage();
    };

    const handleScroll = () => {
      // Sprawdź aktualny stan kalkulatora
      const isCalculatorUsed = checkCalculatorUsage();
      
      // Szukamy sekcji "Mamy największe zaufanie" - szukamy różnych wariantów tekstu
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let trustSection: HTMLElement | null = null;
      let calculatorSection: HTMLElement | null = null;
      
      headings.forEach((heading) => {
        const text = heading.textContent?.toLowerCase() || '';
        
        // Szukamy sekcji zaufania - różne warianty
        if (text.includes('zaufanie') || text.includes('trust') || text.includes('klient') || text.includes('mamy największe')) {
          trustSection = heading as HTMLElement;
          console.log('Found trust section:', heading.textContent);
        }
        
        // Szukamy sekcji kalkulatora - rozszerzone wyszukiwanie
        if (text.includes('sprawdź') || text.includes('kalkulator') || text.includes('pomóc') || text.includes('czy możemy ci')) {
          calculatorSection = heading as HTMLElement;
          console.log('Found calculator section:', heading.textContent);
        }
      });
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      
      // Pokazuj awatar od sekcji zaufania lub od 1500px na mobile, 2000px na desktop
      let shouldShowFromTrust = false;
      if (trustSection) {
        const sectionRect = trustSection.getBoundingClientRect();
        const sectionTop = scrollY + sectionRect.top;
        const offset = isMobile ? windowHeight * 0.5 : 400; // Mniejszy offset na mobile
        shouldShowFromTrust = scrollY >= sectionTop - offset;
      } else {
        // Fallback - pokaż awatar wcześniej na mobile
        const fallbackOffset = isMobile ? 1500 : 2000;
        shouldShowFromTrust = scrollY >= fallbackOffset;
      }
      
      // Ukrywaj awatar w sekcji kalkulatora - tylko jeśli nie jesteśmy na stronie /kalkulator
      let shouldHideInCalculator = false;
      const currentPath = window.location.pathname;
      
      if (currentPath !== '/kalkulator' && calculatorSection) {
        const sectionRect = calculatorSection.getBoundingClientRect();
        const sectionTop = scrollY + sectionRect.top;
        const offset = isMobile ? 100 : 200; // Mniejszy offset na mobile
        shouldHideInCalculator = scrollY >= sectionTop - offset;
      }
      
      // Logika końcowa: pokaż jeśli jesteśmy po sekcji zaufania, ale ukryj w sekcji kalkulatora
      // Dodatkowo ukryj jeśli kalkulator był już używany
      const finalShow = shouldShowFromTrust && !shouldHideInCalculator && !isCalculatorUsed;
      setShowAvatar(finalShow);
      
      console.log('Avatar visibility check:', {
        scrollY,
        isMobile,
        currentPath,
        shouldShowFromTrust,
        shouldHideInCalculator,
        hasUsedCalculator: isCalculatorUsed,
        finalShow,
        trustSectionFound: !!trustSection,
        calculatorSectionFound: !!calculatorSection
      });
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('calculatorUsed', handleCalculatorUsed);
    
    // Sprawdź od razu przy załadowaniu z opóźnieniem
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('calculatorUsed', handleCalculatorUsed);
    };
  }, []);

  const handleAvatarClick = () => {
    if (!isDragging && !hasUsedCalculator) {
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
      {/* Floating Avatar - Fixed in bottom right corner z większym obszarem dotykowym */}
      <div
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 cursor-pointer transition-all duration-500 ease-out ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onClick={handleAvatarClick}
      >
        {/* Avatar Container z napisem i znacznie większym obszarem kliknięcia */}
        <div className="relative group flex items-center space-x-2 md:space-x-3">
          {/* Bardzo duży niewidoczny obszar dotykowy dla całego komponentu */}
          <div className="absolute inset-0 -m-[40px] md:-m-[60px] z-20" />
          
          {/* Napis po lewej stronie awatara - responsive */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-2 md:p-3 border-2 border-prestige-gold-400 transition-all duration-300 whitespace-nowrap animate-fade-in relative">
            {/* Duży obszar dotykowy dla napisu */}
            <div className="absolute inset-0 -m-[30px] md:-m-[40px] z-10" />
            <div className="text-navy-900 font-semibold text-xs md:text-sm relative z-0">
              Zobacz, czy Ci pomogę?
            </div>
            {/* Strzałka wskazująca na awatar */}
            <div className="absolute right-0 top-1/2 w-0 h-0 border-t-2 border-b-2 border-l-2 md:border-t-4 md:border-b-4 md:border-l-4 border-t-transparent border-b-transparent border-l-white transform -translate-y-1/2 translate-x-full z-0"></div>
          </div>
          
          {/* Avatar Image z większym obszarem dotykowym - responsive */}
          <div className="relative">
            {/* Duży niewidoczny obszar dotykowy dla awatara */}
            <div className="absolute inset-0 -m-[40px] md:-m-[50px] z-10" />
            
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-3 md:border-4 border-prestige-gold-400 shadow-xl bg-white overflow-hidden hover:scale-110 transition-transform duration-300 relative z-0">
              <img 
                src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                alt="Dariusz Wentrych"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Chat Icon Indicator - responsive */}
            <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-5 h-5 md:w-6 md:h-6 bg-success-500 rounded-full flex items-center justify-center border-2 border-white z-0">
              {/* Duży obszar dotykowy dla ikony */}
              <div className="absolute inset-0 -m-[15px] md:-m-[20px]" />
              <MessageCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-white relative z-10" />
            </div>
            
            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full border-3 md:border-4 border-prestige-gold-400 opacity-30 animate-ping z-0"></div>
          </div>
        </div>
      </div>

      {/* Modal z kalkulatorem - poprawione wymiary i przewijanie */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[98vh] md:max-h-[95vh] overflow-hidden relative flex flex-col">
            {/* Close Button z bardzo dużym obszarem dotykowym */}
            <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
              {/* Bardzo duży niewidoczny obszar dotykowy */}
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
            
            {/* Calculator Content z przewijaniem */}
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
