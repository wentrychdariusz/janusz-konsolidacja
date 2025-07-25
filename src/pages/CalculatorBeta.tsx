import React, { useEffect } from 'react';
import DebtCalculatorBeta from '@/components/DebtCalculatorBeta';
import { usePageTracking } from '@/hooks/usePageTracking';
const CalculatorBeta = () => {
  const {
    trackPageView
  } = usePageTracking();
  useEffect(() => {
    trackPageView('Calculator Beta Page');
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 relative">
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-navy-900 mb-2">
              🧮 Kalkulator Oddłużania BETA
            </h1>
            <p className="text-xl text-warm-neutral-600">
              Sprawdź, czy możemy Ci pomóc w oddłużeniu
            </p>
          </div>
          <DebtCalculatorBeta />
        </div>
      </div>
    </div>;
};
export default CalculatorBeta;