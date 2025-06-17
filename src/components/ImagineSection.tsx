
import React from 'react';
import OptimizedImage from './OptimizedImage';
import { MapPin, Car, Award, Users, Star } from 'lucide-react';

const ImagineSection = () => {
  const expertise = [
    {
      icon: MapPin,
      title: "Jesteśmy w Twoim mieście",
      description: "Jesteśmy w 16 województwach"
    },
    {
      icon: Car,
      title: "Dojeżdzamy do Ciebie",
      description: "Umów się na bezpłatne spotkania w 16 miastach lub indywidualne spotkanie u Ciebie (kwestia dojazdu ustalana indywidualnie)"
    },
    {
      icon: Award,
      title: "Najbardziej merytoryczni w Polsce",
      description: "20 lat doświadczenia w branży"
    },
    {
      icon: Users,
      title: "Najbardziej profesjonalni",
      description: "Kompleksowa obsługa klienta"
    }
  ];

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 h-5 text-prestige-gold-400 fill-current" />
    ));
  };

  return (
    <section className="bg-gradient-to-b from-black via-navy-900 to-business-blue-800 relative py-8 md:py-12 lg:py-16 overflow-hidden z-10">
      {/* Background only for desktop - mosaic with Dariusz photos */}
      <div className="hidden md:block absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-business-blue-900/75 via-navy-900/70 to-business-blue-700/75 z-10"></div>
        
        {/* Photo mosaic grid - desktop only z lazy loading */}
        <div className="absolute inset-0 grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-0">
          {Array.from({ length: 200 }, (_, index) => {
            const images = [
              "/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png",
              "/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png",
              "/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png",
              "/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png",
              "/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png",
              "/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png",
              "/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png",
              "/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png"
            ];
            const imageIndex = index % images.length;
            return (
              <div key={index} className="aspect-square">
                <OptimizedImage
                  src={images[imageIndex]}
                  alt=""
                  className="w-full h-full object-cover"
                  priority={index < 32}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="relative z-20 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4">
            <span className="text-prestige-gold-400">Mamy największe zaufanie klientów w Polsce</span>
          </h2>
          <h3 className="text-white text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-lato mb-8 uppercase tracking-wider font-bold">
            KLIENCI NAS KOCHAJĄ!
          </h3>
          
          {/* Rating section with white rounded background and premium effects */}
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl px-8 py-6 inline-block shadow-2xl border border-gray-100 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-3">
              {renderStars()}
              <span className="text-3xl font-black text-transparent bg-gradient-to-r from-navy-900 via-business-blue-700 to-navy-900 bg-clip-text ml-3 drop-shadow-sm">4.9</span>
              <span className="text-navy-700 font-bold tracking-wide text-xs md:text-sm">(383 OPINII)</span>
            </div>
            <p className="text-transparent bg-gradient-to-r from-warm-neutral-600 via-navy-600 to-warm-neutral-600 bg-clip-text text-sm font-bold tracking-wide uppercase">
              Zweryfikowane opinie Google i Oferteo
            </p>
          </div>
        </div>

        {/* Image and expertise section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-8 items-start">
          {/* Left side - Dariusz Image z optymalizacją dla mobile */}
          <div className="w-full">
            <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] relative">
              <OptimizedImage
                src="/lovable-uploads/13f2bb30-b521-4709-8d23-16bcbfcc4eb8.png"
                alt="Dariusz Wentrych"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                priority={false}
                width={400}
                height={500}
                sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
              />
            </div>
          </div>

          {/* Right side - Expertise list */}
          <div className="space-y-6">
            {/* Text above icons */}
            <div className="mb-8">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 font-montserrat">
                Dlaczego wybierają nas klienci?
              </h3>
              <p className="text-warm-neutral-300 text-lg font-lato">
                W świecie, gdzie inni widzą w Tobie tylko numer, my widzimy człowieka.
                Dla większości liczy się szybka sprzedaż i prowizja. U nas liczy się rozmowa, zrozumienie i realna pomoc. Nie działamy schematami, nie składamy pustych obietnic i nie wciskamy rozwiązań na siłę. Zamiast tego dajemy Ci czas, wsparcie i skuteczny plan działania. Klienci wracają do nas, bo wiedzą, że tu liczy się człowiek, nie target. To nasza przewaga nad całą resztą.
              </p>
            </div>
            
            {expertise.map((item, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm border border-prestige-gold-200/30 rounded-xl p-4 hover:bg-white/15 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-navy-900" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1 font-montserrat">{item.title}</h3>
                  <p className="text-warm-neutral-300 text-sm font-lato">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImagineSection;
