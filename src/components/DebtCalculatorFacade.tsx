import React from 'react';
import { Calculator, CheckCircle, Star, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DebtCalculatorFacade = () => {
  const navigate = useNavigate();

  const handleInteraction = () => {
    navigate('/kalkulator-nowy');
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid grid-cols-1 gap-6 items-start h-full relative">
        <div className="bg-white rounded-2xl shadow-xl border-0 p-4 sm:p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[700px] w-full hover:shadow-lg transition-all duration-700 ease-in-out">
          <div>
            {/* Header */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex justify-center items-center mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-navy-900 to-business-blue-600 p-3 sm:p-4 rounded-full">
                  <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-1">
                Kalkulator Oddłużania
              </h2>
              <p className="text-sm text-prestige-gold-600 font-semibold mb-1">W 30 sekund powiemy Ci czy możemy pomóc!</p>
              <p className="text-sm text-warm-neutral-600">
                Krok 1 z 3
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-4 sm:mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                <div className="bg-gradient-to-r from-navy-900 to-business-blue-600 h-3 sm:h-4 rounded-full transition-all duration-300" style={{ width: '33%' }} />
              </div>
              <div className="flex justify-between mt-2 text-sm sm:text-base">
                <span className="text-warm-neutral-600">Postęp</span>
                <span className="font-bold text-navy-900">33%</span>
              </div>
            </div>

            {/* Trust section */}
            <div className="text-center mb-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <img src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" alt="Dariusz Wentrych" className="w-12 h-12 rounded-full border-3 border-prestige-gold-400 object-cover shadow-lg hover:scale-110 transition-all duration-300 group-hover:shadow-xl" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-base font-bold text-navy-900 flex items-center gap-2">
                      Dariusz Wentrych
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </div>
                    <div className="text-sm text-green-700 font-medium">
                      ✅ Ekspert nr 1 w oddłużeniu • 15.000+ zadowolonych klientów
                    </div>
                    <div className="text-xs text-blue-600 font-medium mt-1">
                      💬 "Pomagam od 20 lat - sprawdź, czy mogę pomóc również Tobie!"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 1 content - clickable facade */}
          <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
            <div className="text-center animate-fade-in w-full max-w-md mx-auto">
              <div className="mb-8">
                <div className="relative w-20 h-20 bg-gradient-to-r from-navy-900 to-business-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-3xl">💰</span>
                  <div className="absolute -top-2 -right-2 animate-bounce">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs">👆</span>
                    </div>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
                    Jaki jest Twój dochód?
                  </h3>
                  <p className="text-base sm:text-lg text-warm-neutral-600 font-medium px-4">
                    Podaj miesięczny dochód netto
                  </p>
                </div>
              </div>

              {/* Fake input - redirects on click/focus */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border-2 border-blue-200 mb-6 shadow-lg cursor-pointer" onClick={handleInteraction}>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    placeholder="4 000"
                    onFocus={handleInteraction}
                    onClick={handleInteraction}
                    className="w-full pr-16 text-center h-20 md:h-24 lg:h-28 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold border-4 border-blue-400 rounded-xl shadow-lg animate-pulse cursor-pointer bg-white placeholder:text-navy-400"
                  />
                  <span className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl md:text-2xl lg:text-3xl font-bold">
                    PLN
                  </span>
                  <div className="absolute inset-0 rounded-xl animate-pulse border-2 border-yellow-400 pointer-events-none"></div>
                </div>
                
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm md:text-base text-navy-700 font-medium">
                    Wpisz swoją kwotę tutaj ⬆️
                  </p>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Disabled button */}
              <button
                onClick={handleInteraction}
                className="w-full h-16 text-lg font-bold rounded-xl bg-gray-300 text-gray-500 cursor-pointer hover:bg-gray-400 transition-colors"
              >
                ✅ Dalej →
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center border-t pt-4 sm:pt-6">
            <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-warm-neutral-600">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                <span className="font-medium">100% bezpieczeństwo</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                <span className="font-medium">Darmowa analiza</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtCalculatorFacade;
