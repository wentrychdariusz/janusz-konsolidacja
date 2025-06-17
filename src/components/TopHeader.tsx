
import React from 'react';
import OptimizedImage from './OptimizedImage';

const TopHeader = () => {
  return (
    <div className="lg:hidden bg-gradient-to-r from-navy-900 to-navy-800 text-white py-3 px-4 relative overflow-hidden">
      {/* Nowoczesne tło z subtelnym wzorem */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('/lovable-uploads/9770f5b4-d691-467a-97c7-8e2c55682cc3.png')`,
        }}
      ></div>
      
      {/* Czyste, nowoczesne przejście */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/60 via-business-blue-900/40 to-navy-800/70"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left side - Nowoczesna promocja książki */}
          <div className="flex items-center justify-center md:justify-start">
            {/* Nowoczesna karta z czystym designem */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10 overflow-hidden">
              {/* Nowoczesne, czyste tło */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-prestige-gold-500/5 rounded-2xl"></div>
              
              <div className="relative flex items-center space-x-4">
                {/* Książka z nowoczesnym cieniem - optymalizacja dla mobile */}
                <div className="relative flex-shrink-0">
                  <OptimizedImage
                    src="/lovable-uploads/68877fd7-1b70-47e9-b545-82e5e2b6e5e4.png"
                    alt="Książka Nowe Życie Bez Długów"
                    className="relative h-12 w-8 sm:h-16 sm:w-10 md:h-18 md:w-12 object-contain rounded-xl shadow-2xl border border-white/20"
                    priority={true}
                    width={64}
                    height={72}
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 72px"
                  />
                  {/* Nowoczesny efekt świetlny */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-prestige-gold-400/20 to-prestige-gold-500/20 rounded-xl blur-sm -z-10"></div>
                </div>
                
                {/* Nowoczesna typografia */}
                <div className="text-left flex-1 min-w-0">
                  <div className="text-prestige-gold-300 font-semibold text-xs mb-1 uppercase tracking-wider">
                    FIRMA AUTORA BESTSELLERA
                  </div>
                  <div className="text-white font-black text-sm md:text-base leading-tight mb-1">
                    "NOWE ŻYCIE BEZ DŁUGÓW"
                  </div>
                  <div className="text-prestige-gold-300 font-bold text-xs md:text-sm mb-2 uppercase tracking-wide">
                    DARIUSZA WENTRYCHA
                  </div>
                  
                  {/* Nowoczesna sekcja oceny */}
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-prestige-gold-300 text-sm drop-shadow-sm">★</span>
                      ))}
                    </div>
                    {/* Nowoczesna ramka dla oceny */}
                    <div className="bg-gradient-to-r from-prestige-gold-500/20 to-prestige-gold-400/30 border border-prestige-gold-400/30 rounded-xl px-3 py-1.5 backdrop-blur-sm">
                      <div className="text-prestige-gold-200 font-bold text-sm">
                        4.9
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Empty or additional content */}
          <div className="text-center md:text-right">
            {/* Miejsce na dodatkową treść w przyszłości */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
