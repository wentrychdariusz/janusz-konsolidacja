
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
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=200&h=200&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=200&h=200&fit=crop&crop=face"
  ];

  return (
    <section className="bg-gradient-to-br from-warm-neutral-50 to-white py-16 md:py-24">
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
            Dlaczego mi <span className="text-prestige-gold-600">ufają?</span>
          </h2>
          <p className="text-warm-neutral-700 text-lg md:text-xl max-w-3xl mx-auto font-lato">
            Moje doświadczenie i osiągnięcia mówią same za siebie
          </p>
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
