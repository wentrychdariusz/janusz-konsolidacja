
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
import GuaranteeSection from '../components/GuaranteeSection';
import FloatingAvatar from '../components/FloatingAvatar';
import Footer from '../components/Footer';
import PersonalizedOfferModal from '../components/PersonalizedOfferModal';
import CalculatorNowyModal from '../components/CalculatorNowyModal';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';
import { useSuspiciousBehaviorDetection } from '../hooks/useSuspiciousBehaviorDetection';

const Index = () => {
  const { trackPageView } = useSupabaseTracking();
  const behaviorDetection = useSuspiciousBehaviorDetection('main_page');
  
  // Domyślnie używamy wersji B bez A/B testów
  const variant = 'B';
  const isLoaded = true;
  const abTestLoaded = true;
  
  const [showOfferModal, setShowOfferModal] = useState(false);

  useEffect(() => {
    console.log(`🏠 Index page: Using default variant B (no A/B test)`);
    trackPageView('glowna1_default', 'B', 'glowna1_default');
      
      // Rozpocznij analizę podejrzanych zachowań od wejścia na stronę
      console.log('🔍 Starting suspicious behavior analysis on page load');
      behaviorDetection.addSuspiciousFlag('page_loaded_initial');
      
      // Track również czy to nowy czy returning visitor
      const lastVisit = localStorage.getItem('last_index_visit');
      const now = Date.now();
      
      if (lastVisit) {
        const timeDiff = now - parseInt(lastVisit);
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
          console.log('🔄 Returning visitor after 24+ hours');
          localStorage.setItem('last_index_visit', now.toString());
        }
      } else {
        console.log('✨ First time visitor');
        localStorage.setItem('last_index_visit', now.toString());
      }

      // setShowOfferModal(true); // Wyłączone tymczasowo
  }, [trackPageView, behaviorDetection]);

  return (
    <div className="font-lato">
      <LoanAmountsBar />
      <TopHeader />
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
      
      {/* Domyślnie używamy CalculatorSectionBeta */}
      <CalculatorSectionBeta />
      
      <GuaranteeSection />
      <FloatingAvatar />
      <Footer />
      
      <PersonalizedOfferModal 
        isOpen={showOfferModal} 
        onClose={() => setShowOfferModal(false)} 
      />
    </div>
  );
};

export default Index;
