
import React, { useState } from 'react';
import QuickRegistrationForm from './QuickRegistrationForm';
import { CheckCircle, Shield, Award, Users, Trophy, Target } from 'lucide-react';

const HeroSection = () => {
  const benefits = [
    {
      icon: Trophy,
      title: "Nr 1 w Polsce",
      description: "Lider w branży oddłużeniowej z 20-letnim doświadczeniem"
    },
    {
      icon: Users,
      title: "2000+ zadowolonych klientów",
      description: "Skutecznie pomogłem wyjść z długów bez bankructwa"
    },
    {
      icon: Target,
      title: "100% skuteczność",
      description: "Sprawdzone i w pełni legalne metody oddłużeniowe"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-black via-gray-800 to-gray-900 min-h-screen relative overflow-hidden">
      {/* Dariusz background image - desktop */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('/lovable-uploads/eb0658a9-c99a-4631-a61d-1543709a3efa.png')`,
          backgroundPosition: 'center 10%',
        }}
      ></div>
      
      {/* Dariusz background image - mobile */}
      <div 
        className="block md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('/lovable-uploads/c432fd37-2b35-4462-9077-b3a0ad7fb614.png')`,
          backgroundPosition: 'center 20%',
        }}
      ></div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-gray-900/50 to-gray-800/60"></div>
      
      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="font-montserrat text-prestige-gold-400 text-lg sm:text-xl md:text-2xl lg:text-3xl text-center md:text-left font-black tracking-wide uppercase">
              Dariusz Wentrych - Ekspert Oddłużenia Nr 1 w Polsce
            </div>
            
            <h1 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center md:text-left leading-tight">
              <span className="text-white">Uwolnij się od </span>
              <span className="text-business-blue-400">długów raz na zawsze</span>
              <span className="text-white"> - 20 lat doświadczenia</span>
            </h1>
            
            <p className="text-warm-neutral-200 text-xl md:text-2xl text-center md:text-left font-lato leading-relaxed font-medium">
              Jestem Dariusz Wentrych i przez ostatnie 20 lat pomogłem ponad <span className="text-prestige-gold-400 font-bold">2000 osób</span> całkowicie 
              uwolnić się od długów. Moje sprawdzone metody są w <span className="text-business-blue-400 font-bold">100% legalne</span> i skuteczne.
            </p>
            
            {/* Benefits Cards */}
            <div className="grid grid-cols-1 gap-6 mt-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-white/15 to-white/10 border-2 border-prestige-gold-400/60 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                      <benefit.icon className="w-8 h-8 text-navy-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl mb-2">{benefit.title}</h3>
                      <p className="text-warm-neutral-300 text-lg">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="bg-gradient-to-r from-prestige-gold-400/20 to-prestige-gold-500/10 border-2 border-prestige-gold-400/50 rounded-xl p-8 mt-8 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-prestige-gold-400 font-bold text-2xl mb-3">Zaufało mi już</div>
                <div className="text-white text-5xl font-black mb-3">2000+ osób</div>
                <div className="text-warm-neutral-200 text-xl mb-6">które dziś żyją bez długów</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-prestige-gold-400 text-3xl font-bold">20</div>
                    <div className="text-warm-neutral-300 text-sm">lat doświadczenia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-prestige-gold-400 text-3xl font-bold">100%</div>
                    <div className="text-warm-neutral-300 text-sm">skuteczność</div>
                  </div>
                  <div className="text-center">
                    <div className="text-prestige-gold-400 text-3xl font-bold">0 zł</div>
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
