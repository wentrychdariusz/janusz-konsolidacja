
import React from 'react';

const TopHeader = () => {
  return (
    <div className="bg-gradient-to-r from-business-blue-600 via-business-blue-500 to-navy-600 text-white py-6 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-prestige-gold-400/20 to-transparent animate-pulse"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left side - Book promotion */}
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <div className="bg-gradient-to-br from-business-blue-700 to-navy-700 rounded-lg p-3 shadow-lg border-2 border-prestige-gold-400/60">
              <div className="text-center">
                <div className="text-prestige-gold-400 font-bold text-sm mb-1">FIRMA AUTORA KSIĄŻKI</div>
                <div className="text-white font-black text-lg leading-tight">"NOWE ŻYCIE BEZ DŁUGÓW"</div>
                <div className="text-prestige-gold-400 font-bold text-base mt-1">DARIUSZA WENTRYCHA</div>
                <div className="flex justify-center mt-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-prestige-gold-400 text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-white ml-2 text-sm font-bold">4.9</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Main message */}
          <div className="text-center md:text-right">
            <p className="text-sm md:text-base font-bold">
              💸 Pomogłem już ponad 2000 osób wyjść z długów - Zobacz jak to zrobić LEGALNIE i BEZ RYZYKA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
