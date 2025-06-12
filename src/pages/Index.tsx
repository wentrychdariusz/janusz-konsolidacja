
import React from 'react';
import TopHeader from '../components/TopHeader';
import HeroSection from '../components/HeroSection';
import ImagineSection from '../components/ImagineSection';
import MentorSection from '../components/MentorSection';
import Testimonials from '../components/Testimonials';
import DebtCalculator from '../components/DebtCalculator';

const Index = () => {
  return (
    <div className="font-lato">
      <TopHeader />
      <HeroSection />
      <ImagineSection />
      <MentorSection />
      
      {/* Sekcja kalkulatora */}
      <section className="py-16 bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Sprawdź swoją sytuację oddłużeniową
          </h2>
          <p className="text-xl text-warm-neutral-600 max-w-3xl mx-auto">
            Skorzystaj z naszego kalkulatora, aby dowiedzieć się, czy możemy Ci pomóc w konsolidacji długów
          </p>
        </div>
        <DebtCalculator />
      </section>
      
      <Testimonials />
    </div>
  );
};

export default Index;
