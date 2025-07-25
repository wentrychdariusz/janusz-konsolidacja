
import React from 'react';
import { useInView } from 'react-intersection-observer';
import DebtCalculator from './DebtCalculator';

const CalculatorSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-8 leading-tight">
            SPRAWDŹ CZY MOŻEMY CI 
            <span className="text-prestige-gold-400"> POMÓC</span>
          </h2>
          <p className="text-warm-neutral-600 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            Skorzystaj z naszego kalkulatora oddłużeniowego i dowiedz się, czy możemy pomóc w Twojej sytuacji finansowej
          </p>
        </div>
        
        <div 
          ref={ref}
          className={`max-w-4xl mx-auto p-4 transition-all duration-700 ease-out cursor-pointer 
            md:hover:scale-110 
            ${inView ? 'scale-105 md:scale-100' : 'scale-95 opacity-80'}`}
        >
          <DebtCalculator />
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
