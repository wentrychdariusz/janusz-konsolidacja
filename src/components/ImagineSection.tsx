
import React from 'react';
import { Heart, Home, Plane, ShoppingBag } from 'lucide-react';

const ImagineSection = () => {
  const benefits = [
    {
      icon: Home,
      title: "Własne miejsce",
      description: "Zarabiaj na wymarzony dom lub mieszkanie"
    },
    {
      icon: Plane,
      title: "Podróże marzeń",
      description: "Odkrywaj świat bez martwienia się o budżet"
    },
    {
      icon: ShoppingBag,
      title: "Finansowa swoboda",
      description: "Kup to, na co masz ochotę bez zastanawiania się"
    },
    {
      icon: Heart,
      title: "Spokój dla rodziny",
      description: "Zapewnij bliskim bezpieczeństwo finansowe"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-black via-navy-900 to-business-blue-800 relative py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-business-blue-900/80 via-navy-900/60 to-business-blue-700/40"></div>
      
      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6">
            <span className="text-white">Wyobraź sobie </span>
            <span className="text-prestige-gold-400">życie bez ograniczeń finansowych</span>
          </h2>
          <p className="text-warm-neutral-200 text-lg md:text-xl max-w-3xl mx-auto font-lato">
            To nie sen - to rzeczywistość, którą możesz osiągnąć już dziś
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-prestige-gold-200/30 rounded-xl p-6 text-center hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-navy-900" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 font-montserrat">{benefit.title}</h3>
              <p className="text-warm-neutral-300 text-sm font-lato">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImagineSection;
