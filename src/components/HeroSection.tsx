
import React, { useState } from 'react';
import QuickRegistrationForm from './QuickRegistrationForm';
import { CheckCircle, Shield, Award } from 'lucide-react';

const HeroSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "20 lat doświadczenia",
      description: "Sprawdzony ekspert oddłużenia"
    },
    {
      icon: CheckCircle,
      title: "2000+ osób pomożonych",
      description: "Realne rezultaty i zadowoleni klienci"
    },
    {
      icon: Award,
      title: "100% legalnie",
      description: "Bezpieczne metody zgodne z prawem"
    }
  ];

  return (
    <section 
      className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 min-h-screen relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=center')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/85 to-navy-900/90"></div>
      
      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-6 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <div className="font-montserrat text-prestige-gold-400 text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-left font-black tracking-wide uppercase">
              Dariusz Wentrych - Ekspert Oddłużenia
            </div>
            
            <h1 className="font-montserrat font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center md:text-left leading-tight">
              <span className="text-white">Uwolnij się od </span>
              <span className="text-business-blue-400">długów raz na zawsze</span>
              <span className="text-white"> - 20 lat doświadczenia w pomocy Polakom</span>
            </h1>
            
            <p className="text-warm-neutral-200 text-base md:text-lg text-center md:text-left font-lato">
              Jestem Dariusz Wentrych i przez ostatnie 20 lat pomogłem ponad 2000 osób całkowicie 
              uwolnić się od długów. Moje sprawdzone metody są w 100% legalne i skuteczne.
            </p>
            
            {/* Benefits Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-white/15 to-white/10 border border-prestige-gold-400/50 rounded-lg p-4 text-center hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <benefit.icon className="w-6 h-6 text-navy-900" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{benefit.title}</h3>
                  <p className="text-warm-neutral-300 text-xs">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 border border-prestige-gold-200/30 rounded-xl p-4 mt-6">
              <div className="text-center">
                <div className="text-prestige-gold-400 font-bold text-lg mb-1">Zaufało mi już</div>
                <div className="text-white text-2xl font-black">2000+ osób</div>
                <div className="text-warm-neutral-300 text-sm mt-1">które dziś żyją bez długów</div>
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
