
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const CalculatorSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-8 leading-tight">
            SPRAWDŹ CZY MOŻEMY CI 
            <span className="text-prestige-gold-400"> POMÓC</span>
          </h2>
          <p className="text-warm-neutral-600 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-12">
            Skorzystaj z naszego kalkulatora oddłużeniowego i dowiedz się, czy możemy pomóc w Twojej sytuacji finansowej
          </p>
          
          <button
            onClick={() => navigate('/kontakt')}
            className="bg-gradient-to-r from-prestige-gold-500 to-prestige-gold-400 hover:from-prestige-gold-600 hover:to-prestige-gold-500 text-navy-900 font-bold py-8 px-12 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-2xl flex items-center justify-center gap-4 mx-auto max-w-md"
          >
            <Calculator className="w-8 h-8" />
            Wypełnij kalkulator oddłużeniowy
          </button>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
