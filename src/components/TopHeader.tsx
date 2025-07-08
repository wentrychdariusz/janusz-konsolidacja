
import React from 'react';
import OptimizedImage from './OptimizedImage';

const TopHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm text-white py-2 px-4 shadow-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center text-center space-y-2 lg:space-y-0 lg:space-x-6">
          
          {/* Sekcja główna z awatarem i tekstem */}
          <div className="flex items-center space-x-3">
            {/* Avatar Dariusza - widoczny tylko na desktop */}
            <div className="hidden md:block">
              <OptimizedImage
                src="/lovable-uploads/669e599a-c272-4fec-81fe-5ca4c496d018.png"
                alt="Dariusz Wentrych"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-amber-400/80 shadow-md object-cover"
                priority={true}
                width={48}
                height={48}
              />
            </div>
            
            {/* Główny tekst z lepszą hierarchią */}
            <div className="text-left">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-amber-400 text-base animate-pulse">🔥</span>
                <span className="font-semibold text-amber-400 text-xs lg:text-sm uppercase tracking-wide">
                  TYLKO W LIPCU
                </span>
              </div>
              <div className="font-bold text-sm lg:text-base text-white leading-tight">
                BEZPŁATNA KONSULTACJA Z DARIUSZEM WENTRYCHEM
              </div>
            </div>
          </div>
          
          {/* Lista korzyści - desktop */}
          <div className="hidden xl:flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <span className="text-emerald-400 font-bold text-sm">✓</span>
              <span className="text-slate-200">Autor bestsellera</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-emerald-400 font-bold text-sm">✓</span>
              <span className="text-slate-200">Osobista analiza</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-emerald-400 font-bold text-sm">✓</span>
              <span className="text-slate-200">Plan w 24h</span>
            </div>
          </div>
          
          {/* Liczba miejsc z nowoczesnym designem */}
          <div className="bg-gradient-to-r from-rose-600/90 to-rose-700/90 rounded-lg px-3 py-1.5 shadow-md border border-rose-500/30">
            <div className="flex flex-col items-center text-center">
              <div className="text-rose-100 text-xs font-medium uppercase tracking-wide">
                zostało
              </div>
              <div className="bg-white/95 text-rose-600 font-black text-lg px-2 py-0.5 rounded-md shadow-sm">
                12
              </div>
              <div className="text-rose-200 text-xs font-normal lowercase">
                miejsc w tym miesiącu
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile/Tablet - kompaktowa lista korzyści */}
        <div className="xl:hidden mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
          <div className="flex items-center space-x-1">
            <span className="text-emerald-400 font-bold">✓</span>
            <span className="text-slate-300">Autor bestsellera</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-emerald-400 font-bold">✓</span>
            <span className="text-slate-300">Osobista analiza</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-emerald-400 font-bold">✓</span>
            <span className="text-slate-300">Plan w 24h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
