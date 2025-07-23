import React from 'react';
import { Banknote } from 'lucide-react';

const LoanAmountsBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-business-blue-600 to-navy-800 text-white py-3 px-4 md:hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-2 text-center">
          {/* Kolumna 1 */}
          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <div className="text-xs font-medium mb-1 text-blue-100">
              Twoja pensja:
            </div>
            <div className="text-xs font-bold text-white mb-1">
              4-5 tys zł
            </div>
            <div className="text-xs font-medium text-prestige-gold-300">
              Możesz wnioskować:
            </div>
            <div className="text-xs font-bold text-prestige-gold-200">
              do 120 tys zł
            </div>
          </div>

          {/* Kolumna 2 */}
          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <div className="text-xs font-medium mb-1 text-blue-100">
              Twoja pensja:
            </div>
            <div className="text-xs font-bold text-white mb-1">
              5-10 tys zł
            </div>
            <div className="text-xs font-medium text-prestige-gold-300">
              Możesz wnioskować:
            </div>
            <div className="text-xs font-bold text-prestige-gold-200">
              120-250 tys zł
            </div>
          </div>

          {/* Kolumna 3 */}
          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <div className="text-xs font-medium mb-1 text-blue-100">
              Twoja pensja:
            </div>
            <div className="text-xs font-bold text-white mb-1">
              10+ tys zł
            </div>
            <div className="text-xs font-medium text-prestige-gold-300">
              Możesz wnioskować:
            </div>
            <div className="text-xs font-bold text-prestige-gold-200">
              do 500 tys zł
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanAmountsBar;