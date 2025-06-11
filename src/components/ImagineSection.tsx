
import React from 'react';
import { Heart, Home, Plane, ShoppingBag } from 'lucide-react';

const ImagineSection = () => {
  const benefits = [
    {
      icon: Home,
      title: "Własne miejsce",
      description: "Zarabiaj na wymarzony dom lub mieszkanie"
    },
    {
      icon: Plane,
      title: "Podróże marzeń",
      description: "Odkrywaj świat bez martwienia się o budżet"
    },
    {
      icon: ShoppingBag,
      title: "Finansowa swoboda",
      description: "Kup to, na co masz ochotę bez zastanawiania się"
    },
    {
      icon: Heart,
      title: "Spokój dla rodziny",
      description: "Zapewnij bliskim bezpieczeństwo finansowe"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-black via-navy-900 to-business-blue-800 relative py-16 md:py-24 overflow-hidden">
      {/* Background mosaic with Dariusz photos */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-business-blue-900/75 via-navy-900/70 to-business-blue-700/75 z-10"></div>
        
        {/* Photo mosaic grid - expanded and mixed */}
        <div className="absolute inset-0 grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-1 p-2 opacity-50">
          {/* Row 1 */}
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          
          {/* Row 2 */}
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          
          {/* Row 3 */}
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          
          {/* Row 4 */}
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          
          {/* Row 5 */}
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          
          {/* Row 6 */}
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/8bbcb19e-bb1a-4285-b18a-121c8bf0c5bc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/ce712082-8c47-4d6f-bb24-515aa5736ef7.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/1155d47b-be7e-4597-a317-e8d3f624effc.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/625db739-f793-41f1-bf7a-c329c72cf5d6.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/14a04951-9c7c-4bd4-93b1-89a1bd4564ed.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/7963235c-2a13-4cde-8100-43ced32bd3c5.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
          <img src="/lovable-uploads/24d5d0f4-76f1-4575-841f-89f9057c346f.png" alt="" className="w-full h-14 md:h-18 object-cover rounded" />
        </div>
      </div>
      
      <div className="relative z-20 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6">
            <span className="text-prestige-gold-400">Mamy największe zaufanie klientów</span>
          </h2>
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto font-lato mb-8">
            Klienci nas kochają!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-prestige-gold-200/30 rounded-xl p-6 text-center hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-navy-900" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 font-montserrat">{benefit.title}</h3>
              <p className="text-warm-neutral-300 text-sm font-lato">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImagineSection;
