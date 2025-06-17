
import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const GuaranteeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-navy-900 via-business-blue-800 to-navy-900">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-prestige-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-navy-900" />
          </div>
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
            GWARANCJA JAKOŚCI USŁUG
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Główna karta gwarancji */}
          <div className="bg-gradient-to-br from-business-blue-700 to-navy-800 rounded-3xl p-8 md:p-12 border border-prestige-gold-400/30 shadow-2xl mb-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-prestige-gold-400 rounded-full flex items-center justify-center mr-2">
                    <span className="text-navy-900 text-lg">★</span>
                  </div>
                ))}
              </div>
              <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-4">
                Gwarancja Najlepszej Oferty
              </h3>
              <p className="text-warm-neutral-200 text-lg md:text-xl leading-relaxed">
                Jeśli znajdziesz lepszą ofertę oddłużeniową gdzie indziej, my zrobimy dla Ciebie jeszcze lepszą!
              </p>
            </div>
            
            {/* Lista gwarancji */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-success-400 flex-shrink-0" />
                <span className="text-white font-semibold">100% Satysfakcji</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-success-400 flex-shrink-0" />
                <span className="text-white font-semibold">Najlepsze Warunki</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-success-400 flex-shrink-0" />
                <span className="text-white font-semibold">Bezpłatna Konsultacja</span>
              </div>
            </div>
            
            {/* Stopka z podpisem eksperta i miniaturą zdjęcia */}
            <div className="pt-6 border-t border-prestige-gold-400/30">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-prestige-gold-400 shadow-lg">
                  <OptimizedImage
                    src="/lovable-uploads/47e41288-8e02-4e8b-8618-cba00ccf58ce.png"
                    alt="Dariusz Wentrych"
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="text-center">
                  <p className="text-warm-neutral-300 text-sm md:text-base">
                    <span className="font-semibold text-prestige-gold-400">Dariusz Wentrych</span> - ekspert nr 1 w oddłużniu osób fizycznych w Polsce.<br />
                    Twoja satysfakcja to nasz priorytet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
