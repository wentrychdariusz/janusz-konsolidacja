
import React from 'react';

const TopHeader = () => {
  return (
    <div className="bg-gradient-to-r from-business-blue-600 via-business-blue-500 to-navy-600 text-white py-3 px-4 relative overflow-hidden">
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
          {/* Left side - Book promotion with book image */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="bg-gradient-to-br from-business-blue-700 to-navy-700 rounded-lg p-4 shadow-xl border-2 border-prestige-gold-400/70 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                {/* Book image */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-prestige-gold-400/50">
                  <img 
                    src="/lovable-uploads/68877fd7-1b70-47e9-b545-82e5e2b6e5e4.png" 
                    alt="Książka Nowe Życie Bez Długów" 
                    className="h-16 md:h-20 object-contain rounded shadow-md"
                  />
                </div>
                
                {/* Text content */}
                <div className="text-center">
                  <div className="text-prestige-gold-400 font-bold text-xs mb-1">FIRMA AUTORA BESTSELLERA</div>
                  <div className="text-white font-black text-sm leading-tight">"NOWE ŻYCIE BEZ DŁUGÓW"</div>
                  <div className="text-prestige-gold-400 font-bold text-sm mt-1">DARIUSZA WENTRYCHA</div>
                  <div className="flex justify-center mt-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-prestige-gold-400 text-xs">★</span>
                      ))}
                    </div>
                    <span className="text-white ml-2 text-xs font-bold">4.9</span>
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
