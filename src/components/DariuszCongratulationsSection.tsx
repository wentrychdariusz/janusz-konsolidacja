import React from 'react';
import dariuszImage from '../assets/dariusz-expert-portrait.jpg';

const DariuszCongratulationsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-success-50 to-business-blue-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-success-200">
          
          {/* Header z gratulacjami */}
          <div className="bg-gradient-to-r from-success-600 to-emerald-600 text-white text-center py-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              🎉 Gratulacje!
            </h2>
            <p className="text-lg md:text-xl font-medium">
              Twój dochód kwalifikuje Cię do oddłużenia i zamiany długów w jedną, niższą ratę!
            </p>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              
              {/* Wizerunek Dariusza */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative">
                  <img 
                    src={dariuszImage} 
                    alt="Dariusz Wentrych - Ekspert oddłużeniowy"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-success-400 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-success-500 text-white p-3 rounded-full shadow-lg">
                    <span className="text-2xl">💼</span>
                  </div>
                </div>
              </div>

              {/* Treść komunikatu */}
              <div className="flex-1 space-y-6">
                
                {/* Warunki kwalifikacji */}
                <div className="bg-success-50 p-4 rounded-xl border-l-4 border-success-500">
                  <p className="text-navy-800 font-medium mb-3">
                    Jeśli zarabiasz od 4000 zł netto, spełniasz warunki, by:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-navy-700">
                      <span className="text-success-600 font-bold mr-2">✅</span>
                      Połączyć wszystkie swoje zobowiązania w jedną, łatwiejszą ratę
                    </li>
                    <li className="flex items-center text-navy-700">
                      <span className="text-success-600 font-bold mr-2">✅</span>
                      Odzyskać spokój i kontrolę nad finansami
                    </li>
                    <li className="flex items-center text-navy-700">
                      <span className="text-success-600 font-bold mr-2">✅</span>
                      Przestać martwić się o telefony z banków, windykację, zaległości
                    </li>
                  </ul>
                </div>

                {/* Pytanie kluczowe */}
                <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
                  <p className="text-navy-800 font-bold text-lg mb-2">
                    🧠 Pytanie brzmi: czy chcesz coś z tym zrobić?
                  </p>
                  <p className="text-navy-700">
                    Nie musisz mieć komornika ani ogromnych długów.
                    Wystarczy, że zaczynasz tracić kontrolę nad finansami – my wiemy, jak to zatrzymać.
                  </p>
                </div>

                {/* Dwa wyjścia */}
                <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                  <p className="text-navy-800 font-bold mb-3">🚪 Masz dwa wyjścia:</p>
                  <div className="space-y-2">
                    <p className="text-navy-700">
                      <span className="font-medium">🔸 Pójść do konkurencji</span>, słuchać marketingowych bajek i tracić czas
                    </p>
                    <p className="text-center font-bold text-navy-800 py-2">albo:</p>
                    <p className="text-navy-700">
                      <span className="font-medium">🔸 Zaufać zespołowi Dariusza Wentrycha</span> – ludziom, którzy rozmawiają z bankami inaczej niż wszyscy.
                    </p>
                  </div>
                </div>

                {/* Ostrzeżenie */}
                <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                  <p className="text-red-800 font-bold mb-2">⚠️ Ale uwaga:</p>
                  <p className="text-red-700 mb-2">
                    To nie jest oferta dla osób niezdecydowanych.
                  </p>
                  <p className="text-red-700 mb-2">
                    Jeśli brakuje Ci motywacji i chcesz tylko „się rozejrzeć" – zamknij stronę.
                    Nie marnuj czasu swojego ani naszego.
                  </p>
                  <p className="text-red-800 font-semibold">
                    My pracujemy z tymi, którzy chcą konkretnej zmiany. Tu i teraz.
                  </p>
                </div>

                {/* Co zyskujesz */}
                <div className="bg-prestige-gold-50 p-4 rounded-xl border-l-4 border-prestige-gold-500">
                  <p className="text-navy-800 font-bold text-lg mb-3">💼 Co zyskujesz?</p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-navy-700">
                      <span className="text-prestige-gold-600 font-bold mr-2 mt-1">🔹</span>
                      <span>Konsultację o wartości 1000 zł – <strong>ZA DARMO</strong></span>
                    </li>
                    <li className="flex items-start text-navy-700">
                      <span className="text-prestige-gold-600 font-bold mr-2 mt-1">🔹</span>
                      <span>Indywidualną analizę Twojej sytuacji przez zespół ekspertów</span>
                    </li>
                    <li className="flex items-start text-navy-700">
                      <span className="text-prestige-gold-600 font-bold mr-2 mt-1">🔹</span>
                      <span>Jasny plan oddłużeniowy dopasowany do Twoich realnych możliwości</span>
                    </li>
                    <li className="flex items-start text-navy-700">
                      <span className="text-prestige-gold-600 font-bold mr-2 mt-1">🔹</span>
                      <span>Opcję połączenia długów w jedną niższą ratę</span>
                    </li>
                    <li className="flex items-start text-navy-700">
                      <span className="text-prestige-gold-600 font-bold mr-2 mt-1">🔹</span>
                      <span>Pomoc w zatrzymaniu windykacji, negocjacjach z bankami, a jeśli trzeba – również z komornikiem</span>
                    </li>
                  </ul>
                </div>

                {/* Finalny call to action */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl text-center">
                  <p className="text-xl font-bold mb-2">🔥 Zostało tylko 20 miejsc na darmową konsultację</p>
                  <p className="text-lg mb-2">Kto pierwszy, ten wychodzi z długów szybciej.</p>
                  <p className="text-lg font-semibold">
                    Nie daj sobie odebrać szansy, która może już się nie powtórzyć.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DariuszCongratulationsSection;