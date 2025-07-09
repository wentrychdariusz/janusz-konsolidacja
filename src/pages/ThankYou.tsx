
import React, { useEffect } from 'react';
import ABTestThankYou from '../components/ABTestThankYou';
import { usePageTracking } from '../hooks/usePageTracking';

const ThankYou = () => {
  const { trackConversion } = usePageTracking();
  
  useEffect(() => {
    // Track konwersję na stronie podziękowań
    trackConversion('ThankYou Page');
  }, []);
  
  return <ABTestThankYou />;
};

export default ThankYou;
