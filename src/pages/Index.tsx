
import React from 'react';
import TopHeader from '../components/TopHeader';
import HeroSection from '../components/HeroSection';
import ImagineSection from '../components/ImagineSection';
import MentorSection from '../components/MentorSection';
import Testimonials from '../components/Testimonials';

const Index = () => {
  return (
    <div className="font-lato">
      <TopHeader />
      <HeroSection />
      <ImagineSection />
      <MentorSection />
      <Testimonials />
    </div>
  );
};

export default Index;
