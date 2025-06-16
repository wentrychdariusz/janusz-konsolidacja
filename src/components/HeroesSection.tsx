
import React from 'react';

const HeroesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 lg:hidden">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Poznaj moich
            </span>
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              {" "}bohaterów!
            </span>
          </h2>
          
          <p className="text-blue-200 text-lg md:text-xl font-lato max-w-4xl mx-auto mb-8">
            Ludzi, którzy wyszli z zadłużenia i odzyskali finansową stabilność.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-12">
          <div className="max-w-full mx-auto">
            <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
              <iframe
                src="https://fast.wistia.net/embed/iframe/izkrrw6teo?videoFoam=true&wmode=opaque"
                title="Historia Pana Krzysztofa"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                style={{border: 'none'}}
              />
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-8">
          <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-center text-white mb-6">
            HISTORIA PANA KRZYSZTOFA
          </h3>
          
          {/* Before/After Grid */}
          <div className="space-y-6">
            {/* Before */}
            <div className="bg-gradient-to-r from-red-600/30 via-red-500/25 to-red-700/30 rounded-2xl p-4 border border-red-400/50">
              <h4 className="text-red-300 text-lg font-bold font-montserrat mb-3 text-center">
                PRZED WSPÓŁPRACĄ
              </h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 text-lg">❌</span>
                  <span className="font-lato">Problem z bieżącą spłatą zobowiązań kredytowych</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 text-lg">❌</span>
                  <span className="font-lato">Egzekucja komornicza</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 text-lg">❌</span>
                  <span className="font-lato">Zajęcie pensji</span>
                </li>
              </ul>
            </div>
            
            {/* After */}
            <div className="bg-gradient-to-r from-emerald-500/30 via-green-500/25 to-lime-500/30 rounded-2xl p-4 border border-emerald-400/50">
              <h4 className="text-emerald-300 text-lg font-bold font-montserrat mb-3 text-center">
                PO WSPÓŁPRACY ZE MNĄ
              </h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 text-lg">✅</span>
                  <span className="font-lato">Pan Krzysztof uwolnił się od komornika</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 text-lg">✅</span>
                  <span className="font-lato">Pan Krzysztof płaci jedną ratę kredytu w wysokości</span>
                </li>
                <li className="text-center mt-3">
                  <span className="text-2xl md:text-3xl font-bold text-emerald-300 font-montserrat">600 ZŁ</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Added section after PO WSPÓŁPRACY ZE MNĄ */}
          <div className="mt-6 text-center">
            <p className="text-white text-base md:text-lg font-lato leading-relaxed">
              <span className="font-bold text-yellow-300">Pan Krzysztof trafił do nas w odpowiednim momencie.</span>
              <br />
              Gdyby zwlekał z podjęciem działań, <span className="text-red-300 font-bold">POMOC NIE BYŁABY MOŻLIWA</span>
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/15 to-red-500/20 rounded-2xl p-6 border border-yellow-400/50">
          <p className="text-white text-lg md:text-xl font-lato text-center leading-relaxed">
            <span className="font-bold text-yellow-300">Dołącz do tysięcy zadowolonych klientów i raz na zawsze pozbądź się długów!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroesSection;
