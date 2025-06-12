
import React from 'react';
import TopHeader from '../components/TopHeader';
import HeroSection from '../components/HeroSection';
import ImagineSection from '../components/ImagineSection';
import MentorSection from '../components/MentorSection';
import ClientSection from '../components/ClientSection';
import FloatingAvatar from '../components/FloatingAvatar';

const Index = () => {
  return (
    <div className="font-lato">
      <TopHeader />
      <HeroSection />
      <ImagineSection />
      <MentorSection />
      <ClientSection />
      <FloatingAvatar />
    </div>
  );
};

export default Index;
