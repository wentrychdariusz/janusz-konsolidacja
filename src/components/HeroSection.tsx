
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
    <section className="bg-white min-h-screen relative overflow-hidden">
      {/* Natural landscape background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3506&q=80')`,
          backgroundPosition: 'center 20%',
        }}
      ></div>
      
      {/* Dariusz photo positioned on the right side */}
      <div 
        className="absolute right-0 top-0 h-full w-1/3 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{
          backgroundImage: `url('/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png')`,
          backgroundPosition: 'center top',
          backgroundSize: 'cover'
        }}
      ></div>
      
      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="font-montserrat text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl text-center md:text-left font-black tracking-wide uppercase">
              Dariusz Wentrych - Ekspert Oddłużenia Nr 1 w Polsce
            </div>
            
            <h1 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center md:text-left leading-tight">
              <span className="text-gray-900">Uwolnij się od </span>
              <span className="text-gray-700">długów raz na zawsze</span>
              <span className="text-gray-900"> - 20 lat doświadczenia</span>
            </h1>
            
            <p className="text-gray-700 text-xl md:text-2xl text-center md:text-left font-lato leading-relaxed font-medium">
              Jestem Dariusz Wentrych i przez ostatnie 20 lat pomogłem ponad <span className="text-gray-900 font-bold">2000 osób</span> całkowicie 
              uwolnić się od długów. Moje sprawdzone metody są w <span className="text-gray-800 font-bold">100% legalne</span> i skuteczne.
            </p>
            
            {/* Benefits Cards */}
            <div className="grid grid-cols-1 gap-6 mt-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white/90 border-2 border-gray-300 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-bold text-xl mb-2">{benefit.title}</h3>
                      <p className="text-gray-700 text-lg">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="bg-white/90 border-2 border-gray-300 rounded-xl p-8 mt-8 backdrop-blur-sm shadow-lg">
              <div className="text-center">
                <div className="text-gray-700 font-bold text-2xl mb-3">Zaufało mi już</div>
                <div className="text-gray-900 text-5xl font-black mb-3">2000+ osób</div>
                <div className="text-gray-700 text-xl mb-6">które dziś żyją bez długów</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-gray-700 text-3xl font-bold">20</div>
                    <div className="text-gray-600 text-sm">lat doświadczenia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-700 text-3xl font-bold">100%</div>
                    <div className="text-gray-600 text-sm">skuteczność</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-700 text-3xl font-bold">0 zł</div>
                    <div className="text-gray-600 text-sm">konsultacja</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Form */}
          <div className="flex justify-center lg:justify-end animate-fade-in lg:mt-32">
            <QuickRegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
