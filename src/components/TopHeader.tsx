
import React from 'react';

const TopHeader = () => {
  return (
    <div className="lg:hidden bg-gradient-to-r from-business-blue-600 via-business-blue-500 to-navy-600 text-white py-3 px-4 relative overflow-hidden">
      {/* Pieniądze jako tło */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: `url('/lovable-uploads/9770f5b4-d691-467a-97c7-8e2c55682cc3.png')`,
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-prestige-gold-400/15 to-transparent"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left side - Book promotion with modern design */}
          <div className="flex items-center justify-center md:justify-start">
            {/* Kompaktowy kontener z gradientowym tłem i przejściami tonalnymi */}
            <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 overflow-hidden">
              {/* Subtelne przejścia tonalne w tle */}
              <div className="absolute inset-0 bg-gradient-to-r from-prestige-gold-400/10 via-transparent to-business-blue-400/10 rounded-xl"></div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-prestige-gold-400/20 rounded-full blur-lg"></div>
              
              <div className="relative flex items-center space-x-4">
                {/* Book image with enhanced styling */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-prestige-gold-400/30 to-business-blue-400/30 rounded-lg blur-sm transform scale-105"></div>
                  <img 
                    src="/lovable-uploads/68877fd7-1b70-47e9-b545-82e5e2b6e5e4.png" 
                    alt="Książka Nowe Życie Bez Długów" 
                    className="relative h-20 md:h-24 object-contain rounded-lg shadow-xl border border-white/30"
                  />
                </div>
                
                {/* Text content with improved typography */}
                <div className="text-left flex-1 min-w-0">
                  <div className="bg-gradient-to-r from-white to-warm-neutral-100 bg-clip-text text-transparent font-bold text-xs mb-1 uppercase tracking-wide">
                    FIRMA AUTORA BESTSELLERA
                  </div>
                  <div className="text-white font-black text-sm md:text-base leading-tight mb-1">
                    "NOWE ŻYCIE BEZ DŁUGÓW"
                  </div>
                  <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-300 bg-clip-text text-transparent font-bold text-xs md:text-sm mb-2 uppercase">
                    DARIUSZA WENTRYCHA
                  </div>
                  
                  {/* Enhanced rating section with stylish frame */}
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-prestige-gold-400 text-sm drop-shadow-lg">★</span>
                      ))}
                    </div>
                    {/* Stylowa ramka dla oceny 4.9 */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-prestige-gold-400/30 to-prestige-gold-500/30 rounded-lg blur-sm"></div>
                      <div className="relative bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-prestige-gold-400/50 rounded-lg px-2 py-1">
                        <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-300 bg-clip-text text-transparent font-bold text-sm">
                          4.9
                        </div>
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
