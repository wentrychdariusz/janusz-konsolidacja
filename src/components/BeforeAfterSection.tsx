
import React, { useState } from 'react';
import { Smile, Phone, Heart, Shield, CheckCircle, XCircle, X, Frown } from 'lucide-react';
import DebtCalculator from './DebtCalculator';

const BeforeAfterSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const beforeItems = [
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      text: "Spłacasz kilka rat i nadal brakuje Ci na życie"
    },
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      text: "Boisz się odbierać telefon – bo to znowu windykacja"
    },
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      text: "Odsetki rosną, a Ty nie widzisz wyjścia"
    },
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      text: "Masz mętlik w głowie, bo każdy doradza co innego"
    },
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      text: "Czujesz się sam z problemem i boisz się, że to koniec"
    },
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      text: 'Słyszysz „oddłużanie" i myślisz: „To pewnie kolejna ściema"'
    }
  ];

  const afterItems = [
    {
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      text: "Masz jedną ratę i więcej spokoju w portfelu"
    },
    {
      icon: <Phone className="w-6 h-6 text-emerald-600" />,
      text: "Telefon nie stresuje – bo wszystko masz pod kontrolą"
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      text: "Wiesz, co się dzieje z Twoją sprawą – i masz na to wpływ"
    },
    {
      icon: <Heart className="w-6 h-6 text-emerald-600" />,
      text: "Czujesz ulgę, pewność i nadzieję"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      text: "Masz wsparcie doradcy, który zna Twoje imię – nie jesteś numerem"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      text: "Zaczynasz nowe życie bez długów – uczciwie i z głową"
    }
  ];

  const handleCalculatorOpen = () => {
    setIsCalculatorOpen(true);
  };

  const handleCalculatorClose = () => {
    setIsCalculatorOpen(false);
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Dołącz do <span className="text-prestige-gold-600">„Wyzwania Oddłużeniowego"</span> z Dariuszem Wentrychem!
            </h2>
            
            <p className="text-slate-700 text-xl md:text-2xl font-lato max-w-4xl mx-auto mb-8 leading-relaxed">
              Chcesz w końcu wyjść z długów, ale nie wiesz od czego zacząć?
            </p>
            
            {/* Dariusz's image */}
            <div className="flex justify-center mb-8">
              <img 
                src="/lovable-uploads/85ea5843-0408-4e89-8f99-c694c9261fd3.png" 
                alt="Dariusz Wentrych" 
                className="w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem] rounded-2xl object-cover shadow-xl"
              />
            </div>
            
            <p className="text-slate-600 text-lg md:text-xl font-lato max-w-3xl mx-auto">
              Zobacz, jak wygląda życie przed i po oddłużeniu z najlepszym ekspertem w Polsce 👇
            </p>
          </div>

          {/* Before and After Comparison */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            
            {/* Before Section - Unified Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200 p-6">
                <div className="flex items-center justify-center">
                  <Frown className="w-12 h-12 text-red-500 mr-4" />
                  <h3 className="font-montserrat text-xl md:text-2xl font-bold text-red-800 text-center">
                    Przed oddłużaniem z Dariuszem Wentrychem…
                  </h3>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <div className="space-y-4">
                  {beforeItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex-shrink-0 mt-1">
                        {item.icon}
                      </div>
                      <p className="text-slate-700 text-base font-lato leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* After Section - Unified Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-200 p-6">
                <div className="flex items-center justify-center">
                  <Smile className="w-12 h-12 text-emerald-500 mr-4" />
                  <h3 className="font-montserrat text-xl md:text-2xl font-bold text-emerald-800 text-center">
                    Po oddłużeniu z Dariuszem Wentrychem…
                  </h3>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <div className="space-y-4">
                  {afterItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex-shrink-0 mt-1">
                        {item.icon}
                      </div>
                      <p className="text-slate-700 text-base font-lato leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
              <button 
                onClick={handleCalculatorOpen}
                className="bg-gradient-to-r from-prestige-gold-500 to-yellow-400 text-slate-900 font-bold px-10 py-4 rounded-full hover:from-prestige-gold-600 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
              >
                Dołącz do Wyzwania Oddłużeniowego
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal with Calculator */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={handleCalculatorClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Calculator Content */}
            <div className="p-6 h-full">
              <DebtCalculator />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BeforeAfterSection;
