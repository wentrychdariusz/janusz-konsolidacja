
import React from 'react';
import TopHeader from '../components/TopHeader';
import HeroSection from '../components/HeroSection';
import ImagineSection from '../components/ImagineSection';
import MentorSection from '../components/MentorSection';
import BeforeAfterSection from '../components/BeforeAfterSection';
import ClientSection from '../components/ClientSection';
import TrustedClientsSection from '../components/TrustedClientsSection';
import FloatingAvatar from '../components/FloatingAvatar';

const Index = () => {
  return (
    <div className="font-lato">
      <TopHeader />
      <HeroSection />
      <ImagineSection />
      <MentorSection />
      <BeforeAfterSection />
      <ClientSection />
      <TrustedClientsSection />
      <FloatingAvatar />
    </div>
  );
};

export default Index;
