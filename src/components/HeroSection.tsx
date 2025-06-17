
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-navy-900 to-navy-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Dariusz Wentrych
        </h1>
        <p className="text-xl mb-8">
          Nr 1 w oddłużaniu osób fizycznych
        </p>
        <button className="bg-prestige-gold-500 text-navy-900 px-8 py-4 rounded-full font-bold hover:bg-prestige-gold-600 transition-colors">
          Bezpłatna konsultacja
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
