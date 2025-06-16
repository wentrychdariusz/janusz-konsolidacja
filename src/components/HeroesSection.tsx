
import React from 'react';

const HeroesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900">
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Poznaj moich
            </span>
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              {" "}bohaterów!
            </span>
          </h2>
          
          <p className="text-blue-200 text-xl md:text-2xl font-lato max-w-4xl mx-auto mb-12">
            Ludzi, którzy wyszli z zadłużenia i odzyskali finansową stabilność.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div 
              className="wistia_responsive_padding" 
              style={{padding:'177.78% 0 0 0', position:'relative'}}
              dangerouslySetInnerHTML={{
                __html: `
                  <script src="https://fast.wistia.com/embed/medias/izkrrw6teo.jsonp" async></script>
                  <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
                  <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
                    <div class="wistia_embed wistia_async_izkrrw6teo seo=false videoFoam=true" style="height:100%;position:relative;width:100%">
                      <div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;">
                        <img src="https://fast.wistia.com/embed/medias/izkrrw6teo/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" />
                      </div>
                    </div>
                  </div>
                `
              }}
            />
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12">
          <h3 className="font-montserrat text-3xl md:text-4xl font-bold text-center text-white mb-8">
            HISTORIA PANA KRZYSZTOFA
          </h3>
          
          {/* Before/After Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-gradient-to-r from-red-600/30 via-red-500/25 to-red-700/30 rounded-2xl p-6 border border-red-400/50">
              <h4 className="text-red-300 text-xl font-bold font-montserrat mb-4 text-center">
                PRZED WSPÓŁPRACĄ
              </h4>
              <ul className="space-y-3 text-white">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">❌</span>
                  <span className="font-lato">Problem z bieżącą spłatą zobowiązań kredytowych</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">❌</span>
                  <span className="font-lato">Egzekucja komornicza</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">❌</span>
                  <span className="font-lato">Zajęcie pensji</span>
                </li>
              </ul>
            </div>
            
            {/* After */}
            <div className="bg-gradient-to-r from-emerald-500/30 via-green-500/25 to-lime-500/30 rounded-2xl p-6 border border-emerald-400/50">
              <h4 className="text-emerald-300 text-xl font-bold font-montserrat mb-4 text-center">
                PO WSPÓŁPRACY ZE MNĄ
              </h4>
              <ul className="space-y-3 text-white">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✅</span>
                  <span className="font-lato">Pan Krzysztof uwolnił się od komornika</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✅</span>
                  <span className="font-lato">Pan Krzysztof płaci jedną ratę kredytu w wysokości</span>
                </li>
                <li className="text-center mt-4">
                  <span className="text-4xl font-bold text-emerald-300 font-montserrat">600 ZŁ</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Added section after PO WSPÓŁPRACY ZE MNĄ */}
          <div className="mt-8 text-center">
            <p className="text-white text-lg md:text-xl font-lato leading-relaxed">
              <span className="font-bold text-yellow-300">Pan Krzysztof trafił do nas w odpowiednim momencie.</span>
              <br />
              Gdyby zwlekał z podjęciem działań, <span className="text-red-300 font-bold">POMOC NIE BYŁABY MOŻLIWA</span>
            </p>
          </div>
        </div>

        {/* Important Message - moved and modified */}
        <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/15 to-red-500/20 rounded-2xl p-8 border border-yellow-400/50 mb-12">
          <p className="text-white text-lg md:text-xl font-lato text-center leading-relaxed">
            <span className="font-bold text-yellow-300">Dołącz do tysięcy zadowolonych klientów i raz na zawsze pozbądź się długów!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroesSection;
