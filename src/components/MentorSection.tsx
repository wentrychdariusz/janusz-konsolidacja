
import React from 'react';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';

const MentorSection = () => {
  const achievements = [
    {
      icon: Users,
      title: "500+ kobiet",
      description: "Pomogłam zarabiać dodatkowe pieniądze"
    },
    {
      icon: TrendingUp,
      title: "Średnio 8000 zł",
      description: "Miesięczne dodatkowe zarobki moich podopiecznych"
    },
    {
      icon: Award,
      title: "3 lata doświadczenia",
      description: "W branży online marketingu"
    },
    {
      icon: BookOpen,
      title: "Sprawdzone metody",
      description: "System przetestowany przez setki osób"
    }
  ];

  return (
    <section 
      className="py-16 md:py-24 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop&crop=center')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/75 to-navy-900/85"></div>
      
      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Cześć, jestem <span className="text-prestige-gold-400">Magda</span>
              </h2>
              <p className="text-warm-neutral-200 text-lg font-lato">
                Jestem ekspertem w zarabianiu online i pomagam kobietom osiągnąć finansową niezależność. 
                Przez ostatnie 3 lata pomogłam setkom kobiet zacząć zarabiać dodatkowe pieniądze.
              </p>
              <p className="text-warm-neutral-200 text-base font-lato">
                Mój system jest prosty, sprawdzony i nie wymaga żadnych inwestycji na start. 
                To, czego potrzebujesz, to motywacja i 2-3 godziny dziennie.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-prestige-gold-200/30 rounded-lg p-4 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-prestige-gold-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="w-5 h-5 text-navy-900" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{achievement.title}</h3>
                      <p className="text-warm-neutral-300 text-xs">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md w-full">
              <div className="aspect-video bg-navy-900 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-prestige-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-0 h-0 border-l-6 border-l-navy-900 border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                    </div>
                    <p className="text-sm font-medium">Film wprowadzający</p>
                    <p className="text-xs text-warm-neutral-300 mt-1">Poznaj mój system zarabiania</p>
                  </div>
                </div>
              </div>
              <p className="text-white text-sm text-center font-medium">
                Zobacz jak działą mój system krok po kroku
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
