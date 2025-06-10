
import React, { useState } from 'react';
import QuickRegistrationForm from './QuickRegistrationForm';
import { CheckCircle, Shield, Award, Users, Trophy, Target } from 'lucide-react';

const HeroSection = () => {
  const benefits = [
    {
      icon: Trophy,
      title: "Nr 1 w Polsce",
      description: "Lider w branży oddłużeniowej"
    },
    {
      icon: Users,
      title: "2000+ zadowolonych klientów",
      description: "Skutecznie pomogłem wyjść z długów"
    },
    {
      icon: Target,
      title: "100% skuteczność",
      description: "Sprawdzone i legalne metody"
    }
  ];

  return (
    <section 
      className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 min-h-screen relative"
      style={{
        backgroundImage: `url('/lovable-uploads/eb0658a9-c99a-4631-a61d-1543709a3efa.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/75 to-navy-900/60"></div>
      
      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-6 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <div className="font-montserrat text-prestige-gold-400 text-base sm:text-lg md:text-xl lg:text-2xl text-center md:text-left font-black tracking-wide uppercase">
              Dariusz Wentrych - Ekspert Oddłużenia Nr 1
            </div>
            
            <h1 className="font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center md:text-left leading-tight">
              <span className="text-white">Uwolnij się od </span>
              <span className="text-business-blue-400">długów raz na zawsze</span>
              <span className="text-white"> - 20 lat doświadczenia</span>
            </h1>
            
            <p className="text-warm-neutral-200 text-lg md:text-xl text-center md:text-left font-lato leading-relaxed">
              Jestem Dariusz Wentrych i przez ostatnie 20 lat pomogłem ponad 2000 osób całkowicie 
              uwolnić się od długów. Moje sprawdzone metody są w 100% legalne i skuteczne.
            </p>
            
            {/* Benefits Cards - Bigger and Better */}
            <div className="grid grid-cols-1 gap-4 mt-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-white/20 to-white/10 border-2 border-prestige-gold-400/60 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                      <benefit.icon className="w-8 h-8 text-navy-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-warm-neutral-300 text-base">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="bg-gradient-to-r from-prestige-gold-400/20 to-prestige-gold-500/10 border-2 border-prestige-gold-400/50 rounded-xl p-6 mt-8 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-prestige-gold-400 font-bold text-xl mb-2">Zaufało mi już</div>
                <div className="text-white text-4xl font-black mb-2">2000+ osób</div>
                <div className="text-warm-neutral-200 text-lg">które dziś żyją bez długów</div>
                <div className="mt-4 flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-prestige-gold-400 text-2xl font-bold">20</div>
                    <div className="text-warm-neutral-300 text-sm">lat doświadczenia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-prestige-gold-400 text-2xl font-bold">100%</div>
                    <div className="text-warm-neutral-300 text-sm">skuteczność</div>
                  </div>
                  <div className="text-center">
                    <div className="text-prestige-gold-400 text-2xl font-bold">0 zł</div>
                    <div className="text-warm-neutral-300 text-sm">konsultacja</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Form */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <QuickRegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
