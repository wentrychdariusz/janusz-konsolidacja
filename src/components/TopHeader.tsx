import React from 'react';
import OptimizedImage from './OptimizedImage';

const TopHeader = () => {
  return (
    <div className="lg:hidden bg-gradient-to-r from-navy-800 to-business-blue-600 text-white py-3 px-4 relative overflow-hidden">
      {/* Pieniądze jako tło z prostym, czystym przejściem */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: `url('/lovable-uploads/9770f5b4-d691-467a-97c7-8e2c55682cc3.png')`,
        }}
      ></div>
      
      {/* Czyste przejście gradientowe */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/30 to-business-blue-500/20"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left side - Book promotion with clean design */}
          <div className="flex items-center justify-center md:justify-start">
            {/* Czysta tabelka z prostymi kolorami */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20 overflow-hidden">
              {/* Czyste przejście */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-xl"></div>
              
              <div className="relative flex items-center space-x-4">
                {/* Book image with optimization */}
                <div className="relative flex-shrink-0">
                  <OptimizedImage
                    src="/lovable-uploads/68877fd7-1b70-47e9-b545-82e5e2b6e5e4.png"
                    alt="Książka Nowe Życie Bez Długów"
                    className="relative h-16 md:h-18 object-contain rounded-lg shadow-lg border border-white/30"
                    priority={true}
                    width={64}
                    height={72}
                  />
                </div>
                
                {/* Text content with clean typography */}
                <div className="text-left flex-1 min-w-0">
                  <div className="text-prestige-gold-400 font-bold text-xs mb-1 uppercase tracking-wide">
                    FIRMA AUTORA BESTSELLERA
                  </div>
                  <div className="text-white font-black text-sm md:text-base leading-tight mb-1">
                    "NOWE ŻYCIE BEZ DŁUGÓW"
                  </div>
                  <div className="text-prestige-gold-400 font-bold text-xs md:text-sm mb-2 uppercase">
                    DARIUSZA WENTRYCHA
                  </div>
                  
                  {/* Clean rating section */}
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-prestige-gold-400 text-sm">★</span>
                      ))}
                    </div>
                    {/* Czysta ramka dla oceny 4.9 */}
                    <div className="bg-white/20 border border-white/30 rounded-lg px-2 py-1">
                      <div className="text-prestige-gold-400 font-bold text-sm">
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
