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
    "/lovable-uploads/a7da1141-d0f1-484e-af6a-d6f7704d0efb.png",
    "/lovable-uploads/3eb21e4e-0f4f-42db-938e-f1e7b917cc4e.png",
    "/lovable-uploads/7400b6f6-4a58-46c3-a434-f941fcae211a.png",
    "/lovable-uploads/6d6c71e9-c427-4ea3-ba95-42f30c256d9f.png"
  ];

  return (
    <section className="bg-gradient-to-br from-black via-gray-800 to-gray-900 min-h-screen relative overflow-hidden">
      {/* Dariusz background image - desktop only */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('/lovable-uploads/eb0658a9-c99a-4631-a61d-1543709a3efa.png')`,
          backgroundPosition: 'left top',
        }}
      ></div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-gray-900/50 to-gray-800/60"></div>
      
      <div className="relative z-10">
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-4 md:py-8">
          
          {/* Header Section - Full Width */}
          <div className="w-full text-center mb-2 md:mb-3 animate-fade-in">
            <div className="flex justify-center items-center mb-3 lg:mb-4">
              <img 
                src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                alt="Dariusz Wentrych"
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-prestige-gold-400 shadow-lg object-cover"
              />
            </div>
            <div className="font-montserrat text-prestige-gold-400 text-xl md:text-2xl lg:text-3xl font-black tracking-wide uppercase">
              Dariusz Wentrych nr 1 w Polsce w oddłużaniu osób fizycznych
            </div>
            <div className="font-lato text-warm-neutral-200 text-lg md:text-xl lg:text-2xl font-normal mt-1 lg:mt-2">
              Pożyczki inwestorskie, konsolidacja pożyczek i chwilówek
            </div>
          </div>

          {/* Enhanced Trust Section with More Client Images */}
          <div className="w-full bg-gradient-to-r from-business-blue-400/20 via-business-blue-300/15 to-business-blue-400/20 border-t border-b border-business-blue-400/30 backdrop-blur-sm py-3 mb-3 rounded-xl">
            <div className="text-center">
              {/* Client photos grid - 8 photos */}
              <div className="flex flex-wrap justify-center items-center gap-3 mb-2">
                {clientImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image}
                      alt={`Zadowolony klient ${index + 1}`}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-prestige-gold-400 object-cover shadow-xl group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
                
                {/* Plus indicator for more clients */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-prestige-gold-400 bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 flex items-center justify-center shadow-xl">
                  <span className="text-navy-900 font-black text-lg md:text-xl">+</span>
                </div>
              </div>
              
              {/* Trust messaging */}
              <div className="space-y-1">
                <h3 className="font-montserrat text-white text-xl md:text-2xl font-bold">
                  Oni mi zaufali
                </h3>
                <p className="text-prestige-gold-400 text-lg md:text-xl font-bold">
                  Teraz ty możesz wyjść z zadłużenia!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-2 md:py-4">
          {/* Mobile/Tablet Layout - Stacked */}
          <div className="block xl:hidden space-y-4">
            {/* Content Section */}
            <div className="space-y-3 md:space-y-4 animate-fade-in">
              <h1 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-center leading-tight">
                <span className="text-white">Zamień długi w </span>
                <span className="text-business-blue-400">jedną wygodną ratę</span>
              </h1>
              
              <div className="text-warm-neutral-200 text-xl md:text-2xl text-center font-lato leading-relaxed font-medium space-y-4">
                <p>
                  <span className="text-prestige-gold-400 font-bold">Masz długi, chwilówki, komornika na karku?</span> Nie jesteś sam. Od 20 lat pomagamy tam, gdzie inni zawiedli.
                </p>
                <p className="text-business-blue-400 font-bold text-lg lg:text-xl uppercase tracking-wide">
                  WSPIERAMY KLIENTÓW TAM, GDZIE INNI NIE POTRAFILI ZNALEŹĆ ROZWIĄZAŃ.
                </p>
                <p>
                  <span className="text-prestige-gold-400 font-bold">Zamień chaos w jedną ratę</span> i odzyskaj kontrolę nad życiem.
                </p>
              </div>
              
              {/* Benefits Cards - Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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
            <div className="space-y-3 md:space-y-4 animate-fade-in">
              <h1 className="font-montserrat font-black text-4xl lg:text-5xl xl:text-6xl text-left leading-tight">
                <span className="text-white">Zamień długi w </span>
                <span className="text-business-blue-400">jedną wygodną ratę</span>
              </h1>
              
              <div className="text-warm-neutral-200 text-base xl:text-lg text-left font-lato leading-relaxed font-medium space-y-4">
                <p>
                  <span className="text-white font-bold">Masz długi, chwilówki, komornika na karku?</span> Nie jesteś sam. Od 20 lat pomagamy tam, gdzie inni zawiedli.
                </p>
                <p className="text-white font-bold text-sm xl:text-base uppercase tracking-wide">
                  WSPIERAMY KLIENTÓW TAM, GDZIE INNI NIE POTRAFILI ZNALEŹĆ ROZWIĄZAŃ.
                </p>
                <p>
                  <span className="text-white font-bold">Zamień chaos w jedną ratę</span> i odzyskaj kontrolę nad życiem.
                </p>
              </div>
              
              {/* Benefits Cards - Desktop */}
              <div className="grid grid-cols-1 gap-6 mt-4">
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
