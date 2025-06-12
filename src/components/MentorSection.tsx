
import React from 'react';
import { Star } from 'lucide-react';

const MentorSection = () => {
  const testimonials = [
    {
      name: "PANI BERNADETTA",
      text: "Pan Dariusz naprawdę pomaga. Polecam każdemu, kto ma problemy finansowe!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "PANI ELŻBIETA I PAN PAWEŁ",
      text: "Pan Dariusz to człowiek, który naprawdę rozumie, co znaczy walczyć z długami. Nie oceniał, nie krytykował, tylko pomógł znaleźć rozwiązanie i dał nam nadzieję na lepsze jutro.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "PANI KATARZYNA",
      text: "Pan Dariusz Wentrych był pierwszą osobą, która naprawdę mnie wysłuchała i pokazała, że jest wyjście. Profesjonalny, cierpliwy i skuteczny.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 text-prestige-gold-400 fill-current" />
    ));
  };

  return (
    <section 
      className="py-16 md:py-24 relative"
      style={{
        backgroundImage: `url('/lovable-uploads/17f8f3fc-9862-4650-99e5-12d823aad11c.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/85 to-navy-900/90"></div>
      
      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Main heading and story */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            Jak przywróciliśmy klientowi <span className="text-prestige-gold-400">wiarygodność finansową</span> i pomogliśmy mu odzyskać kontrolę nad życiem?
          </h2>
          
          <div className="max-w-4xl mx-auto text-left">
            <p className="text-warm-neutral-200 text-lg font-lato mb-6 leading-relaxed">
              Krzysztof miał 18 lat, kiedy zaciągnął kilka zobowiązań, których nie był w stanie spłacić. Po wyjeździe za granicę pozostawił długi, oraz niewypowiedziany limit kredytowy. Ten skutecznie zablokował mu dostęp do jakiejkolwiek pomocy finansowej po powrocie do kraju.
            </p>
            <p className="text-warm-neutral-200 text-lg font-lato mb-6 leading-relaxed">
              Wszyscy mówili „nie". My powiedzieliśmy „Zaczynamy". Spłaciliśmy komornika, a Ania, nasza ekspertka od zadań niemożliwych, uporządkowała sprawę limitu kredytowego. Dziś Krzysztof nie tylko wrócił do normalnego obiegu bankowego: otrzymał finansowanie na samochód, mimo że wcześniej został całkowicie skreślony przez system. Przyjechał do nas z daleka, nie po pieniądze, lecz po szansę. I dostał coś więcej niż finansowanie – dostał nowy start.
            </p>
            
            <div className="text-center mt-8 mb-12">
              <p className="text-prestige-gold-400 text-xl font-bold font-montserrat">
                Dołącz do uśmiechniętych ludzi, którzy kiedyś mieli długi, ale dziś cieszą się wolnością finansową! 💪
              </p>
              <p className="text-white text-lg mt-2 font-lato">
                Nie miałeś wsparcia? Teraz masz! Pomogę Ci stanąć na nogi.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-prestige-gold-200/30 rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {renderStars()}
              </div>
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-prestige-gold-400"
                />
                <h3 className="text-prestige-gold-400 font-semibold text-sm">{testimonial.name}</h3>
              </div>
              <p className="text-white text-sm leading-relaxed font-lato">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Two choices section */}
        <div className="text-center mb-12">
          <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8">
            Teraz masz dwa wyjścia:
          </h3>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-6">
              <p className="text-white text-lg font-lato">
                ❌ Pozostać w miejscu, w którym jesteś – pozwolić, by długi dalej rządziły Twoim życiem.
              </p>
            </div>
            
            <div className="bg-success-500/20 border border-success-400/30 rounded-xl p-6">
              <p className="text-white text-lg font-lato">
                ✅ Powiedzieć STOP! Przejąć kontrolę. Zacząć od nowa.
              </p>
            </div>
          </div>
        </div>

        {/* Client images section */}
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              alt="Zadowolony klient"
              className="w-full h-32 object-cover rounded-lg border-2 border-prestige-gold-400"
            />
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Zadowolony klient"
              className="w-full h-32 object-cover rounded-lg border-2 border-prestige-gold-400"
            />
            <img 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
              alt="Zadowolona klientka"
              className="w-full h-32 object-cover rounded-lg border-2 border-prestige-gold-400"
            />
            <img 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=200&h=200&fit=crop&crop=face"
              alt="Zadowolona klientka"
              className="w-full h-32 object-cover rounded-lg border-2 border-prestige-gold-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
