import React, { useState, useEffect } from 'react';
import DebtCalculator from './DebtCalculator';
import OptimizedImage from './OptimizedImage';
import PolishCitizensNotice from './PolishCitizensNotice';
import { CheckCircle, Shield, Award, Users, Trophy, Target, Car, Star } from 'lucide-react';

const HeroSection = () => {
  const [currentMiniTestimonial, setCurrentMiniTestimonial] = useState(0);

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
    "/lovable-uploads/ce402ba0-a1c6-47f9-b872-3b17a07691f3.png"
  ];

  const miniTestimonials = [
    {
      name: "Pan Marian",
      text: "Spokojny, kompetentny, godny zaufania.",
      image: "/lovable-uploads/2d738ba1-2073-46e7-8756-b5c6adad4638.png"
    },
    {
      name: "Pani Agnieszka",
      text: "Życzliwy, cierpliwy, nie ocenia.",
      image: "/lovable-uploads/1c4d6794-37c2-40ad-874e-39424cab8376.png"
    },
    {
      name: "Pan Krzysztof",
      text: "Skuteczny, ludzki, potrafi czynić cuda.",
      image: "/lovable-uploads/45c6e51f-e867-4285-8a55-98087f2d6314.png"
    }
  ];

  // Auto-play functionality for mini testimonials
  useEffect(() => {
    const miniAutoPlayInterval = setInterval(() => {
      setCurrentMiniTestimonial(prev => (prev + 1) % miniTestimonials.length);
    }, 2500);
    
    return () => {
      clearInterval(miniAutoPlayInterval);
    };
  }, [miniTestimonials.length]);

  const mobileBackgroundImages = [
    "/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png",
    "/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png",
    "/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png",
    "/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png",
    "/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png",
    "/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png",
    "/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png",
    "/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png"
  ];

  return (
    <section className="bg-gradient-to-br from-black via-gray-800 to-gray-900 min-h-screen relative overflow-hidden pt-28 md:pt-16 pb-8 md:pb-12">
      {/* Desktop background - Dariusz image z lazy loading */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: `url('/lovable-uploads/eb0658a9-c99a-4631-a61d-1543709a3efa.png')`,
          backgroundPosition: 'center -120px',
          backgroundSize: 'cover',
          height: '100%'
        }}
      ></div>
      
      {/* Mobile background - mozaika 400px u góry z płynnym przejściem tonalnym */}
      <div className="md:hidden absolute inset-0">
        {/* Mozaika bez przerw - 400px wysokości */}
        <div className="absolute top-0 left-0 right-0" style={{ height: '400px' }}>
          <div className="grid grid-cols-10 h-full" style={{ gap: '0px' }}>
            {Array.from({ length: 200 }, (_, index) => {
              const imageIndex = index % mobileBackgroundImages.length;
              return (
                <div key={index} className="w-full h-full block leading-none">
                  <OptimizedImage
                    src={mobileBackgroundImages[imageIndex]}
                    alt=""
                    className="w-full h-full object-cover opacity-50 block"
                    priority={index < 20}
                    width={40}
                    height={40}
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Czarna przezroczystość na całej mozaice */}
        <div className="absolute top-0 left-0 right-0 bg-black/50" style={{ height: '400px' }}></div>
        
        {/* Płynne przejście tonalne od mozaiki do czerni */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black" style={{ top: '200px' }}></div>
        
        {/* Dodatkowy gradient dla mocniejszego przejścia */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" style={{ top: '300px' }}></div>
      </div>
      
      {/* Enhanced gradient overlay with smooth tonal transition - desktop */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black"></div>
      
      {/* Additional gradient for smoother bottom transition - desktop */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      
      <div className="relative z-10">
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto py-2 md:py-4">
          
          {/* Header Section - Full Width */}
          <div className="w-full text-center mb-2 md:mb-3 animate-fade-in">
            <div className="flex justify-center items-center mb-2 lg:mb-3">
              <OptimizedImage
                src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                alt="Dariusz Wentrych"
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-prestige-gold-400 shadow-lg object-cover"
                priority={true}
                width={96}
                height={96}
              />
            </div>
            <div className="font-montserrat text-prestige-gold-400 text-xl md:text-2xl lg:text-3xl font-black tracking-wide uppercase">
              Dariusz Wentrych nr 1 w Polsce w oddłużaniu osób fizycznych
            </div>
            <div className="font-lato text-warm-neutral-200 text-lg md:text-xl lg:text-2xl font-normal mt-1 lg:mt-2 uppercase tracking-wide">
              POŻYCZKI INWESTORSKIE, KONSOLIDACJA POŻYCZEK I CHWILÓWEK
            </div>
          </div>

          {/* Enhanced Trust Section z pojedynczą ramką na jasnym tle - HIDDEN ON DESKTOP */}
          <div className="w-full relative mb-2 xl:hidden">
            {/* Szersza szara ramka z jasnym tłem gradientowym i czarną ramką */}
            <div className="mx-2 md:mx-6 lg:mx-8 bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-md border-2 border-black/80 rounded-xl shadow-2xl py-6">
              <div className="relative text-center">
                <div className="mb-6">
                  <h3 className="font-montserrat text-white text-lg md:text-xl font-bold mb-2">
                    Ponad 15.000 zadowolonych klientów
                  </h3>
                  
                  {/* Ocena gwiazdkami */}
                  <div className="flex justify-center items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-prestige-gold-400 text-prestige-gold-400" />
                      ))}
                      <div className="relative">
                        <Star className="w-5 h-5 text-gray-300" />
                        <div className="absolute top-0 left-0 w-4/5 overflow-hidden">
                          <Star className="w-5 h-5 fill-prestige-gold-400 text-prestige-gold-400" />
                        </div>
                      </div>
                    </div>
                    <span className="text-white font-semibold text-lg">4.9</span>
                    <span className="text-warm-neutral-300 text-sm">(ocena klientów)</span>
                  </div>
                </div>
                
                {/* Client photos grid z konturami */}
                <div className="flex justify-center items-center mb-6">
                  <div className="flex items-center">
                    {clientImages.map((image, index) => (
                      <div 
                        key={index} 
                        className="relative group -ml-2 first:ml-0"
                        style={{ zIndex: clientImages.length - index }}
                      >
                        <OptimizedImage
                          src={image}
                          alt={`Zadowolony klient ${index + 1}`}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-white shadow-lg group-hover:scale-110 transition-transform duration-300 object-cover"
                          priority={index < 4}
                          width={56}
                          height={56}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Animated mini testimonial - stała ramka, delikatnie szersza */}
                <div className="mb-4 px-6 md:px-16 lg:px-20">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/30 h-24 flex items-center relative">
                    <div className="flex items-center space-x-3 w-full">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <OptimizedImage
                          src={miniTestimonials[currentMiniTestimonial].image}
                          alt={miniTestimonials[currentMiniTestimonial].name}
                          className="w-full h-full object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <p className="text-gray-800 font-semibold text-sm mb-1">
                          {miniTestimonials[currentMiniTestimonial].name}
                        </p>
                        <p className="text-gray-600 text-sm italic">
                          "{miniTestimonials[currentMiniTestimonial].text}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mini dots indicator - pod ramką */}
                <div className="flex justify-center space-x-1 mb-4">
                  {miniTestimonials.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentMiniTestimonial ? 'bg-prestige-gold-500' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Nagłówek po testimonialach - mniejsza, niepogrubiona czcionka z marginesem */}
                <div className="mx-4">
                  <p className="text-warm-neutral-300 text-sm md:text-base font-normal font-montserrat">
                    Oni mi zaufali • Teraz ty możesz wyjść z zadłużenia!
                  </p>
                </div>
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
              
              {/* Polish Citizens Notice - Mobile */}
              <div className="mt-6">
                <PolishCitizensNotice />
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
              
              {/* Polish Citizens Notice - Desktop */}
              <div className="mt-6">
                <PolishCitizensNotice />
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
