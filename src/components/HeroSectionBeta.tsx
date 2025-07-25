// Updated to fix build cache issue
import React, { useState, useEffect } from 'react';
import DebtCalculatorBeta from './DebtCalculatorBeta';
import OptimizedImage from './OptimizedImage';
import PolishCitizensNotice from './PolishCitizensNotice';
import { CheckCircle, Shield, Award, Users, Trophy, Target, Car, Star } from 'lucide-react';

const HeroSectionBeta = () => {
  const [currentMiniTestimonial, setCurrentMiniTestimonial] = useState(0);

  const benefits = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      text: "Nr 1 w Polsce - Lider w branży oddłużeniowej z 20-letnim doświadczeniem"
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      text: "15.000 zadowolonych klientów - Mojej firmie zaufało już 15.000 zadowolonych klientów"
    },
    {
      icon: <Car className="w-5 h-5 text-yellow-600" />,
      text: "Dojeżdzamy do Ciebie - Umów się na bezpłatne spotkania w 16 miastach lub indywidualne spotkanie u Ciebie"
    }
  ];

  const miniTestimonials = [
    { name: "Anna K.", result: "Oszczędza 800 zł miesięcznie", image: "/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" },
    { name: "Marcin W.", result: "Spłacił 45.000 zł długów", image: "/lovable-uploads/669e599a-c272-4fec-81fe-5ca4c496d018.png" },
    { name: "Kasia M.", result: "Jedna rata zamiast 8", image: "/lovable-uploads/85aea4b7-a6c9-428e-9787-3f867bd14c94.png" },
    { name: "Tomasz N.", result: "1200 zł więcej w kieszeni", image: "/lovable-uploads/17f8f3fc-9862-4650-99e5-12d823aad11c.png" },
    { name: "Ewa P.", result: "Z 12 rat zrobił 1", image: "/lovable-uploads/731a75cc-be2d-432e-ba08-6d2b2f601a69.png" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMiniTestimonial((prev) => (prev + 1) % miniTestimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [miniTestimonials.length]);

  return (
    <section className="pt-6 pb-8 md:pt-8 md:pb-12 lg:pt-10 lg:pb-16 xl:pt-12 xl:pb-20 bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 relative">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Floating Success Elements */}
        <div className="absolute left-4 top-16 animate-bounce hidden lg:block">
          <div className="bg-green-100 p-3 rounded-full shadow-lg">
            <Trophy className="w-6 h-6 text-green-600" />
          </div>
        </div>
        
        <div className="absolute right-4 top-24 animate-bounce hidden lg:block" style={{animationDelay: '1s'}}>
          <div className="bg-blue-100 p-3 rounded-full shadow-lg">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="absolute left-16 bottom-32 animate-bounce hidden lg:block" style={{animationDelay: '2s'}}>
          <div className="bg-yellow-100 p-3 rounded-full shadow-lg">
            <Car className="w-6 h-6 text-yellow-600" />
          </div>
        </div>

        {/* Mobile and Tablet Layout - Stacked */}
        <div className="xl:hidden">
          <div className="text-center space-y-3 md:space-y-4 animate-fade-in">
            
            {/* Mini testimonial rotator - Mobile Only */}
            <div className="md:hidden mb-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/50 max-w-xs mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-prestige-gold-400 flex-shrink-0">
                  <OptimizedImage 
                    src={miniTestimonials[currentMiniTestimonial].image}
                    alt={miniTestimonials[currentMiniTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="text-sm font-bold text-navy-900 truncate">
                    {miniTestimonials[currentMiniTestimonial].name}
                  </div>
                  <div className="text-xs text-green-700 font-medium">
                    ✓ {miniTestimonials[currentMiniTestimonial].result}
                  </div>
                </div>
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            <h1 className="font-montserrat font-black text-3xl md:text-4xl lg:text-5xl text-center leading-tight">
              <span className="bg-gradient-to-r from-navy-900 via-business-blue-700 to-prestige-gold-600 bg-clip-text text-transparent">
                Zamień długi w
              </span>
              <br />
              <span className="text-navy-900">jedną wygodną ratę</span>
            </h1>
            
            <div className="bg-gradient-to-r from-success-50 via-business-blue-50 to-prestige-gold-50 p-4 md:p-6 rounded-2xl shadow-lg border-2 border-success-300 max-w-2xl mx-auto">
              <p className="text-navy-700 text-lg md:text-xl font-semibold text-center leading-relaxed">
                Masz długi, chwilówki, komornika na karku? Nie jesteś sam. Od 20 lat pomagamy tam, gdzie inni zawiedli.
              </p>
            </div>

            {/* Dodatkowy nagłówek */}
            <div className="text-center">
              <h2 className="font-montserrat font-bold text-xl md:text-2xl text-navy-900 leading-tight">
                WSPIERAMY KLIENTÓW TAM, GDZIE INNI NIE POTRAFILI ZNALEŹĆ ROZWIĄZAŃ.
              </h2>
              <p className="text-navy-700 text-base md:text-lg mt-2">
                Zamień chaos w jedną ratę i odzyskaj kontrolę nad życiem.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3 max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 bg-white/70 backdrop-blur-sm p-3 rounded-xl shadow-md border border-white/50 hover:bg-white/90 transition-all duration-300"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {benefit.icon}
                  </div>
                  <p className="text-navy-700 font-medium text-sm md:text-base leading-relaxed text-left">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 max-w-lg mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-navy-700 font-bold">4.9/5</span>
              </div>
              <p className="text-navy-600 text-sm">
                <strong>15.000 zadowolonych klientów</strong> uwolnionych od długów
              </p>
            </div>

            {/* Trust indicators - Mobile */}
            <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
              <div className="bg-white/70 backdrop-blur-sm p-2 rounded-lg text-center shadow-sm border border-white/50">
                <Users className="w-5 h-5 text-business-blue-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-navy-700">15000</p>
                <p className="text-xs text-navy-600">Klientów</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-2 rounded-lg text-center shadow-sm border border-white/50">
                <Shield className="w-5 h-5 text-success-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-navy-700">100%</p>
                <p className="text-xs text-navy-600">Gwarancja</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-2 rounded-lg text-center shadow-sm border border-white/50">
                <Award className="w-5 h-5 text-prestige-gold-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-navy-700">20+</p>
                <p className="text-xs text-navy-600">Lat</p>
              </div>
            </div>
            
            {/* Polish Citizens Notice - Mobile */}
            <div className="mt-6">
              <PolishCitizensNotice />
            </div>
          </div>
          
          {/* Calculator Section - Mobile */}
          <div className="animate-fade-in">
            <DebtCalculatorBeta />
          </div>
        </div>

        {/* Desktop Layout - 50/50 */}
        <div className="hidden xl:grid xl:grid-cols-2 gap-12 items-start">
          
          {/* Left Content - 50% */}
          <div className="space-y-3 md:space-y-4 animate-fade-in">
            <h1 className="font-montserrat font-black text-4xl lg:text-5xl xl:text-6xl text-left leading-tight">
              <span className="bg-gradient-to-r from-navy-900 via-business-blue-700 to-prestige-gold-600 bg-clip-text text-transparent">
                Zamień długi w
              </span>
              <br />
              <span className="text-navy-900">jedną wygodną ratę</span>
            </h1>
            
            <div className="bg-gradient-to-r from-success-50 via-business-blue-50 to-prestige-gold-50 p-6 rounded-2xl shadow-lg border-2 border-success-300">
              <p className="text-navy-700 text-xl font-semibold text-left leading-relaxed">
                Masz długi, chwilówki, komornika na karku? Nie jesteś sam. Od 20 lat pomagamy tam, gdzie inni zawiedli.
              </p>
            </div>

            {/* Dodatkowy nagłówek - Desktop */}
            <div className="text-left">
              <h2 className="font-montserrat font-bold text-2xl text-navy-900 leading-tight">
                WSPIERAMY KLIENTÓW TAM, GDZIE INNI NIE POTRAFILI ZNALEŹĆ ROZWIĄZAŃ.
              </h2>
              <p className="text-navy-700 text-lg mt-2">
                Zamień chaos w jedną ratę i odzyskaj kontrolę nad życiem.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md border border-white/50 hover:bg-white/90 transition-all duration-300"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="flex-shrink-0 mt-1">
                    {benefit.icon}
                  </div>
                  <p className="text-navy-700 font-medium text-lg leading-relaxed text-left">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50">
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-navy-700 font-bold text-xl">4.9/5</span>
              </div>
              <p className="text-navy-600 text-lg">
                <strong>15.000 zadowolonych klientów</strong> uwolnionych od długów
              </p>
            </div>

            {/* Trust indicators - Desktop */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg text-center shadow-sm border border-white/50">
                <Users className="w-8 h-8 text-business-blue-600 mx-auto mb-2" />
                <p className="text-lg font-semibold text-navy-700">15000</p>
                <p className="text-sm text-navy-600">Zadowolonych klientów</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg text-center shadow-sm border border-white/50">
                <Shield className="w-8 h-8 text-success-600 mx-auto mb-2" />
                <p className="text-lg font-semibold text-navy-700">100%</p>
                <p className="text-sm text-navy-600">Gwarancja zwrotu</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg text-center shadow-sm border border-white/50">
                <Award className="w-8 h-8 text-prestige-gold-600 mx-auto mb-2" />
                <p className="text-lg font-semibold text-navy-700">20+</p>
                <p className="text-sm text-navy-600">Lat doświadczenia</p>
              </div>
            </div>
            
            {/* Polish Citizens Notice - Desktop */}
            <div className="mt-6">
              <PolishCitizensNotice />
            </div>
          </div>
          
          {/* Right Content - 50% */}
          <div className="flex justify-center animate-fade-in">
            <div className="w-full">
              <DebtCalculatorBeta />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionBeta;