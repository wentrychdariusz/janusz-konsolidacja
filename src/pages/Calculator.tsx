
import React from 'react';
import TopHeader from '../components/TopHeader';
import DebtCalculator from '../components/DebtCalculator';

const Calculator = () => {
  return (
    <div className="font-lato min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50">
      <TopHeader />
      <div className="pt-20 pb-16">
        <DebtCalculator />
      </div>
    </div>
  );
};

export default Calculator;
