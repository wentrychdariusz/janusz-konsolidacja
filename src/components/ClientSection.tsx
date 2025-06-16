
import React from 'react';
import OptimizedImage from './OptimizedImage';
import { Users, Award, BookOpen, TrendingUp } from 'lucide-react';

const ClientSection = () => {
  const achievements = [
    {
      icon: Users,
      number: "15.000",
      text: "zadowolonych klientów"
    },
    {
      icon: TrendingUp,
      number: "20",
      text: "lat doświadczenia w finansach"
    },
    {
      icon: BookOpen,
      number: "1",
      text: "bestsellerowa książka 'Nowe życie bez długów'"
    },
    {
      icon: Award,
      number: "Nr 1",
      text: "w Polsce w oddłużaniu"
    }
  ];

  const clientImages = [
    "/lovable-uploads/73ec7538-32fd-47a6-9460-ecfe26f5985b.png",
    "/lovable-uploads/731a75cc-be2d-432e-ba08-6d2b2f601a69.png",
    "/lovable-uploads/006c64e3-6a85-4c9a-ac54-1d2b2f158ac8d8.png",
    "/lovable-uploads/e02defc0-4e3f-46bf-9b38-ccbd8ce23531.png",
    "/lovable-uploads/a7da1141-d0f1-484e-af6a-d6f7704d0efb.png",
    "/lovable-uploads/3eb21e4e-0f4f-42db-938e-f1e7b917cc4e.png",
    "/lovable-uploads/7400b6f6-4a58-46c3-a434-f941fcae211a.png",
    "/lovable-uploads/6d6c71e9-c427-4ea3-ba95-42f30c256d9f.png"
  ];

  const mediaLogos = [
    {
      src: "https://kredytstudio.pl/wp-content/uploads/2025/04/logos1-75x75.png",
      alt: "Logo media outlet",
      className: "h-12 md:h-16"
    },
    {
      src: "https://kredytstudio.pl/wp-content/uploads/2025/04/logo_Fakt.svg",
      alt: "Fakt - gazeta",
      className: "h-8 md:h-12"
    },
    {
      src: "https://kredytstudio.pl/wp-content/uploads/2025/04/TVP_HD_logo-150x75.png",
      alt: "TVP HD",
      className: "h-10 md:h-14"
    },
    {
      src: "https://kredytstudio.pl/wp-content/uploads/2025/04/1200px-Dziennik_Polski_logo.svg-150x31.png",
      alt: "Dziennik Polski",
      className: "h-8 md:h-10"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-warm-neutral-50 to-white py-16 md:py-24">
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
            Dlaczego warto zaufać <span className="text-prestige-gold-600">Dariuszowi Wentrychowi?</span>
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Zdjęcie Dariusza po lewej z optymalizacją */}
            <div className="flex-shrink-0">
              <OptimizedImage
                src="/lovable-uploads/334d50e2-cfc0-48be-97b0-4521fb97af10.png"
                alt="Dariusz Wentrych - Doradca finansowy"
                className="w-64 h-80 lg:w-72 lg:h-96 object-cover rounded-2xl shadow-xl border-4 border-prestige-gold-200"
                priority={true}
                width={288}
                height={384}
              />
            </div>
            
            {/* Tekst po prawej */}
            <div className="flex-1">
              <p className="text-prestige-gold-600 text-xl md:text-2xl font-bold mb-6 font-montserrat text-center lg:text-left">
                Doradca finansowy | Autor książki „Nowe życie bez długów"
              </p>
              
              <div className="text-warm-neutral-700 text-lg md:text-xl space-y-6 font-lato text-left">
                <p>
                  Dariusz Wentrych to doradca finansowy z ponad 20-letnim doświadczeniem, który pomaga klientom podejmować świadome decyzje dotyczące ich pieniędzy. Łączy ekspercką wiedzę z umiejętnością tłumaczenia złożonych kwestii w prosty i zrozumiały sposób.
                </p>
                
                <p>
                  Współpracuje zarówno z klientami indywidualnymi, jak i firmami. Pomaga planować, optymalizować i bezpiecznie zarządzać finansami. Dzięki znajomości rynku pożyczek bankowych i pozabankowych, kredytów hipotecznych oraz finansowania firm potrafi skutecznie dopasować strategię do każdej sytuacji.
                </p>
                
                <p>
                  Jest autorem książki „Nowe życie bez długów", w której dzieli się praktycznymi narzędziami do odzyskania kontroli nad finansami. Jej przesłanie koncentruje się na tym, co najważniejsze — spokoju, bezpieczeństwie i wolności wyboru.
                </p>
                
                <p>
                  Jako ekspert regularnie występuje w mediach. Był gościem „Dzień Dobry TVN", a jego komentarze publikowały ogólnopolskie gazety i portale branżowe. Znany z konkretnego języka i podejścia skupionego na realnych potrzebach ludzi.
                </p>
                
                <p>
                  Prywatnie pasjonuje się sportem i podróżami. Kibic piłki nożnej i koszykówki, ceni zespołowe wartości i konsekwencję. Wierzy, że dobra decyzja — w sporcie, w finansach i w życiu — zaczyna się od zrozumienia drugiego człowieka.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-prestige-gold-200/30 text-center group hover:-translate-y-2"
            >
              <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <achievement.icon className="w-8 h-8 text-navy-900" />
              </div>
              <div className="text-3xl md:text-4xl font-black text-navy-900 mb-2 font-montserrat">
                {achievement.number}
              </div>
              <p className="text-warm-neutral-600 font-lato font-medium">
                {achievement.text}
              </p>
            </div>
          ))}
        </div>

        {/* Media Section */}
        <div className="text-center mb-16">
          <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-8">
            Znany z
          </h3>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-prestige-gold-200/30 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {mediaLogos.map((logo, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  <img 
                    src={logo.src}
                    alt={logo.alt}
                    className={`object-contain ${logo.className}`}
                  />
                </div>
              ))}
            </div>
            
            <p className="text-warm-neutral-600 text-sm md:text-base mt-6 font-lato">
              Dariusz Wentrych regularnie występuje w telewizji i mediach jako ekspert finansowy
            </p>
          </div>
        </div>

        {/* Client Photos Section */}
        <div className="text-center">
          <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-8">
            Oni mi <span className="text-prestige-gold-600">zaufali</span>
          </h3>
          
          {/* Client photos grid z lazy loading */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {clientImages.map((image, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <OptimizedImage
                  src={image}
                  alt={`Zadowolony klient ${index + 1}`}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-prestige-gold-400 object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                  priority={index < 4}
                  width={80}
                  height={80}
                />
                <div className="absolute inset-0 bg-prestige-gold-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
            
            {/* Plus indicator for more clients */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-prestige-gold-400 bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 flex items-center justify-center shadow-lg">
              <span className="text-navy-900 font-black text-xl md:text-2xl">+</span>
            </div>
          </div>
          
          <p className="text-warm-neutral-600 text-lg font-lato">
            I tysiące innych zadowolonych klientów w całej Polsce
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
