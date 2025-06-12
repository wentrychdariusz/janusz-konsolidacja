
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

  const clientImages = [
    "/lovable-uploads/73ec7538-32fd-47a6-9460-ecfe26f5985b.png",
    "/lovable-uploads/731a75cc-be2d-432e-ba08-6d2b2f601a69.png",
    "/lovable-uploads/006c64e3-6a85-4c9a-ac54-1d2f158ac8d8.png",
    "/lovable-uploads/e02defc0-4e3f-46bf-9b38-ccbd8ce23531.png",
    "/lovable-uploads/a7da1141-d0f1-484e-af6a-d6f7704d0efb.png"
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
      
      <div className="relative z-10">
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-8 md:py-16">
          
          {/* Header Section - Full Width */}
          <div className="w-full text-center mb-6 md:mb-8 animate-fade-in">
            <div className="flex justify-center items-center mb-4 lg:mb-6">
              <img 
                src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                alt="Dariusz Wentrych"
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-prestige-gold-400 shadow-lg object-cover"
              />
            </div>
            <div className="font-montserrat text-prestige-gold-400 text-xl md:text-2xl lg:text-3xl font-black tracking-wide uppercase">
              Dariusz Wentrych nr 1 w Polsce w oddłużaniu osób fizycznych
            </div>
            <div className="font-lato text-warm-neutral-200 text-lg md:text-xl lg:text-2xl font-normal mt-2 lg:mt-4">
              Pożyczki inwestorskie, konsolidacja pożyczek i chwilówek
            </div>
          </div>

          {/* Compact Trust Section with Client Images */}
          <div className="w-full bg-gradient-to-r from-business-blue-400/20 via-business-blue-300/15 to-business-blue-400/20 border-t border-b border-business-blue-400/30 backdrop-blur-sm py-6 mb-8 rounded-xl">
            <div className="text-center">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-business-blue-400" />
                <h3 className="font-montserrat text-white text-lg md:text-xl font-bold">
                  15.000 zadowolonych klientów w całej Polsce
                </h3>
              </div>
              
              {/* Client photos */}
              <div className="flex flex-wrap justify-center items-center gap-2 mb-3">
                {clientImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image}
                      alt={`Zadowolony klient ${index + 1}`}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-prestige-gold-400 object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
                
                {/* Plus indicator for more clients */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-prestige-gold-400 bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 flex items-center justify-center shadow-lg">
                  <span className="text-navy-900 font-black text-sm md:text-base">+</span>
                </div>
              </div>
              
              <p className="text-warm-neutral-300 text-sm md:text-base font-lato">
                Oni mi zaufali - dołącz do nich już dziś!
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-8 md:py-16">
          {/* Mobile/Tablet Layout - Stacked */}
          <div className="block xl:hidden space-y-8">
            {/* Content Section */}
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <h1 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-center leading-tight">
                <span className="text-white">Uwolnij się od </span>
                <span className="text-business-blue-400">długów raz na zawsze</span>
                <span className="text-white"> - 20 lat doświadczenia</span>
              </h1>
              
              <p className="text-warm-neutral-200 text-xl md:text-2xl text-center font-lato leading-relaxed font-medium">
                Jestem Dariusz Wentrych i przez ostatnie 20 lat pomogłem ponad <span className="text-prestige-gold-400 font-bold">15.000 osób</span> całkowicie 
                uwolnić się od długów. Moje sprawdzone metody są w <span className="text-business-blue-400 font-bold">100% skuteczne</span>.
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

          {/* Desktop Layout - 50/50 */}
          <div className="hidden xl:grid xl:grid-cols-2 gap-12 items-start">
            
            {/* Left Content - 50% */}
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <h1 className="font-montserrat font-black text-4xl lg:text-5xl xl:text-6xl text-left leading-tight">
                <span className="text-white">Uwolnij się od </span>
                <span className="text-business-blue-400">długów raz na zawsze</span>
                <span className="text-white"> - 20 lat doświadczenia</span>
              </h1>
              
              <p className="text-warm-neutral-200 text-xl lg:text-2xl text-left font-lato leading-relaxed font-medium">
                Jestem Dariusz Wentrych i przez ostatnie 20 lat pomogłem ponad <span className="text-prestige-gold-400 font-bold">15.000 osób</span> całkowicie 
                uwolnić się od długów. Moje sprawdzone metody są w <span className="text-business-blue-400 font-bold">100% skuteczne</span>.
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
            
            {/* Right Content - 50% */}
            <div className="flex justify-center animate-fade-in">
              <div className="w-full">
                <DebtCalculator />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
