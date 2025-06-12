
import React from 'react';
import { Star, X, Check } from 'lucide-react';

const MentorSection = () => {
  const testimonials = [
    {
      name: "PANI BERNADETTA",
      text: "Pan Dariusz naprawdę pomaga. Polecam każdemu, kto ma problemy finansowe!",
      avatar: "https://cdn.lugc.link/21e2f3c9-7f50-4b39-9036-1a172089e0a2/-/crop/1432x1455/336,75/-/preview/250x250/-/quality/lighter/"
    },
    {
      name: "PANI ELŻBIETA I PAN PAWEŁ",
      text: "Pan Dariusz to człowiek, który naprawdę rozumie, co znaczy walczyć z długami. Nie oceniał, nie krytykował, tylko pomógł znaleźć rozwiązanie i dał nam nadzieję na lepsze jutro.",
      avatar: "/lovable-uploads/c7d91c17-3e18-4197-8238-cf61fd882dd5.png"
    },
    {
      name: "PANI KATARZYNA",
      text: "Pan Dariusz Wentrych był pierwszą osobą, która naprawdę mnie wysłuchała i pokazała, że jest wyjście. Profesjonalny, cierpliwy i skuteczny.",
      avatar: "/lovable-uploads/47a03bb7-de4c-4a31-87c2-1a15bb5c649d.png"
    }
  ];

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 text-prestige-gold-400 fill-current" />
    ));
  };

  return (
    <>
      {/* Pan Krzysztof section */}
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
          
          {/* Avatar section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/b1beb685-d9f6-4c89-aadc-9f16c27fa4d7.png"
                alt="Pan Krzysztof"
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-3 border-prestige-gold-400 object-cover object-top"
              />
            </div>
            <p className="text-white text-sm font-lato">Pan Krzysztof</p>
          </div>

          {/* Main heading and story */}
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
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
                <p className="text-prestige-gold-400 text-2xl md:text-3xl font-bold font-montserrat mb-4">
                  Dołącz do uśmiechniętych ludzi, którzy kiedyś mieli długi, ale dziś cieszą się wolnością finansową! 💪
                </p>
                <p className="text-white text-xl md:text-2xl mt-2 font-lato font-semibold">
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
                    className="w-12 h-12 rounded-full mr-4 border-2 border-prestige-gold-400 object-cover"
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
          <div className="text-center">
            <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8">
              Teraz masz dwa wyjścia:
            </h3>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-red-600/20 via-red-500/15 to-red-700/20 border border-red-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <p className="text-white text-lg font-lato font-medium">
                  ❌ Pozostać w miejscu, w którym jesteś – pozwolić, by długi dalej rządziły Twoim życiem.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-400/30 via-green-400/25 to-lime-400/30 border border-emerald-300/60 rounded-2xl p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <p className="text-white text-lg font-lato font-medium">
                  ✅ Powiedzieć STOP! Przejąć kontrolę. Zacząć od nowa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning section about scammer companies - SEPARATE SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900">
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
          <div className="w-full">
            <div className="bg-gradient-to-r from-red-600/30 via-red-500/25 to-red-700/30 border-2 border-red-400/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-2xl">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 font-montserrat text-center">
                ⚠️ Nie ryzykuj z firmami, które nie mają doświadczenia i chcą Cię tylko oszukać!
              </h3>
              
              {/* Added image after the warning text */}
              <div className="flex justify-center mb-8">
                <img 
                  src="/lovable-uploads/0309cd85-8ab0-4aa0-8ec6-e919cb08209f.png"
                  alt="Osoba z problemami finansowymi"
                  className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl border-4 border-white/60 object-cover shadow-xl"
                />
              </div>
              
              <div className="text-left space-y-4 mb-8">
                <p className="text-white text-lg font-lato leading-relaxed">
                  Jest tyle firm naciągaczy, że nawet jeśli masz wątpliwości i byłeś w tych firmach, jak najszybciej skontaktuj się z nami, aby porównać zapisy prawne z naszym zespołem ekspertów.
                </p>
                
                <p className="text-red-300 text-xl font-bold font-montserrat">
                  Jest dziś tyle firm-naciągaczy, że to się w głowie nie mieści!
                </p>
                
                <div className="bg-white/10 rounded-xl p-6 my-6">
                  {/* Comparison section */}
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    {/* Competitors */}
                    <div className="bg-gradient-to-r from-red-600/40 via-red-500/30 to-red-700/40 rounded-xl p-6 border border-red-400/50">
                      <h4 className="text-white text-lg font-bold font-montserrat mb-4 text-center">❌ Oni</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <p className="text-red-200 text-base font-lato">Ukrywają koszty</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <p className="text-red-200 text-base font-lato">Poganiają do podpisu</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <p className="text-red-200 text-base font-lato">Zostawiają Cię z problemem</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Your company */}
                    <div className="bg-gradient-to-r from-emerald-500/40 via-green-500/30 to-lime-500/40 rounded-xl p-6 border border-emerald-400/50">
                      <h4 className="text-white text-lg font-bold font-montserrat mb-4 text-center">✅ My</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <p className="text-emerald-200 text-base font-lato">Pokazujemy, co naprawdę podpisujesz</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <p className="text-emerald-200 text-base font-lato">Tłumaczymy każdy punkt</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <p className="text-emerald-200 text-base font-lato">Bronimy Cię przed konsekwencjami</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {/* Smaller font on white background sections */}
                  <div className="bg-white rounded-lg p-4 my-4">
                    <p className="text-gray-800 text-sm font-lato leading-relaxed">
                      <span className="font-bold">Nasz zespół ekspertów sprawdzi, co Ci wciskali</span> i pokaże, czy próbują Cię oszukać.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 my-4">
                    <p className="text-gray-800 text-sm font-lato leading-relaxed">
                      Porównamy wszystkie zapisy, rozbijemy ich sztuczki na kawałki.
                    </p>
                  </div>
                  
                  <p className="text-white text-lg font-lato">
                    <span className="text-prestige-gold-400 font-bold">Nie daj się wciągnąć w ich gierki.</span>
                  </p>
                  <p className="text-prestige-gold-400 text-xl font-bold font-montserrat text-center mt-6">
                    Oni mają swoje paragrafy – Ty masz nas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MentorSection;
