
import React from 'react';

const TopHeader = () => {
  return (
    <div className="bg-gradient-to-r from-business-blue-600 via-business-blue-500 to-navy-600 text-white py-6 px-4 relative overflow-hidden">
      {/* Pieniądze jako tło */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/lovable-uploads/9770f5b4-d691-467a-97c7-8e2c55682cc3.png')`,
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-prestige-gold-400/20 to-transparent animate-pulse"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left side - Book promotion */}
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <div className="bg-gradient-to-br from-business-blue-700 to-navy-700 rounded-lg p-3 shadow-lg border-2 border-prestige-gold-400/60">
              <div className="text-center">
                <div className="text-prestige-gold-400 font-bold text-sm mb-1">FIRMA AUTORA BESTSELLERA</div>
                <div className="text-white font-black text-lg leading-tight">"NOWE ŻYCIE BEZ DŁUGÓW"</div>
                <div className="text-prestige-gold-400 font-bold text-base mt-1">DARIUSZA WENTRYCHA</div>
                <div className="flex justify-center mt-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-prestige-gold-400 text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-white ml-2 text-sm font-bold">4.9</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Center - Book image */}
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/68877fd7-1b70-47e9-b545-82e5e2b6e5e4.png" 
              alt="Książka Nowe Życie Bez Długów" 
              className="h-32 md:h-40 object-contain shadow-lg rounded-lg"
            />
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
