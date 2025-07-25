
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
import CalculatorSection from '../components/CalculatorSection';
import GuaranteeSection from '../components/GuaranteeSection';
import FloatingAvatar from '../components/FloatingAvatar';
import Footer from '../components/Footer';
import PersonalizedOfferModal from '../components/PersonalizedOfferModal';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';

const Index = () => {
  const { trackPageView } = useSupabaseTracking();
  const [showOfferModal, setShowOfferModal] = useState(false);
  
  useEffect(() => {
    console.log('🏠 Index page: Tracking page view for home page');
    trackPageView('home', undefined, 'main_site');
    
    // Track również czy to nowy czy returning visitor
    const lastVisit = localStorage.getItem('last_home_visit');
    const now = Date.now();
    
    if (lastVisit) {
      const timeDiff = now - parseInt(lastVisit);
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        console.log('🔄 Returning visitor after 24+ hours');
        localStorage.setItem('last_home_visit', now.toString());
      }
    } else {
      console.log('✨ First time visitor');
      localStorage.setItem('last_home_visit', now.toString());
    }

    // Show personalized offer modal after 5 seconds  
    const timer = setTimeout(() => {
      setShowOfferModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [trackPageView]);
  
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
      <CalculatorSection />
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
