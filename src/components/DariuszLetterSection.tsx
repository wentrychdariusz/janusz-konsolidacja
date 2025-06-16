
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

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
    <section className="py-12 md:py-16 bg-gradient-to-b from-white via-gray-50/30 to-gray-100">
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-base md:text-sm font-bold mb-4 animate-pulse">
            NAJWAŻNIEJSZY LIST!
          </div>
          <h2 className="font-montserrat text-3xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-slate-800">
            To jest <span className="text-slate-700">Najważniejszy List</span>, jaki kiedykolwiek przeczytasz!
          </h2>
          <p className="text-xl md:text-xl font-lato text-slate-700 mb-6">
            Czas zawalczyć o siebie, powstać, a potem wzrosnąć.
          </p>
          <p className="text-lg md:text-lg font-lato italic text-slate-600">
            "Masz tylko dwa życia... drugie zaczyna się wtedy, gdy zdasz sobie sprawę, że masz tylko jedno."
          </p>
        </div>

        {/* Letter Header */}
        <div className="mb-6 md:mb-8">
          <div className="text-base md:text-base text-slate-600 mb-2">
            <strong>Data:</strong> 24.02.2025
          </div>
          <div className="text-base md:text-base text-slate-600 mb-2">
            <strong>Od:</strong> Dariusz Wentrych
          </div>
          <div className="text-base md:text-base text-slate-600">
            <strong>Temat:</strong> <span className="text-red-600 font-bold">Zawalcz w końcu o siebie!</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 md:space-y-8 text-slate-700">
          
          {/* Opening */}
          <div>
            <h3 className="font-montserrat text-xl md:text-xl font-bold mb-4 text-slate-700">
              Drogi Przyjacielu,
            </h3>
            <p className="text-lg md:text-lg font-lato leading-relaxed mb-4">
              Wyobraź sobie życie <strong>BEZ długu</strong>. Budzenie się rano bez strachu przed telefonem od windykatora. Cieszenie się spokojnym snem, wiedząc, że Twoje finanse są pod kontrolą. Wolność, jakiej dawno nie czułeś…
            </p>
            <p className="text-lg md:text-lg font-lato leading-relaxed">
              To nie jest odległe marzenie – to <strong>rzeczywistość, którą możemy dla Ciebie stworzyć</strong>. Nie ma znaczenia, jak głęboko wpadłeś w spiralę zadłużenia.
            </p>
          </div>

          {/* For Whom Section */}
          <div className="space-y-4">
            <h4 className="font-montserrat text-xl md:text-2xl font-bold text-slate-700 mb-6">
              Oto dla kogo jest nasza oferta:
            </h4>
            <div className="space-y-4">
              {benefitsList.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-base md:text-base font-lato leading-relaxed text-slate-700">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Section */}
          <div>
            <h4 className="font-montserrat text-xl md:text-2xl font-bold text-slate-700 mb-6">
              Przejdźmy do konkretów:
            </h4>
            <div className="space-y-4">
              {solutionPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 md:w-6 md:h-6 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 md:w-4 md:h-4 text-white" />
                  </div>
                  <p className="text-base md:text-base font-lato leading-relaxed text-slate-700">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="space-y-4">
            <p className="text-lg md:text-lg font-lato leading-relaxed text-slate-700">
              <strong>Tysiące osób</strong> skorzystały już z naszej unikalnej metody oddłużeniowej i dziś cieszą się życiem <strong>BEZ DŁUGÓW</strong>.
            </p>
            <p className="text-xl md:text-xl font-montserrat font-bold text-slate-700">
              Teraz czas na Ciebie!
            </p>
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <p className="text-lg md:text-lg font-lato leading-relaxed text-slate-700">
              Czy wyobrażasz sobie życie, w którym nie musisz bać się kolejnego telefonu od wierzycieli?
            </p>
            <p className="text-lg md:text-lg font-lato leading-relaxed text-slate-700">
              Życie, w którym Twoje pieniądze należą do Ciebie, a nie do banku czy parabanku?
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <p className="text-xl md:text-xl font-montserrat font-bold text-slate-700">
              To życie jest na wyciągnięcie ręki.
            </p>
            <p className="text-lg md:text-lg font-lato leading-relaxed text-slate-700">
              Jeśli nigdy nie miałeś wsparcia i pomocy od nikogo, to <strong>ja Ci pomogę</strong>. Nie czekaj, aż sytuacja wymknie się spod kontroli.
            </p>
            <p className="text-xl md:text-xl font-montserrat font-bold text-red-600">
              Zrób pierwszy krok.
            </p>
          </div>

          {/* Signature with Avatar */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 md:w-20 md:h-20">
                <AvatarImage 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
                  alt="Dariusz Wentrych" 
                />
                <AvatarFallback>DW</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl md:text-2xl font-montserrat font-bold text-slate-700 mb-2">
                  Dariusz Wentrych
                </p>
                <p className="text-base md:text-base font-lato text-slate-600">
                  Ekspert finansowy, ale przede wszystkim osoba, która chce Ci pomóc.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DariuszLetterSection;
