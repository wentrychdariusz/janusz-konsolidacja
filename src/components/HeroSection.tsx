import React, { useState, useEffect } from 'react';
import DebtCalculator from './DebtCalculator';
import OptimizedImage from './OptimizedImage';
import { CheckCircle, Shield, Award, Users, Trophy, Target, Car } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(true); // Natychmiast widoczny

  // Usunięte opóźnienie - content pokazuje się od razu
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      icon: Car,
      title: "Dojeżdzamy do Ciebie",
      description: "Umów się na bezpłatne spotkania w 16 miastach lub indywidualne spotkanie u Ciebie"
    }
  ];

  const clientImages = [
    "/lovable-uploads/73ec7538-32fd-47a6-9460-ecfe26f5985b.png",
    "/lovable-uploads/731a75cc-be2d-432e-ba08-6d2b2f601a69.png",
    "/lovable-uploads/e02defc0-4e3f-46bf-9b38-ccbd8ce23531.png",
    "/lovable-uploads/a7da1141-d0f1-484e-af6a-d6f7704d0efb.png",
    "/lovable-uploads/3eb21e4e-0f4f-42db-938e-f1e7b917cc4e.png",
    "/lovable-uploads/7400b6f6-4a58-46c3-a434-f941fcae211a.png",
    "/lovable-uploads/6d6c71e9-c427-4ea3-ba95-42f30c256d9f.png",
    "/lovable-uploads/ce402ba0-a1c6-47f9-b872-3b17a07691f3.png",
    "/lovable-uploads/006c64e3-6a85-4c9a-ac54-1d2f158ac8d8.png",
    "/lovable-uploads/e1583163-e7e1-453a-8a37-a5b927cc224e.png",
    "/lovable-uploads/fd5a99a1-5cfe-4ed4-9f16-b9ff7764b433.png"
  ];

  // Zoptymalizowane obrazy dla mozaiki mobilnej - ładowane z opóźnieniem
  const mobileBackgroundImages = [
    "/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png",
    "/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png",
    "/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png",
    "/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png"
  ];

  return (
    <section className="bg-gradient-to-br from-black via-gray-800 to-gray-900 min-h-screen relative overflow-hidden">
      {/* Preload kluczowych obrazów */}
      <link rel="preload" as="image" href="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" />
      <link rel="preload" as="image" href="/lovable-uploads/eb0658a9-c99a-4631-a61d-1543709a3efa.png" />
      
      {/* Desktop background - z lepszą optymalizacją */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: `url('/lovable-uploads/eb0658a9-c99a-4631-a61d-1543709a3efa.png')`,
          backgroundPosition: 'center -120px',
          backgroundSize: 'cover',
          height: '100%'
        }}
      ></div>
      
      {/* Mobile background - zoptymalizowana mozaika z lazy loading */}
      <div className="md:hidden absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-4 gap-0">
          {Array.from({ length: 16 }, (_, index) => { // Zmniejszone z 32 do 16
            const imageIndex = index % mobileBackgroundImages.length;
            return (
              <div key={index} className="aspect-square">
                <OptimizedImage
                  src={mobileBackgroundImages[imageIndex]}
                  alt=""
                  className="w-full h-full object-cover opacity-20" // Zmniejszona opacity dla lepszej wydajności
                  priority={index < 4} // Tylko pierwsze 4 z priority
                  mobileOptimized={true}
                  width={60} // Zmniejszone z 80
                  height={60} // Zmniejszone z 80
                  quality={50} // Zmniejszone z 60
                />
              </div>
            );
          })}
        </div>
        {/* Gradient overlay dla mobilnej mozaiki */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black"></div>
        {/* Dodatkowy gradient na dole dla płynnego przejścia */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
      </div>
      
      {/* Enhanced gradient overlay with smooth tonal transition - desktop */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black"></div>
      
      {/* Additional gradient for smoother bottom transition - desktop */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      
      <div className={`relative z-10 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-4 md:py-8">
          
          {/* Header Section - Full Width */}
          <div className="w-full text-center mb-2 md:mb-3">
            <div className="flex justify-center items-center mb-3 lg:mb-4">
              <OptimizedImage
                src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                alt="Dariusz Wentrych"
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-prestige-gold-400 shadow-lg object-cover"
                priority={true}
                width={96}
                height={96}
                mobileOptimized={true}
                quality={90} // Zwiększone dla głównego zdjęcia
              />
            </div>
            <div className="font-montserrat text-prestige-gold-400 text-xl md:text-2xl lg:text-3xl font-black tracking-wide uppercase">
              Dariusz Wentrych nr 1 w Polsce w oddłużaniu osób fizycznych
            </div>
            <div className="font-lato text-warm-neutral-200 text-lg md:text-xl lg:text-2xl font-normal mt-1 lg:mt-2 uppercase tracking-wide">
              POŻYCZKI INWESTORSKIE, KONSOLIDACJA POŻYCZEK I CHWILÓWEK
            </div>
          </div>

          {/* Enhanced Trust Section */}
          <div className="w-full relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md py-6 mb-3 rounded-2xl shadow-2xl">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-prestige-gold-400/5 via-transparent to-business-blue-400/5 rounded-2xl"></div>
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/3 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-prestige-gold-400/10 rounded-full blur-2xl"></div>
            
            <div className="relative text-center">
              <div className="mb-4">
                <h3 className="font-montserrat text-white text-lg md:text-xl font-bold">
                  Ponad 15.000 zadowolonych klientów
                </h3>
              </div>
              
              {/* Client photos grid z lepszą optymalizacją */}
              <div className="flex justify-center items-center mb-4">
                <div className="flex items-center">
                  {clientImages.slice(0, 6).map((image, index) => ( // Zmniejszone z 8 do 6
                    <div 
                      key={index} 
                      className="relative group -ml-2 first:ml-0"
                      style={{ zIndex: clientImages.length - index }}
                    >
                      <OptimizedImage
                        src={image}
                        alt={`Zadowolony klient ${index + 1}`}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-prestige-gold-400 object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                        priority={index < 3} // Tylko pierwsze 3 z priority
                        width={56}
                        height={56}
                        mobileOptimized={true}
                        quality={75} // Zwiększone dla lepszej jakości twarzy
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Trust messaging - Combined in one line */}
              <div>
                <p className="text-prestige-gold-400 text-xl md:text-2xl font-bold font-montserrat">
                  Oni mi zaufali • Teraz ty możesz wyjść z zadłużenia!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-2 md:py-4">
          {/* Mobile/Tablet Layout - Stacked */}
          <div className="block xl:hidden space-y-4">
            {/* Content Section */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-center leading-tight">
                <span className="text-white">Zamień długi w </span>
                <span className="text-business-blue-400">jedną wygodną ratę</span>
              </h1>
              
              <div className="text-warm-neutral-200 text-xl md:text-2xl text-center font-lato leading-relaxed font-medium space-y-4">
                <p>
                  <span className="text-white font-bold">Masz długi, chwilówki, komornika na karku?</span> Nie jesteś sam. Od 20 lat pomagamy tam, gdzie inni zawiedli.
                </p>
                <p className="text-business-blue-400 font-bold text-lg lg:text-xl uppercase tracking-wide">
                  WSPIERAMY KLIENTÓW TAM, GDZIE INNI NIE POTRAFILI ZNALEŹĆ ROZWIĄZAŃ.
                </p>
                <p>
                  <span className="text-white font-bold">Zamień chaos w jedną ratę</span> i odzyskaj kontrolę nad życiem.
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
            <div>
              <DebtCalculator />
            </div>
          </div>

          {/* Desktop Layout - 50/50 */}
          <div className="hidden xl:grid xl:grid-cols-2 gap-12 items-start">
            
            {/* Left Content - 50% */}
            <div className="space-y-3 md:space-y-4">
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
            <div className="flex justify-center">
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
