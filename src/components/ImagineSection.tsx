
import React from 'react';
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
      description: "Kwota dojazdów ustalana indywidualnie"
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
    <section className="bg-gradient-to-b from-black via-navy-900 to-business-blue-800 relative py-24 md:py-32 lg:py-40 overflow-hidden min-h-[120vh] lg:min-h-[130vh]">
      {/* Background mosaic with Dariusz photos */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-business-blue-900/75 via-navy-900/70 to-business-blue-700/75 z-10"></div>
        
        {/* Photo mosaic grid - better layout */}
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
                <img 
                  src={images[imageIndex]} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="relative z-20 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
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
              <span className="text-navy-700 font-bold tracking-wide">(383 OPINII)</span>
            </div>
            <p className="text-transparent bg-gradient-to-r from-warm-neutral-600 via-navy-600 to-warm-neutral-600 bg-clip-text text-sm font-bold tracking-wide uppercase">
              Zweryfikowane opinie Google i Oferteo
            </p>
          </div>
        </div>

        {/* Image and expertise section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-16 items-start">
          {/* Left side - Dariusz Image with mask effect */}
          <div className="w-full">
            <div className="w-full h-[500px] lg:h-[600px] relative">
              <img 
                src="/lovable-uploads/1d163c41-0a43-4bac-9b5b-9b1c90a3cad4.png" 
                alt="Dariusz Wentrych"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                }}
              />
              {/* Subtle gradient overlay for better blending */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 rounded-2xl pointer-events-none"></div>
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
