
import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import DebtCalculator from './DebtCalculator';

const FloatingAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Sprawdzanie pozycji scroll i aktualizacja pozycji awatara
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
      setShowMessage(scrollY > 100); // Pokaż wiadomość po przescrollowaniu 100px
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

  // Pozycja awatara - 20px od prawej krawędzi + offset na podstawie scroll
  const avatarStyle = {
    right: '20px',
    top: `${Math.max(20, 20 + scrollPosition * 0.3)}px`, // Płynne przesuwanie w dół
  };

  return (
    <>
      {/* Floating Avatar */}
      <div
        className={`fixed z-50 cursor-pointer transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={avatarStyle}
        onClick={handleAvatarClick}
      >
        {/* Avatar Container z napisem */}
        <div className="relative group flex items-center space-x-3">
          {/* Avatar Image */}
          <div className="w-20 h-20 rounded-full border-4 border-prestige-gold-400 shadow-xl bg-white overflow-hidden hover:scale-110 transition-transform duration-300">
            <img 
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
              alt="Dariusz Wentrych"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Napis po prawej stronie - widoczny podczas scrollowania */}
          {showMessage && (
            <div className="bg-white rounded-xl shadow-lg p-3 border-2 border-prestige-gold-400 transition-all duration-300 whitespace-nowrap animate-fade-in">
              <div className="text-navy-900 font-semibold text-sm">
                Zobacz, czy Ci pomogę?
              </div>
              <div className="absolute left-0 top-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-white transform -translate-y-1/2 -translate-x-full"></div>
            </div>
          )}
          
          {/* Chat Icon Indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center border-2 border-white">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
          
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full border-4 border-prestige-gold-400 opacity-30 animate-ping"></div>
        </div>
      </div>

      {/* Modal with Calculator - Zwiększony rozmiar i lepsze scroll */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Header with Dariusz - Fixed */}
            <div className="bg-gradient-to-r from-navy-900 to-business-blue-600 text-white p-6 rounded-t-2xl flex-shrink-0">
              <div className="flex items-center space-x-4">
                <img 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                  alt="Dariusz Wentrych"
                  className="w-16 h-16 rounded-full border-4 border-prestige-gold-400 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold">Dariusz Wentrych</h2>
                  <p className="text-blue-200">Ekspert ds. oddłużania</p>
                </div>
              </div>
            </div>
            
            {/* Calculator Content - Scrollable */}
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
