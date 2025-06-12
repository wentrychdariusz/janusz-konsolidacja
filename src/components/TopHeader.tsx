
import React from 'react';

const TopHeader = () => {
  return (
    <div className="lg:hidden bg-gradient-to-r from-business-blue-600 via-business-blue-500 to-navy-600 text-white py-3 px-4 relative overflow-hidden">
      {/* Pieniądze jako tło z ciemniejszym przejściem z granatu do błękitu */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: `url('/lovable-uploads/9770f5b4-d691-467a-97c7-8e2c55682cc3.png')`,
        }}
      ></div>
      
      {/* Ciemniejsze przejście z granatu do błękitu na tle z pieniędzmi */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-700/20 via-navy-600/15 to-business-blue-500/10"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left side - Book promotion with modern design */}
          <div className="flex items-center justify-center md:justify-start">
            {/* Kompaktowy kontener z nowym kolorem tła i ciemniejszymi przejściami tonalnymi */}
            <div className="relative bg-gradient-to-br from-navy-800/10 via-business-blue-800/8 to-navy-900/12 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/15 overflow-hidden">
              {/* Ciemniejsze przejścia tonalne dla nowoczesności */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy-700/8 via-business-blue-600/10 to-navy-800/15 rounded-xl"></div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/3 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-prestige-gold-400/15 rounded-full blur-lg"></div>
              
              <div className="relative flex items-center space-x-4">
                {/* Book image with enhanced styling */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-prestige-gold-400/25 to-navy-600/20 rounded-lg blur-sm transform scale-105"></div>
                  <img 
                    src="/lovable-uploads/68877fd7-1b70-47e9-b545-82e5e2b6e5e4.png" 
                    alt="Książka Nowe Życie Bez Długów" 
                    className="relative h-16 md:h-18 object-contain rounded-lg shadow-xl border border-white/25"
                  />
                </div>
                
                {/* Text content with improved typography */}
                <div className="text-left flex-1 min-w-0">
                  <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-300 bg-clip-text text-transparent font-bold text-xs mb-1 uppercase tracking-wide">
                    FIRMA AUTORA BESTSELLERA
                  </div>
                  <div className="text-white font-black text-sm md:text-base leading-tight mb-1">
                    "NOWE ŻYCIE BEZ DŁUGÓW"
                  </div>
                  <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-300 bg-clip-text text-transparent font-bold text-xs md:text-sm mb-2 uppercase">
                    DARIUSZA WENTRYCHA
                  </div>
                  
                  {/* Enhanced rating section with golden colors and stylish frame */}
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-prestige-gold-400 text-sm drop-shadow-lg">★</span>
                      ))}
                    </div>
                    {/* Stylowa złota ramka dla oceny 4.9 z ciemniejszymi przejściami */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-prestige-gold-400/25 to-navy-600/20 rounded-lg blur-sm"></div>
                      <div className="relative bg-gradient-to-r from-prestige-gold-400/15 via-white/8 to-navy-600/10 backdrop-blur-sm border border-prestige-gold-400/40 rounded-lg px-2 py-1">
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
