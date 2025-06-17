
import React from 'react';
import { Shield, CheckCircle, Star } from 'lucide-react';

const GuaranteeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-navy-900 via-business-blue-900 to-prestige-gold-900">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-prestige-gold-400 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-navy-900" />
            </div>
          </div>
          
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            GWARANCJA JAKOŚCI
            <span className="text-prestige-gold-400"> USŁUG</span>
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-prestige-gold-400/30 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Ikona gwiazdek */}
              <div className="flex-shrink-0">
                <div className="flex space-x-1 mb-4 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-prestige-gold-400 fill-current" />
                  ))}
                </div>
              </div>
              
              {/* Treść gwarancji */}
              <div className="text-center md:text-left">
                <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-4">
                  Gwarancja Najlepszej Oferty
                </h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
                  Jeśli znajdziesz lepszą ofertę oddłużeniową gdzie indziej, 
                  <span className="text-prestige-gold-400 font-semibold"> my zrobimy dla Ciebie jeszcze lepszą!</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle className="w-5 h-5 text-success-400" />
                    <span className="font-medium">100% Satysfakcji</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle className="w-5 h-5 text-success-400" />
                    <span className="font-medium">Najlepsze Warunki</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle className="w-5 h-5 text-success-400" />
                    <span className="font-medium">Bezpłatna Konsultacja</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dodatkowe informacje */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-white/80 text-center text-sm md:text-base">
                Dariusz Wentrych - <span className="text-prestige-gold-400 font-semibold">ekspert nr 1 w oddłużniu osób fizycznych</span> w Polsce. 
                Twoja satysfakcja to nasz priorytet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
