
import React from 'react';

const TopHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-2 px-4 shadow-lg">
      {/* Pulsujące tło */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-700/50 to-orange-600/50 animate-pulse"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center text-center space-y-2 md:space-y-0 md:space-x-6">
          {/* Główny nagłówek z ikoną ognia */}
          <div className="flex items-center space-x-2">
            <span className="text-xl animate-bounce">🔥</span>
            <span className="font-black text-sm md:text-base uppercase tracking-wide">
              TYLKO W LIPCU - BEZPŁATNA KONSULTACJA Z DARIUSZEM WENTRYCHEM
            </span>
          </div>
          
          {/* Lista korzyści */}
          <div className="hidden lg:flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <span className="text-green-300">✓</span>
              <span>Autor bestsellera "Nowe Życie Bez Długów"</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-green-300">✓</span>
              <span>Osobiście przeanalizuje Twoją sytuację</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-green-300">✓</span>
              <span>Konkretny plan oddłużenia w 24h</span>
            </div>
          </div>
          
          {/* Pulsująca liczba miejsc */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm">ZOSTAŁO TYLKO</span>
              <span className="bg-white text-red-600 font-black text-lg px-2 py-0.5 rounded-full animate-pulse shadow-lg">
                12
              </span>
              <span className="font-bold text-sm">MIEJSC W TYM MIESIĄCU</span>
            </div>
          </div>
        </div>
        
        {/* Mobile - lista korzyści */}
        <div className="lg:hidden mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
          <div className="flex items-center space-x-1">
            <span className="text-green-300">✓</span>
            <span>Autor bestsellera</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-green-300">✓</span>
            <span>Osobista analiza</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-green-300">✓</span>
            <span>Plan w 24h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
