import React from 'react';
import dariuszImage from '/lovable-uploads/566df42e-2936-4526-804a-90b8512b4e83.png';

const DariuszCongratulationsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-success-50 to-business-blue-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header z gratulacjami */}
          <div className="bg-gradient-to-r from-success-600 to-emerald-600 text-white text-center py-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              🎉 Gratulacje!
            </h2>
            <p className="text-lg md:text-xl font-medium">
              Twój dochód kwalifikuje Cię do oddłużenia i zamiany długów w jedną, niższą ratę!
            </p>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              
              {/* Wizerunek Dariusza z opisem */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative">
                  <img 
                    src={dariuszImage} 
                    alt="Dariusz Wentrych - Ekspert oddłużeniowy nr 1 w Polsce"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-success-400 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-success-500 text-white p-3 rounded-full shadow-lg">
                    <span className="text-2xl">💼</span>
                  </div>
                </div>
                
                {/* Opis Dariusza */}
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-navy-800 mb-3">Dariusz Wentrych</h3>
                  <div className="space-y-1 text-sm text-navy-600">
                    <p className="font-semibold text-prestige-gold-600">🏆 Nr 1 w oddłużeniu i konsolidacji</p>
                    <p>👥 15.000+ klientów</p>
                    <p>⏰ 20+ lat doświadczenia</p>
                    <p>📖 Autor <em>"Nowe życie bez długów"</em></p>
                  </div>
                </div>
              </div>

              {/* Treść komunikatu */}
              <div className="flex-1 space-y-6 text-navy-700">
                
                <div className="text-lg leading-relaxed">
                  <p className="mb-4">
                    Jeśli zarabiasz <strong>od 4000 zł netto</strong>, możesz:
                  </p>
                  
                  <p className="mb-4">
                    ✅ Połączyć wszystkie zobowiązania w jedną ratę<br/>
                    ✅ Odzyskać spokój i kontrolę nad finansami<br/>
                    ✅ Przestać martwić się o windykację i zaległości
                  </p>

                  <p className="text-xl font-bold text-navy-800 mb-3">
                    🧠 Pytanie brzmi: czy chcesz coś z tym zrobić?
                  </p>

                  <p className="mb-4">
                    Nie musisz mieć komornika ani ogromnych długów. 
                    Wystarczy, że zaczynasz tracić kontrolę nad finansami.
                  </p>

                  <p className="mb-6">
                    <strong>Masz dwa wyjścia:</strong><br/>
                    🔸 Iść do konkurencji i tracić czas na marketingowe bajki<br/>
                    🔸 Lub zaufać zespołowi, który rozmawia z bankami <em>inaczej</em>
                  </p>

                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 mb-6">
                    <p className="font-bold text-red-800 mb-2">⚠️ To nie jest oferta dla niezdecydowanych</p>
                    <p className="text-red-700">
                      Jeśli chcesz tylko "się rozejrzeć" – zamknij stronę. 
                      My pracujemy z tymi, którzy chcą zmiany <strong>tu i teraz</strong>.
                    </p>
                  </div>

                  <div className="bg-prestige-gold-50 p-6 rounded-lg">
                    <p className="font-bold text-lg mb-3">💼 Co zyskujesz za darmo:</p>
                    <p className="mb-2">🔹 Konsultację wartą 1000 zł</p>
                    <p className="mb-2">🔹 Analizę przez zespół ekspertów</p>
                    <p className="mb-4">🔹 Plan oddłużeniowy na miarę</p>
                    
                    <div className="text-center mt-6 p-4 bg-red-500 text-white rounded-lg">
                      <p className="font-bold text-lg">🔥 Zostało 20 miejsc</p>
                      <p>Nie daj sobie odebrać tej szansy</p>
                    </div>
                  </div>

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