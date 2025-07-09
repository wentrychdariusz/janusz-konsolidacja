
import React from 'react';
import { useABTest } from '../hooks/useABTest';
import OptimizedImage from './OptimizedImage';

const ABTestTopHeader = () => {
  const { variant, isVariantA, isVariantB, isLoaded } = useABTest({
    testName: 'top_header_test',
    splitRatio: 0.5 // 50/50 split
  });

  // Nie renderuj nic dopóki test się nie załaduje
  if (!isLoaded) {
    return null;
  }

  // Wariant A - oryginalny
  if (isVariantA) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm text-white py-4 px-8 shadow-lg border-b border-slate-700/50 relative overflow-hidden md:hidden">
        
        {/* Background image z Dariuszem - tylko na mobile */}
        <div className="absolute inset-0">
          <OptimizedImage src="/lovable-uploads/0b6ca5a9-3bf0-48d9-9105-cd311475489f.png" alt="Dariusz Wentrych" className="w-full h-full object-cover opacity-40" priority={true} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            
            {/* Lewa kolumna - Avatar i główny tekst */}
            <div className="flex items-center justify-start space-x-4">
              <div className="hidden md:block flex-shrink-0">
                <OptimizedImage src="/lovable-uploads/669e599a-c272-4fec-81fe-5ca4c496d018.png" alt="Dariusz Wentrych" className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-3 border-amber-400/90 shadow-xl object-cover ring-2 ring-amber-300/50 brightness-110" priority={true} width={80} height={80} />
              </div>
              
              <div className="text-left">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <span className="text-amber-400 text-base animate-pulse">🔥</span>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1 rounded-md">
                    <span className="font-semibold text-white text-xs lg:text-sm uppercase tracking-wide">
                      TYLKO W LIPCU
                    </span>
                  </div>
                </div>
                <div className="font-bold text-sm lg:text-base text-white leading-tight text-left">
                  BEZPŁATNA KONSULTACJA Z DARIUSZEM WENTRYCHEM
                </div>
              </div>
            </div>
            
            {/* Prawa kolumna - Korzyści i liczba miejsc */}
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-end space-y-3 lg:space-y-0 lg:space-x-6">
              
              <div className="flex items-center space-x-1 text-xs">
                <span className="text-emerald-400 font-bold text-sm">✓</span>
                <span className="text-slate-200">Autor bestsellera "Nowe życie bez długów"</span>
              </div>
              
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
  }

  // Wariant B - nowa wersja do testowania
  if (isVariantB) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-900/95 via-red-800/95 to-red-900/95 backdrop-blur-sm text-white py-4 px-8 shadow-lg border-b border-red-700/50 relative overflow-hidden md:hidden">
        
        {/* Background image z Dariuszem - tylko na mobile */}
        <div className="absolute inset-0">
          <OptimizedImage src="/lovable-uploads/0b6ca5a9-3bf0-48d9-9105-cd311475489f.png" alt="Dariusz Wentrych" className="w-full h-full object-cover opacity-40" priority={true} />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 via-red-800/60 to-red-900/70"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            
            <div className="flex items-center justify-start space-x-4">
              <div className="hidden md:block flex-shrink-0">
                <OptimizedImage src="/lovable-uploads/669e599a-c272-4fec-81fe-5ca4c496d018.png" alt="Dariusz Wentrych" className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-3 border-yellow-400/90 shadow-xl object-cover ring-2 ring-yellow-300/50 brightness-110" priority={true} width={80} height={80} />
              </div>
              
              <div className="text-left">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <span className="text-yellow-400 text-base animate-pulse">⚡</span>
                  <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 px-3 py-1 rounded-md">
                    <span className="font-semibold text-white text-xs lg:text-sm uppercase tracking-wide">
                      OSTATNIE DNI!
                    </span>
                  </div>
                </div>
                <div className="font-bold text-sm lg:text-base text-white leading-tight text-left">
                  EKSKLUZYWNA KONSULTACJA - TYLKO DZIŚ!
                </div>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-end space-y-3 lg:space-y-0 lg:space-x-6">
              
              <div className="flex items-center space-x-1 text-xs">
                <span className="text-green-400 font-bold text-sm">🏆</span>
                <span className="text-red-200">#1 Ekspert w Polsce</span>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-600/90 to-yellow-700/90 rounded-lg px-3 py-1.5 shadow-md border border-yellow-500/30 flex-shrink-0">
                <div className="flex flex-col items-center text-center">
                  <div className="text-yellow-100 text-xs font-medium uppercase tracking-wide">
                    tylko
                  </div>
                  <div className="bg-white/95 text-yellow-600 font-black text-lg px-2 py-0.5 rounded-md shadow-sm animate-bounce">
                    3
                  </div>
                  <div className="text-yellow-200 text-xs font-normal lowercase">
                    miejsca pozostały!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ABTestTopHeader;
