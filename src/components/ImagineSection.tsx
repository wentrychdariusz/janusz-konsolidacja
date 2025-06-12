
import React from 'react';
import { MapPin, Car, Award, Users } from 'lucide-react';

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

  return (
    <section className="bg-gradient-to-b from-black via-navy-900 to-business-blue-800 relative py-16 md:py-24 overflow-hidden min-h-screen">
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
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6">
            <span className="text-prestige-gold-400">Mamy największe zaufanie klientów w Polsce</span>
          </h2>
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto font-lato mb-8">
            Klienci nas kochają!
          </p>
        </div>

        {/* Video and expertise section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 items-start">
          {/* Left side - Video */}
          <div className="w-full">
            <div className="w-full h-0 relative pb-[56.25%]">
              <iframe 
                src="https://fast.wistia.net/embed/iframe/nlk4gmdg22?seo=true&videoFoam=true" 
                title="Video"
                allow="autoplay; fullscreen" 
                allowFullScreen 
                className="absolute top-0 left-0 w-full h-full rounded-lg border-0"
              ></iframe>
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
                Sprawdź, co wyróżnia nas na rynku
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
