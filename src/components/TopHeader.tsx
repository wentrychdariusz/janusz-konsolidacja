
import React from 'react';
import OptimizedImage from './OptimizedImage';

const TopHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm text-white py-2 px-4 shadow-lg border-b border-slate-700/50 relative overflow-hidden">
      
      {/* Background image z Dariuszem - tylko na mobile */}
      <div className="absolute inset-0 md:hidden">
        <OptimizedImage
          src="/lovable-uploads/0b6ca5a9-3bf0-48d9-9105-cd311475489f.png"
          alt="Dariusz Wentrych"
          className="w-full h-full object-cover opacity-40"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          
          {/* Lewa kolumna - Avatar i główny tekst */}
          <div className="flex items-center justify-start space-x-4">
            {/* Avatar Dariusza - widoczny tylko na desktop, większy i bardziej widoczny */}
            <div className="hidden md:block flex-shrink-0">
              <OptimizedImage
                src="/lovable-uploads/669e599a-c272-4fec-81fe-5ca4c496d018.png"
                alt="Dariusz Wentrych"
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-3 border-amber-400/90 shadow-lg object-cover ring-2 ring-amber-300/50"
                priority={true}
                width={64}
                height={64}
              />
            </div>
            
            {/* Główny tekst - wyrównany do lewej */}
            <div className="text-left">
              <div className="flex items-center justify-start space-x-2 mb-1">
                <span className="text-amber-400 text-base animate-pulse">🔥</span>
                <span className="font-semibold text-amber-400 text-xs lg:text-sm uppercase tracking-wide">
                  TYLKO W LIPCU
                </span>
              </div>
              <div className="font-bold text-sm lg:text-base text-white leading-tight text-left">
                BEZPŁATNA KONSULTACJA Z DARIUSZEM WENTRYCHEM
              </div>
            </div>
          </div>
          
          {/* Prawa kolumna - Korzyści i liczba miejsc */}
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-end space-y-3 lg:space-y-0 lg:space-x-6">
            
            {/* Korzyść */}
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-emerald-400 font-bold text-sm">✓</span>
              <span className="text-slate-200">Autor bestsellera nowe życie bez długów</span>
            </div>
            
            {/* Liczba miejsc z pulsującą animacją */}
            <div className="bg-gradient-to-r from-rose-600/90 to-rose-700/90 rounded-lg px-3 py-1.5 shadow-md border border-rose-500/30 flex-shrink-0">
              <div className="flex flex-col items-center text-center">
                <div className="text-rose-100 text-xs font-medium uppercase tracking-wide">
                  zostało
                </div>
                <div className="bg-white/95 text-rose-600 font-black text-lg px-2 py-0.5 rounded-md shadow-sm animate-pulse">
                  12
                </div>
                <div className="text-rose-200 text-xs font-normal lowercase">
                  miejsc w tym miesiącu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
