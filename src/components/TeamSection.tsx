
import React from 'react';
import OptimizedImage from './OptimizedImage';
import { Star, Users, Shield, Award } from 'lucide-react';

const TeamSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-navy-900 via-slate-800 to-slate-900">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            JESTEŚMY TU, ŻEBY CI 
            <span className="text-prestige-gold-400"> POMÓC</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div className="text-warm-neutral-200 text-lg md:text-xl leading-relaxed font-lato space-y-6">
              <p>
                Znalezienie firmy, której naprawdę można zaufać, to dziś prawdziwe wyzwanie. Wielu naszych klientów miało już za sobą trudne doświadczenia, poczucie zawodu i niespełnione oczekiwania.
              </p>
              
              <p>
                Tym bardziej cieszy nas, gdy słyszymy, że w końcu trafili na zespół, który działa rzetelnie i z pełnym zaangażowaniem.
              </p>
              
              <p className="text-white font-semibold">
                Jeśli Ty też szukasz sprawdzonych rozwiązań i realnego wsparcia, skontaktuj się z nami! Pomożemy!
              </p>
            </div>

            {/* Rating Section */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border border-prestige-gold-400/30 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-prestige-gold-400 font-montserrat mb-2">
                  4.9
                </div>
                <div className="text-white text-lg font-semibold mb-1">
                  (383 opinii)
                </div>
                <div className="text-warm-neutral-300 text-sm">
                  na podstawie zweryfikowanych opinii Google i Oferteo
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-navy-900" />
                </div>
                <div className="text-white text-sm font-semibold">Zespół ekspertów</div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-white text-sm font-semibold">Pełne bezpieczeństwo</div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-white text-sm font-semibold">20 lat doświadczenia</div>
              </div>
            </div>
          </div>

          {/* Right Content - Team Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <OptimizedImage
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                alt="Zespół ekspertów Dariusza Wentrycha - doradcy finansowi"
                className="w-full max-w-lg h-auto object-cover rounded-2xl shadow-2xl border-4 border-prestige-gold-400/30"
                width={500}
                height={400}
              />
              
              {/* Overlay Badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 rounded-2xl px-6 py-3 shadow-xl">
                <div className="text-navy-900 font-montserrat font-bold text-lg">
                  Zespół ekspertów
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
