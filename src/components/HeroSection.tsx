
import React, { useState } from 'react';
import QuickRegistrationForm from './QuickRegistrationForm';
import { CheckCircle, DollarSign, Star } from 'lucide-react';

const HeroSection = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "5-15 tysięcy miesięcznie",
      description: "Stały dodatkowy dochód"
    },
    {
      icon: CheckCircle,
      title: "Bez działalności",
      description: "Bez papierologii i komplikacji"
    },
    {
      icon: Star,
      title: "Proven system",
      description: "Sprawdzony system zarabiania"
    }
  ];

  return (
    <section 
      className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 min-h-screen relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&h=1080&fit=crop&crop=center')`,
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
              Pieniądze to wolność.
            </div>
            
            <h1 className="font-montserrat font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center md:text-left leading-tight">
              <span className="text-white">Zarabiaj </span>
              <span className="text-business-blue-400">5-15 tysięcy złotych</span>
              <span className="text-white"> miesięcznie bez prowadzenia działalności gospodarczej</span>
            </h1>
            
            <p className="text-warm-neutral-200 text-base md:text-lg text-center md:text-left font-lato">
              Pokażę Ci sprawdzony system, dzięki któremu możesz generować stały dodatkowy dochód 
              bez konieczności zakładania firmy czy prowadzenia skomplikowanej papierologii.
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
