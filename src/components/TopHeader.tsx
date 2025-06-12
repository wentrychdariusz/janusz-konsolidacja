
import React from 'react';

const TopHeader = () => {
  return (
    <div className="lg:hidden bg-gradient-to-r from-business-blue-600 via-business-blue-500 to-navy-600 text-white py-4 px-4 relative overflow-hidden">
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
            <div className="bg-gradient-to-br from-white/15 via-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-5">
                {/* Book image with enhanced styling */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-prestige-gold-400/30 to-business-blue-400/30 rounded-lg blur-lg transform scale-110"></div>
                  <img 
                    src="/lovable-uploads/68877fd7-1b70-47e9-b545-82e5e2b6e5e4.png" 
                    alt="Książka Nowe Życie Bez Długów" 
                    className="relative h-24 md:h-28 object-contain rounded-lg shadow-2xl border-2 border-white/20"
                  />
                </div>
                
                {/* Text content with improved typography */}
                <div className="text-left flex-1">
                  <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-300 bg-clip-text text-transparent font-bold text-xs mb-2 uppercase tracking-wide">
                    FIRMA AUTORA BESTSELLERA
                  </div>
                  <div className="text-white font-black text-base md:text-lg leading-tight mb-1">
                    "NOWE ŻYCIE BEZ DŁUGÓW"
                  </div>
                  <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-300 bg-clip-text text-transparent font-bold text-sm mb-3 uppercase">
                    DARIUSZA WENTRYCHA
                  </div>
                  
                  {/* Enhanced rating section */}
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-prestige-gold-400 text-sm drop-shadow-lg">★</span>
                      ))}
                    </div>
                    <div className="bg-gradient-to-r from-white to-warm-neutral-100 bg-clip-text text-transparent font-bold text-sm">
                      4.9
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
