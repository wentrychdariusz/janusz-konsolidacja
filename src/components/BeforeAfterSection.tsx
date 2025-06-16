
import React from 'react';
import { ArrowDown, ArrowUp, Phone, Heart, Shield, CheckCircle, XCircle } from 'lucide-react';

const BeforeAfterSection = () => {
  const beforeItems = [
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      text: "Spłacasz kilka rat i nadal brakuje Ci na życie"
    },
    {
      icon: <Phone className="w-6 h-6 text-red-500" />,
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

  return (
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
          
          <p className="text-slate-600 text-lg md:text-xl font-lato max-w-3xl mx-auto">
            Zobacz, jak wygląda życie przed i po oddłużeniu z najlepszym ekspertem w Polsce 👇
          </p>
        </div>

        {/* Before and After Comparison */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          
          {/* Before Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-500 rounded-full p-3 mr-4">
                <ArrowDown className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-montserrat text-xl md:text-2xl font-bold text-red-800">
                Przed oddłużaniem z Dariuszem Wentrychem…
              </h3>
            </div>
            
            <div className="space-y-3">
              {beforeItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-red-100 shadow-sm">
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

          {/* After Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-emerald-500 rounded-full p-3 mr-4">
                <ArrowUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-montserrat text-xl md:text-2xl font-bold text-emerald-800">
                Po oddłużeniu z Dariuszem Wentrychem…
              </h3>
            </div>
            
            <div className="space-y-3">
              {afterItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Gotowy na zmianę swojego życia finansowego?
            </h3>
            <p className="text-slate-600 text-lg font-lato mb-8 max-w-2xl mx-auto">
              Nie musisz dłużej żyć w strachu przed długami. Rozpocznij swoją drogę do wolności finansowej już dziś.
            </p>
            <button className="bg-gradient-to-r from-prestige-gold-500 to-yellow-400 text-slate-900 font-bold px-10 py-4 rounded-full hover:from-prestige-gold-600 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
              Dołącz do Wyzwania Oddłużeniowego
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
