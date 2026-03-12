import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingAvatar = () => {
  const [showAvatar, setShowAvatar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      const trustHeader = Array.from(document.querySelectorAll('h2')).find(h2 => 
        h2.textContent?.includes('Mamy największe zaufanie klientów w Polsce')
      );
      const helpHeader = Array.from(document.querySelectorAll('h2')).find(h2 => 
        h2.textContent?.includes('JESTEŚMY TU, ŻEBY CI POMÓC')
      );
      
      let shouldShow = false;
      
      if (trustHeader && helpHeader) {
        const trustHeaderBottom = scrollY + trustHeader.getBoundingClientRect().bottom;
        const helpHeaderTop = scrollY + helpHeader.getBoundingClientRect().top;
        if (scrollY >= (trustHeaderBottom - 300) && scrollY < helpHeaderTop) {
          shouldShow = true;
        }
      } else {
        const imagineSection = document.querySelector('section.bg-gradient-to-b.from-black');
        if (imagineSection) {
          const sectionTop = scrollY + imagineSection.getBoundingClientRect().top;
          if (scrollY >= sectionTop + 200) shouldShow = true;
        }
      }
      
      setShowAvatar(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 1000);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showAvatar) return null;

  return (
    <div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 cursor-pointer transition-all duration-500 ease-out"
      onClick={() => navigate('/kalkulator-nowy')}
    >
      <div className="relative group flex items-center space-x-2 md:space-x-3">
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-3 md:p-4 border-2 border-prestige-gold-400 transition-all duration-300 whitespace-nowrap animate-fade-in relative min-w-[200px] md:min-w-[240px]">
          <div className="text-navy-900 font-bold text-sm md:text-lg relative z-0 mb-1">
            Zobacz czy ci pomogę
          </div>
          <div className="text-prestige-gold-600 font-semibold text-xs md:text-base relative z-0">
            Wypełnij kalkulator oddłużenia
          </div>
          <div className="absolute right-0 top-1/2 w-0 h-0 border-t-3 border-b-3 border-l-3 md:border-t-5 md:border-b-5 md:border-l-5 border-t-transparent border-b-transparent border-l-white transform -translate-y-1/2 translate-x-full z-0"></div>
        </div>
        
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-3 md:border-4 border-prestige-gold-400 shadow-xl bg-white overflow-hidden hover:scale-110 transition-transform duration-300 relative z-0">
            <img 
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
              alt="Dariusz Wentrych"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-5 h-5 md:w-6 md:h-6 bg-success-500 rounded-full flex items-center justify-center border-2 border-white z-0">
            <MessageCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-white relative z-10" />
          </div>
          <div className="absolute inset-0 rounded-full border-3 md:border-4 border-prestige-gold-400 opacity-30 animate-ping z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAvatar;
