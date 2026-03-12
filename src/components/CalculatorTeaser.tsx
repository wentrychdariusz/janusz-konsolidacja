import React from 'react';
import { Calculator, Shield, Users } from 'lucide-react';

interface CalculatorTeaserProps {
  onOpen: () => void;
}

const CalculatorTeaser = ({ onOpen }: CalculatorTeaserProps) => {
  return (
    <div 
      onClick={onOpen}
      className="cursor-pointer group"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-warm-neutral-200 overflow-hidden transition-all duration-300 group-hover:shadow-3xl group-hover:scale-[1.02]">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 to-business-blue-800 p-4 md:p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calculator className="w-5 h-5 md:w-6 md:h-6 text-prestige-gold-400" />
            <h3 className="font-montserrat font-bold text-lg md:text-xl text-white">
              Kalkulator Oddłużenia
            </h3>
          </div>
          <p className="text-warm-neutral-300 text-sm md:text-base">
            Sprawdź czy możemy Ci pomóc
          </p>
        </div>

        {/* Fake form fields */}
        <div className="p-4 md:p-6 space-y-4">
          {/* Income field */}
          <div>
            <label className="block text-sm font-semibold text-navy-900 mb-2">
              💵 Ile zarabiasz na rękę?
            </label>
            <div className="w-full h-12 md:h-14 bg-warm-neutral-50 border-2 border-warm-neutral-200 rounded-xl flex items-center px-4 text-warm-neutral-400 text-base md:text-lg group-hover:border-business-blue-300 transition-colors">
              Kliknij aby rozpocząć...
            </div>
          </div>

          {/* Debt field */}
          <div>
            <label className="block text-sm font-semibold text-navy-900 mb-2">
              💰 Ile masz do spłaty?
            </label>
            <div className="w-full h-12 md:h-14 bg-warm-neutral-50 border-2 border-warm-neutral-200 rounded-xl flex items-center px-4 text-warm-neutral-400 text-base md:text-lg group-hover:border-business-blue-300 transition-colors">
              Kliknij aby rozpocząć...
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="w-full py-4 md:py-5 bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 text-navy-900 font-montserrat font-black text-lg md:text-xl rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 uppercase tracking-wide"
          >
            🔍 Sprawdź za darmo
          </button>
        </div>

        {/* Trust badges */}
        <div className="px-4 md:px-6 pb-4 md:pb-6 flex items-center justify-center gap-4 text-warm-neutral-500 text-xs md:text-sm">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Bezpłatnie</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>15 000+ klientów</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorTeaser;
