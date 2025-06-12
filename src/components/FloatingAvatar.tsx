
import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import DebtCalculator from './DebtCalculator';

const FloatingAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Sprawdzanie pozycji scroll i pokazywanie awatara przy nagłówku "Mamy największe zaufanie klientów w Polsce"
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
      
      // Pokazuj awatar dopiero przy nagłówku "Mamy największe zaufanie klientów w Polsce" - około 1200px
      setShowAvatar(scrollY > 1200);
    };

    window.addEventListener('scroll', handleScroll);
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

  // Naturalna pozycja awatara - płynne przesuwanie w dół z ograniczeniem
  const avatarStyle = {
    right: '20px',
    top: `${Math.min(Math.max(20, 20 + (scrollPosition - 1200) * 0.1), window.innerHeight - 150)}px`,
  };

  // Nie renderuj awatara, jeśli nie powinien być widoczny
  if (!showAvatar) {
    return null;
  }

  return (
    <>
      {/* Floating Avatar */}
      <div
        className={`fixed z-50 cursor-pointer transition-all duration-500 ease-out ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={avatarStyle}
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

      {/* Modal with Calculator - Bez headera z Dariuszem */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Calculator Content - Bez przewijania */}
            <div className="p-6 h-full">
              <DebtCalculator />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAvatar;
