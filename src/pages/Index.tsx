
import React, { useEffect, useState } from 'react';
import { useABTest } from '../hooks/useABTest';
import { useABTestSettings } from '../hooks/useABTestSettings';
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
import CalculatorSection from '../components/CalculatorSection';
import CalculatorSectionBeta from '../components/CalculatorSectionBeta';
import GuaranteeSection from '../components/GuaranteeSection';
import FloatingAvatar from '../components/FloatingAvatar';
import Footer from '../components/Footer';
import PersonalizedOfferModal from '../components/PersonalizedOfferModal';
import AgentNotifications from '../components/AgentNotifications';
import MakeWebhookConfig from '../components/MakeWebhookConfig';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';
import { useSuspiciousBehaviorDetection } from '../hooks/useSuspiciousBehaviorDetection';

const Index = () => {
  const { trackPageView } = useSupabaseTracking();
  const behaviorDetection = useSuspiciousBehaviorDetection('main_page');
  const { settings, isLoaded } = useABTestSettings();
  const { variant, isLoaded: abTestLoaded } = useABTest({
    testName: 'glowna1_calculator',
    enabled: settings.glowna1_enabled ?? true,
    forceVariant: settings.glowna1_force_variant,
    splitRatio: 0.5
  });
  
  const [showOfferModal, setShowOfferModal] = useState(false);

  useEffect(() => {
    if (isLoaded && abTestLoaded) {
      console.log(`🏠 Index page: Tracking page view for variant ${variant}`);
      trackPageView('glowna1_calculator', variant, 'glowna1_calculator');
      
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

      // Show personalized offer modal immediately
      setShowOfferModal(true);
    }
  }, [isLoaded, abTestLoaded, variant, trackPageView, behaviorDetection]);

  // Czekaj aż oba hooki się załadują
  if (!isLoaded || !abTestLoaded) {
    return <div>Loading...</div>;
  }

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
      
      {/* A/B Test: Różne kalkulatory */}
      {variant === 'A' ? (
        <CalculatorSection />
      ) : (
        <CalculatorSectionBeta />
      )}
      
      <GuaranteeSection />
      <FloatingAvatar />
      <Footer />
      
      <PersonalizedOfferModal 
        isOpen={showOfferModal} 
        onClose={() => setShowOfferModal(false)} 
      />
      
      {/* Panel Agenta - prawy dolny róg */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        <MakeWebhookConfig />
        <AgentNotifications />
      </div>
    </div>
  );
};

export default Index;
