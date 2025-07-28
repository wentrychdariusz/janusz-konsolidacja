import React, { useEffect } from 'react';
import LoanAmountsBar from '../components/LoanAmountsBar';
import TopHeader from '../components/TopHeader';
import CongratulationsSection from '../components/CongratulationsSection';
import HeroSectionA from '../components/HeroSectionA';
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
import CalculatorSectionA from '../components/CalculatorSectionA';
import GuaranteeSection from '../components/GuaranteeSection';
import FloatingAvatar from '../components/FloatingAvatar';
import Footer from '../components/Footer';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';
import { useSuspiciousBehaviorDetection } from '../hooks/useSuspiciousBehaviorDetection';

const Glowna1A = () => {
  const { trackPageView } = useSupabaseTracking();
  const behaviorDetection = useSuspiciousBehaviorDetection('glowna1a_page');
  
  useEffect(() => {
    console.log('🎉 Glowna1A page: Tracking page view for glowna1A page (old calculator test)');
    trackPageView('glowna1a', 'A', 'glowna1_calculator');
    
    // Sprawdź czy użytkownik przyszedł z głównej strony z danymi w URL
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    
    if (encodedData) {
      try {
        const decodedData = atob(encodedData);
        const [originalIncome, originalPayday, originalBank] = decodedData.split(',').map(Number);
        
        // Zapisz oryginalne dane z głównej strony do localStorage
        localStorage.setItem('original_main_data', JSON.stringify({
          income: originalIncome,
          paydayDebt: originalPayday,
          bankDebt: originalBank,
          timestamp: Date.now()
        }));
        
        console.log('📊 Saved original data from main page:', { originalIncome, originalPayday, originalBank });
        behaviorDetection.addSuspiciousFlag('came_from_main_with_data');
      } catch (error) {
        console.error('❌ Error decoding data from URL:', error);
        behaviorDetection.addSuspiciousFlag('invalid_url_data');
      }
    }
    
    // Track również czy to nowy czy returning visitor
    const lastVisit = localStorage.getItem('last_glowna1a_visit');
    const now = Date.now();
    
    if (lastVisit) {
      const timeDiff = now - parseInt(lastVisit);
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        console.log('🔄 Returning visitor after 24+ hours');
        localStorage.setItem('last_glowna1a_visit', now.toString());
      }
    } else {
      console.log('✨ First time visitor');
      localStorage.setItem('last_glowna1a_visit', now.toString());
    }
  }, [trackPageView, behaviorDetection]);
   
  return (
    <div className="font-lato">
      <LoanAmountsBar />
      <TopHeader />
      <CongratulationsSection />
      <HeroSectionA />
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
      <CalculatorSectionA />
      <GuaranteeSection />
      <FloatingAvatar />
      <Footer />
    </div>
  );
};

export default Glowna1A;