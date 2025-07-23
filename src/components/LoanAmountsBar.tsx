import React from 'react';
import { Banknote } from 'lucide-react';

const LoanAmountsBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-success-600 to-success-500 text-white py-3 px-4 md:hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-2 text-center">
          {/* Kolumna 1 */}
          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-1">
              <Banknote className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">4-5k zł</span>
            </div>
            <div className="text-xs font-bold text-success-100">
              ✅ do 120k zł
            </div>
          </div>

          {/* Kolumna 2 */}
          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-1">
              <Banknote className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">5-10k zł</span>
            </div>
            <div className="text-xs font-bold text-success-100">
              ✅ 120k-250k zł
            </div>
          </div>

          {/* Kolumna 3 */}
          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-1">
              <Banknote className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">10k+ zł</span>
            </div>
            <div className="text-xs font-bold text-success-100">
              ✅ do 500k zł
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanAmountsBar;