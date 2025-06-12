
import React from 'react';
import TopHeader from '../components/TopHeader';
import HeroSection from '../components/HeroSection';
import ImagineSection from '../components/ImagineSection';
import MentorSection from '../components/MentorSection';
import ClientSection from '../components/ClientSection';

const Index = () => {
  return (
    <div className="font-lato">
      <TopHeader />
      <HeroSection />
      <ImagineSection />
      <MentorSection />
      <ClientSection />
    </div>
  );
};

export default Index;
