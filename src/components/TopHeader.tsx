import React from 'react';
import OptimizedImage from './OptimizedImage';
const TopHeader = () => {
  return <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm text-white py-4 px-8 shadow-lg border-b border-slate-700/50 relative overflow-hidden md:hidden">
      
      {/* Background image z Dariuszem - tylko na mobile */}
      <div className="absolute inset-0 hidden">
        <OptimizedImage src="/lovable-uploads/0b6ca5a9-3bf0-48d9-9105-cd311475489f.png" alt="Dariusz Wentrych" className="w-full h-full object-cover opacity-40" priority={true} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          
          {/* Lewa kolumna - Avatar i główny tekst */}
          
          
          {/* Prawa kolumna - Korzyści i liczba miejsc */}
          
        </div>
      </div>
    </div>;
};
export default TopHeader;