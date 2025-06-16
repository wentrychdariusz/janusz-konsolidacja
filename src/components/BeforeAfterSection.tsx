
import React from 'react';
import { Smile, Phone, Heart, Shield, CheckCircle, XCircle } from 'lucide-react';

const BeforeAfterSection = () => {
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

  const clientImages = [
    "/lovable-uploads/73ec7538-32fd-47a6-9460-ecfe26f5985b.png",
    "/lovable-uploads/731a75cc-be2d-432e-ba08-6d2b2f601a69.png", 
    "/lovable-uploads/006c64e3-6a85-4c9a-ac54-1d2b2f601a69.png",
    "/lovable-uploads/e02defc0-4e3f-46bf-9b38-ccbd8ce23531.png",
    "/lovable-uploads/a7da1141-d0f1-484e-af6a-d6f7704d0efb.png",
    "/lovable-uploads/3eb21e4e-0f4f-42db-938e-f1e7b917cc4e.png",
    "/lovable-uploads/7400b6f6-4a58-46c3-a434-f941fcae211a.png",
    "/lovable-uploads/6d6c71e9-c427-4ea3-ba95-42f30c256d9f.png"
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
              <XCircle className="w-10 h-10 text-red-500 mr-4" />
              <h3 className="font-montserrat text-xl md:text-2xl font-bold text-red-800">
                Przed oddłużaniem z Dariuszem Wentrychem…
              </h3>
            </div>
            
            <div className="space-y-3">
              {beforeItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
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
              <Smile className="w-10 h-10 text-emerald-500 mr-4" />
              <h3 className="font-montserrat text-xl md:text-2xl font-bold text-emerald-800">
                Po oddłużeniu z Dariuszem Wentrychem…
              </h3>
            </div>
            
            <div className="space-y-3">
              {afterItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
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

        {/* Call to Action with Client Photos */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
            <div className="mb-8">
              <h3 className="font-montserrat text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                <span className="text-prestige-gold-600">15.000</span> osób mi zaufało
              </h3>
              <p className="text-slate-600 text-lg font-lato mb-8 max-w-2xl mx-auto">
                Dołącz do grona zadowolonych klientów, którzy odzyskali kontrolę nad swoim życiem finansowym
              </p>
            </div>

            {/* Client Photos in Circles */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              {clientImages.slice(0, 8).map((image, index) => (
                <div key={index} className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-prestige-gold-200 shadow-lg hover:scale-110 transition-transform duration-300">
                  <img 
                    src={image} 
                    alt={`Zadowolony klient ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

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
