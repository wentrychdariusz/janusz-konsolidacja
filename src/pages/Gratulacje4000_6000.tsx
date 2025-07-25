import React, { useEffect, useState } from 'react';
import LoanAmountsBar from '../components/LoanAmountsBar';
import TopHeader from '../components/TopHeader';
import HeroSection from '../components/HeroSection';
import ImagineSection from '../components/ImagineSection';
import VideoSection from '../components/VideoSection';
import DariuszLetterSection from '../components/DariuszLetterSection';
import MentorSection from '../components/MentorSection';
import BeforeAfterSection from '../components/BeforeAfterSection';
import ClientSection from '../components/ClientSection';
import TrustedClientsSection from '../components/TrustedClientsSection';
import HeroesSection from '../components/HeroesSection';
import BookSection from '../components/BookSection';
import TeamSection from '../components/TeamSection';
import CalculatorSectionBeta from '../components/CalculatorSectionBeta';
import GuaranteeSection from '../components/GuaranteeSection';
import FloatingAvatar from '../components/FloatingAvatar';
import Footer from '../components/Footer';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';

const Gratulacje4000_6000 = () => {
  const { trackPageView } = useSupabaseTracking();
  
  useEffect(() => {
    console.log('🎉 Gratulacje4000_6000 page: Tracking page view');
    trackPageView('gratulacje_4000_6000', undefined, 'gratulacje_page');
    
    // Track visit for analytics
    const now = Date.now();
    localStorage.setItem('last_gratulacje_visit', now.toString());
  }, [trackPageView]);

  // Komponenty gratulacji na górze strony
  const GratulacjeHeader = () => (
    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-8 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          🎉 GRATULACJE! 🎉
        </h1>
        <p className="text-xl sm:text-2xl mb-2">
          Twoje zarobki 4000-6000 zł dają świetne możliwości oddłużenia!
        </p>
        <div className="text-lg sm:text-xl space-y-2">
          <p>✅ Możemy zmniejszyć Twoje raty</p>
          <p>✅ Spłacić chwilówki</p>
          <p>✅ Zrobić kredyt w banku</p>
        </div>
        <div className="mt-6 bg-white/20 inline-block px-6 py-4 rounded-lg">
          <p className="text-xl font-bold">
            💰 To może być nawet 1200 zł miesięcznie więcej w Twojej kieszeni!
          </p>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="font-lato">
      <LoanAmountsBar />
      <TopHeader />
      <GratulacjeHeader />
      <HeroSection />
      <ImagineSection />
      <VideoSection />
      <DariuszLetterSection />
      <MentorSection />
      <BeforeAfterSection />
      <ClientSection />
      <TrustedClientsSection />
      <HeroesSection />
      <BookSection />
      <TeamSection />
      <CalculatorSectionBeta />
      <GuaranteeSection />
      <FloatingAvatar />
      <Footer />
    </div>
  );
};

export default Gratulacje4000_6000;