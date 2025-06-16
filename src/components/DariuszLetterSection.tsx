
import React from 'react';
import { CheckCircle, Heart, Shield } from 'lucide-react';

const DariuszLetterSection = () => {
  const benefitsList = [
    "Jeśli DŁUGI CIĘ PRZYTŁACZAJĄ – czujesz, że toniesz i nie widzisz wyjścia… to jest dla Ciebie!",
    "Jeśli CZUJESZ BEZSILNOŚĆ – banki odrzucają Twoje prośby o refinansowanie, a komornik coraz mocniej naciska… to jest dla Ciebie!",
    "Jeśli NIE CHCESZ ŻYĆ W STRACHU – chcesz w końcu przejąć kontrolę nad swoim życiem i finansami… to jest dla Ciebie!"
  ];

  const solutionPoints = [
    "Stworzyliśmy wyjątkowe rozwiązanie konsolidacji długów, które pozwala znacząco zmniejszyć Twoje zobowiązania i odzyskać finansową równowagę.",
    "Działamy NATYCHMIAST – nie musisz czekać miesiącami na rezultaty. W krótkim czasie pomożemy Ci ustabilizować Twoją sytuację finansową.",
    "Wiemy, jak zatrzymać komornika, jak odeprzeć agresywnych windykatorów i jak sprawić, byś mógł zacząć życie od nowa – BEZ CIĘŻARU DŁUGÓW."
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-4 w-32 h-32 bg-prestige-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-4 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative px-4 md:px-8 lg:px-12 xl:px-16 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
            NAJWAŻNIEJSZY LIST!
          </div>
          <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            To jest <span className="text-prestige-gold-400">Najważniejszy List</span>, jaki kiedykolwiek przeczytasz!
          </h2>
          <p className="text-lg md:text-xl font-lato text-slate-300 mb-6">
            Czas zawalczyć o siebie, powstać, a potem wzrosnąć.
          </p>
          <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-slate-700">
            <p className="text-base md:text-lg font-lato italic text-prestige-gold-300">
              "Masz tylko dwa życia... drugie zaczyna się wtedy, gdy zdasz sobie sprawę, że masz tylko jedno."
            </p>
          </div>
        </div>

        {/* Letter Header */}
        <div className="bg-slate-800/70 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-slate-600">
          <div className="text-sm md:text-base text-slate-400 mb-2">
            <strong>Data:</strong> 24.02.2025
          </div>
          <div className="text-sm md:text-base text-slate-400 mb-2">
            <strong>Od:</strong> Dariusz Wentrych
          </div>
          <div className="text-sm md:text-base text-slate-400">
            <strong>Temat:</strong> <span className="text-red-400 font-bold">Zawalcz w końcu o siebie!</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 md:space-y-8">
          
          {/* Opening */}
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-xl p-4 md:p-6 border border-slate-600">
            <h3 className="font-montserrat text-lg md:text-xl font-bold mb-3 text-prestige-gold-400">
              Drogi Przyjacielu,
            </h3>
            <p className="text-base md:text-lg font-lato leading-relaxed text-slate-200 mb-4">
              Wyobraź sobie życie <strong className="text-prestige-gold-400">BEZ długu</strong>. Budzenie się rano bez strachu przed telefonem od windykatora. Cieszenie się spokojnym snem, wiedząc, że Twoje finanse są pod kontrolą. Wolność, jakiej dawno nie czułeś…
            </p>
            <p className="text-base md:text-lg font-lato leading-relaxed text-slate-200">
              To nie jest odległe marzenie – to <strong className="text-green-400">rzeczywistość, którą możemy dla Ciebie stworzyć</strong>. Nie ma znaczenia, jak głęboko wpadłeś w spiralę zadłużenia.
            </p>
          </div>

          {/* For Whom Section */}
          <div className="space-y-4">
            <h4 className="font-montserrat text-xl md:text-2xl font-bold text-center text-prestige-gold-400 mb-6">
              Oto dla kogo jest nasza oferta:
            </h4>
            <div className="space-y-3">
              {benefitsList.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 bg-slate-800/50 rounded-lg p-3 md:p-4 border border-slate-600">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base font-lato text-slate-200 leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Section */}
          <div className="bg-gradient-to-r from-prestige-gold-900/30 to-prestige-gold-800/30 rounded-xl p-4 md:p-6 border border-prestige-gold-600/30">
            <h4 className="font-montserrat text-xl md:text-2xl font-bold text-center text-prestige-gold-400 mb-6">
              Przejdźmy do konkretów:
            </h4>
            <div className="space-y-4">
              {solutionPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-prestige-gold-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-slate-900" />
                  </div>
                  <p className="text-sm md:text-base font-lato text-slate-200 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center bg-slate-800/70 rounded-xl p-4 md:p-6 border border-slate-600">
            <p className="text-base md:text-lg font-lato text-slate-200 mb-4">
              <strong className="text-prestige-gold-400">Tysiące osób</strong> skorzystały już z naszej unikalnej metody oddłużeniowej i dziś cieszą się życiem <strong className="text-green-400">BEZ DŁUGÓW</strong>.
            </p>
            <p className="text-xl md:text-2xl font-montserrat font-bold text-prestige-gold-400">
              Teraz czas na Ciebie!
            </p>
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-xl p-4 md:p-6 border border-blue-600/30">
              <p className="text-lg md:text-xl font-lato text-center text-slate-200 leading-relaxed">
                Czy wyobrażasz sobie życie, w którym <strong className="text-blue-400">nie musisz bać się kolejnego telefonu</strong> od wierzycieli?
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-xl p-4 md:p-6 border border-green-600/30">
              <p className="text-lg md:text-xl font-lato text-center text-slate-200 leading-relaxed">
                Życie, w którym <strong className="text-green-400">Twoje pieniądze należą do Ciebie</strong>, a nie do banku czy parabanku?
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-prestige-gold-900/50 to-prestige-gold-800/50 rounded-xl p-6 md:p-8 border border-prestige-gold-500/50">
            <p className="text-xl md:text-2xl font-montserrat font-bold text-prestige-gold-400 mb-4">
              To życie jest na wyciągnięcie ręki.
            </p>
            <p className="text-base md:text-lg font-lato text-slate-200 mb-6 leading-relaxed">
              Jeśli nigdy nie miałeś wsparcia i pomocy od nikogo, to <strong className="text-prestige-gold-400">ja Ci pomogę</strong>. Nie czekaj, aż sytuacja wymknie się spod kontroli.
            </p>
            <p className="text-lg md:text-xl font-montserrat font-bold text-red-400 mb-6">
              Zrób pierwszy krok.
            </p>
          </div>

          {/* Signature */}
          <div className="text-center bg-slate-800/70 rounded-xl p-4 md:p-6 border border-slate-600">
            <p className="text-xl md:text-2xl font-montserrat font-bold text-prestige-gold-400 mb-2">
              Dariusz Wentrych
            </p>
            <p className="text-sm md:text-base font-lato text-slate-300">
              Ekspert finansowy, ale przede wszystkim osoba, która chce Ci pomóc.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DariuszLetterSection;
