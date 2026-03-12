import React, { useState } from 'react';
import { X } from 'lucide-react';
import NewCalculatorEmbed from './NewCalculatorEmbed';

const CalculatorSectionBeta = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
            <div 
              onClick={() => setIsModalOpen(true)}
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

      {/* Modal z nowym kalkulatorem */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden relative flex flex-col">
            <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 md:w-10 md:h-10 bg-warm-neutral-100 hover:bg-warm-neutral-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-warm-neutral-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <NewCalculatorEmbed />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalculatorSectionBeta;
