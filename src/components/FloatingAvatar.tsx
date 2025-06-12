
import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import DebtCalculator from './DebtCalculator';

const FloatingAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-animacja poruszania się awatara
  useEffect(() => {
    if (isDragging || isOpen) return;

    const interval = setInterval(() => {
      if (isAnimating) {
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 100;
        
        setPosition(prev => ({
          x: Math.max(20, Math.min(maxX, prev.x + (Math.random() - 0.5) * 100)),
          y: Math.max(20, Math.min(maxY, prev.y + (Math.random() - 0.5) * 100))
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging, isOpen, isAnimating]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAnimating(false);
    
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - startX));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - startY));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setTimeout(() => setIsAnimating(true), 2000);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleAvatarClick = () => {
    if (!isDragging) {
      setIsOpen(true);
      setIsAnimating(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsAnimating(true), 1000);
  };

  return (
    <>
      {/* Floating Avatar */}
      <div
        className={`fixed z-50 cursor-pointer transition-all duration-500 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isDragging ? 'scale(1.1)' : 'scale(1)'
        }}
        onMouseDown={handleMouseDown}
        onClick={handleAvatarClick}
      >
        {/* Avatar Container */}
        <div className="relative group">
          {/* Avatar Image */}
          <div className="w-20 h-20 rounded-full border-4 border-prestige-gold-400 shadow-xl bg-white overflow-hidden hover:scale-110 transition-transform duration-300">
            <img 
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
              alt="Dariusz Wentrych"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Message Bubble */}
          <div className="absolute -top-16 -left-8 bg-white rounded-xl shadow-lg p-3 border-2 border-prestige-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <div className="text-navy-900 font-semibold text-sm">
              Sprawdź czy mogę Ci pomóc!
            </div>
            <div className="absolute bottom-0 left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
          </div>
          
          {/* Chat Icon Indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center border-2 border-white">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
          
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full border-4 border-prestige-gold-400 opacity-30 animate-ping"></div>
        </div>
      </div>

      {/* Modal with Calculator */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Header with Dariusz */}
            <div className="bg-gradient-to-r from-navy-900 to-business-blue-600 text-white p-6 rounded-t-2xl">
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
            
            {/* Calculator Content */}
            <div className="p-6">
              <DebtCalculator />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAvatar;
