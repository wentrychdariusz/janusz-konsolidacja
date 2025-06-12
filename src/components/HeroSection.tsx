
import React, { useState } from 'react';
import DebtCalculator from './DebtCalculator';
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
      title: "15.000 zadowolonych klientów",
      description: "Mojej firmie zaufało już 15.000 zadowolonych klientów"
    },
    {
      icon: Shield,
      title: "Konsultacja oddłużeniowa całkowicie za darmo",
      description: "Pierwsza konsultacja oddłużeniowa całkowicie za darmo"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-black via-gray-800 to-gray-900 min-h-screen relative overflow-hidden">
      {/* Dariusz background image - desktop */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('/lovable-uploads/eb0658a9-c99a-4631-a61d-1543709a3efa.png')`,
          backgroundPosition: 'left top',
        }}
      ></div>
      
      {/* Dariusz background image - mobile */}
      <div 
        className="block md:hidden absolute inset-0 bg-contain bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('/lovable-uploads/c432fd37-2b35-4462-9077-b3a0ad7fb614.png')`,
          backgroundPosition: 'center center',
        }}
      ></div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-gray-900/50 to-gray-800/60"></div>
      
      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-8 md:py-16">
        
        {/* Mobile/Tablet Layout - Stacked */}
        <div className="block xl:hidden space-y-8">
          {/* Content Section */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="font-montserrat text-prestige-gold-400 text-lg sm:text-xl md:text-2xl text-center font-black tracking-wide uppercase">
              Dariusz Wentrych - Ekspert Oddłużenia Nr 1 w Polsce
            </div>
            
            <h1 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-center leading-tight">
              <span className="text-white">Uwolnij się od </span>
              <span className="text-business-blue-400">długów raz na zawsze</span>
              <span className="text-white"> - 20 lat doświadczenia</span>
            </h1>
            
            <p className="text-warm-neutral-200 text-xl md:text-2xl text-center font-lato leading-relaxed font-medium">
              Jestem Dariusz Wentrych i przez ostatnie 20 lat pomogłem ponad <span className="text-prestige-gold-400 font-bold">15.000 osób</span> całkowicie 
              uwolnić się od długów. Moje sprawdzone metody są w <span className="text-business-blue-400 font-bold">100% legalne</span> i skuteczne.
            </p>
            
            {/* Benefits Cards - Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-white/15 to-white/10 border-2 border-prestige-gold-400/60 rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                      <benefit.icon className="w-6 h-6 text-navy-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-warm-neutral-300 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Calculator Section - Mobile */}
          <div className="animate-fade-in">
            <DebtCalculator />
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden xl:grid xl:grid-cols-5 gap-12 items-start">
          
          {/* Left Content - 2 kolumny */}
          <div className="xl:col-span-2 space-y-6 md:space-y-8 animate-fade-in">
            <div className="font-montserrat text-prestige-gold-400 text-2xl lg:text-3xl text-left font-black tracking-wide uppercase">
              Dariusz Wentrych - Ekspert Oddłużenia Nr 1 w Polsce
            </div>
            
            <h1 className="font-montserrat font-black text-4xl lg:text-5xl xl:text-6xl text-left leading-tight">
              <span className="text-white">Uwolnij się od </span>
              <span className="text-business-blue-400">długów raz na zawsze</span>
              <span className="text-white"> - 20 lat doświadczenia</span>
            </h1>
            
            <p className="text-warm-neutral-200 text-xl lg:text-2xl text-left font-lato leading-relaxed font-medium">
              Jestem Dariusz Wentrych i przez ostatnie 20 lat pomogłem ponad <span className="text-prestige-gold-400 font-bold">15.000 osób</span> całkowicie 
              uwolnić się od długów. Moje sprawdzone metody są w <span className="text-business-blue-400 font-bold">100% legalne</span> i skuteczne.
            </p>
            
            {/* Benefits Cards - Desktop */}
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
          </div>
          
          {/* Right Content - 3 kolumny */}
          <div className="xl:col-span-3 flex justify-center animate-fade-in">
            <div className="w-full">
              <DebtCalculator />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
