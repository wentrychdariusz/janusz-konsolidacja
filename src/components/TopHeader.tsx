
import React from 'react';
import OptimizedImage from './OptimizedImage';

const TopHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-4 px-4 shadow-xl border-b border-gray-700">
      {/* Eleganckie pulsujące tło */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-pulse"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center text-center space-y-3 lg:space-y-0 lg:space-x-8">
          
          {/* Sekcja główna z awatarem i tekstem */}
          <div className="flex items-center space-x-4">
            {/* Avatar Dariusza */}
            <div className="hidden md:block">
              <OptimizedImage
                src="/lovable-uploads/669e599a-c272-4fec-81fe-5ca4c496d018.png"
                alt="Dariusz Wentrych"
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-3 border-yellow-400 shadow-lg object-cover"
                priority={true}
                width={56}
                height={56}
              />
            </div>
            
            {/* Główny tekst z lepszą hierarchią */}
            <div className="text-left">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-yellow-400 text-lg animate-bounce">🔥</span>
                <span className="font-bold text-yellow-400 text-sm lg:text-base uppercase tracking-wide">
                  TYLKO W LIPCU
                </span>
              </div>
              <div className="font-bold text-base lg:text-lg text-white">
                BEZPŁATNA KONSULTACJA Z DARIUSZEM WENTRYCHEM
              </div>
            </div>
          </div>
          
          {/* Lista korzyści - desktop */}
          <div className="hidden xl:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-green-400 font-bold">✓</span>
              <span className="text-gray-200">Autor bestsellera "Nowe Życie Bez Długów"</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 font-bold">✓</span>
              <span className="text-gray-200">Osobiście przeanalizuje Twoją sytuację</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 font-bold">✓</span>
              <span className="text-gray-200">Konkretny plan oddłużenia w 24h</span>
            </div>
          </div>
          
          {/* Liczba miejsc z lepszą typografią */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl px-4 py-2 shadow-lg border border-red-500">
            <div className="flex flex-col items-center text-center">
              <div className="text-white text-xs font-medium uppercase tracking-wide mb-1">
                Zostało tylko
              </div>
              <div className="bg-white text-red-600 font-black text-2xl px-3 py-1 rounded-lg animate-pulse shadow-md">
                12
              </div>
              <div className="text-red-100 text-xs font-normal mt-1 lowercase">
                miejsc w tym miesiącu
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile/Tablet - kompaktowa lista korzyści */}
        <div className="xl:hidden mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
          <div className="flex items-center space-x-1">
            <span className="text-green-400 font-bold">✓</span>
            <span className="text-gray-300">Autor bestsellera</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-green-400 font-bold">✓</span>
            <span className="text-gray-300">Osobista analiza</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-green-400 font-bold">✓</span>
            <span className="text-gray-300">Plan w 24h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
