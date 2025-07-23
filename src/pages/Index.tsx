
import React, { useEffect } from 'react';
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
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';

const Index = () => {
  const { trackPageView } = useSupabaseTracking();
  
  useEffect(() => {
    trackPageView('home', undefined, 'main_site');
  }, []);
  
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
    </div>
  );
};

export default Index;
