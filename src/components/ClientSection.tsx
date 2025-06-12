
import React from 'react';
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
    "/lovable-uploads/006c64e3-6a85-4c9a-ac54-1d2f158ac8d8.png",
    "/lovable-uploads/e02defc0-4e3f-46bf-9b38-ccbd8ce23531.png",
    "/lovable-uploads/a7da1141-d0f1-484e-af6a-d6f7704d0efb.png",
    "/lovable-uploads/3eb21e4e-0f4f-42db-938e-f1e7b917cc4e.png",
    "/lovable-uploads/7400b6f6-4a58-46c3-a434-f941fcae211a.png",
    "/lovable-uploads/6d6c71e9-c427-4ea3-ba95-42f30c256d9f.png"
  ];

  const mediaLogos = [
    "/lovable-uploads/a5da0aac-17bf-4549-94e1-f883378fffdf.png",
    // Dodaj więcej logo mediów tutaj
  ];

  return (
    <section className="bg-gradient-to-br from-warm-neutral-50 to-white py-16 md:py-24">
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
            Dlaczego warto zaufać <span className="text-prestige-gold-600">Dariuszowi Wentrychowi?</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-prestige-gold-600 text-xl md:text-2xl font-bold mb-6 font-montserrat">
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
          
          <div className="flex justify-center items-center">
            <img 
              src="/lovable-uploads/a5da0aac-17bf-4549-94e1-f883378fffdf.png"
              alt="Nowe życie bez długów - książka Dariusza Wentrycha"
              className="h-32 md:h-40 object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Client Photos Section */}
        <div className="text-center">
          <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-8">
            Oni mi <span className="text-prestige-gold-600">zaufali</span>
          </h3>
          
          {/* Client photos grid */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {clientImages.map((image, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <img 
                  src={image}
                  alt={`Zadowolony klient ${index + 1}`}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-prestige-gold-400 object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
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
