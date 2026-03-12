import React from 'react';
import { useNavigate } from 'react-router-dom';

const CalculatorSectionBeta = () => {
  const navigate = useNavigate();

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
        
        <div className="max-w-2xl mx-auto">
          {/* Fake input that navigates to /kalkulator-nowy on click */}
          <div 
            onClick={() => navigate('/kalkulator-nowy')}
            className="cursor-pointer bg-white rounded-2xl shadow-xl border-2 border-warm-neutral-200 hover:border-business-blue-300 hover:shadow-2xl transition-all duration-300 p-6 sm:p-8"
          >
            <div className="flex justify-center mb-4">
              <img
                src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                alt="Dariusz Wentrych"
                className="w-16 h-16 rounded-full border-3 border-business-blue-200 shadow-xl object-cover"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-navy-900 text-center mb-4">
              Ile zarabiasz na rękę?
            </h3>
            <div className="relative">
              <div className="w-full h-14 rounded-xl border-2 border-warm-neutral-300 bg-warm-neutral-50 flex items-center px-4 text-warm-neutral-400 text-lg">
                Wpisz kwotę...
              </div>
            </div>
            <p className="text-warm-neutral-500 text-sm text-center mt-4">
              🔒 Twoje dane są bezpieczne i poufne
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSectionBeta;