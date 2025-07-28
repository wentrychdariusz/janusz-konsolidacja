import React, { useEffect } from 'react';
import LoanAmountsBar from '../components/LoanAmountsBar';
import TopHeader from '../components/TopHeader';
import HeroSection from '../components/HeroSection';
import CongratulationsSection from '../components/CongratulationsSection';
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
import CalculatorSection4000 from '../components/CalculatorSection4000';
import GuaranteeSection from '../components/GuaranteeSection';
import FloatingAvatar from '../components/FloatingAvatar';
import Footer from '../components/Footer';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';

const Glowna1B = () => {
  const { trackPageView } = useSupabaseTracking();
  
  useEffect(() => {
    console.log('🎉 Glowna1B page: Tracking page view for glowna1B page (new calculator test)');
    trackPageView('glowna1b', undefined, 'main_site');
    
    // Upewnij się, że strona jest na górze
    window.scrollTo(0, 0);
    
    // Track również czy to nowy czy returning visitor
    const lastVisit = localStorage.getItem('last_glowna1b_visit');
    const now = Date.now();
    
    if (lastVisit) {
      const timeDiff = now - parseInt(lastVisit);
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        console.log('🔄 Returning visitor after 24+ hours');
        localStorage.setItem('last_glowna1b_visit', now.toString());
      }
    } else {
      console.log('✨ First time visitor');
      localStorage.setItem('last_glowna1b_visit', now.toString());
    }
  }, [trackPageView]);
   
  return (
    <div className="font-lato">
      <CongratulationsSection />
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
      <CalculatorSection4000 />
      <GuaranteeSection />
      <FloatingAvatar />
      <Footer />
    </div>
  );
};

export default Glowna1B;