import React, { useEffect } from 'react';
import DebtCalculatorBeta from '@/components/DebtCalculatorBeta';
import { usePageTracking } from '@/hooks/usePageTracking';

const CalculatorBeta = () => {
  const { trackPageView } = usePageTracking();

  useEffect(() => {
    trackPageView('Calculator Beta Page');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 relative">
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-warm-neutral-200 shadow-lg p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-2xl font-bold text-navy-900 pb-2">
                      Kalkulator Oddłużania BETA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-lg text-prestige-gold-600 font-semibold pb-1">
                      W 30 sekund powiemy ci czy możemy pomóc
                    </td>
                  </tr>
                  <tr>
                    <td className="text-warm-neutral-600">
                      Wersja testowa z rozszerzonym formularzem
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <DebtCalculatorBeta />
        </div>
      </div>
    </div>
  );
};

export default CalculatorBeta;