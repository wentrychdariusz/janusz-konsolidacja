
import React, { useEffect } from 'react';
import ABTestThankYou from '../components/ABTestThankYou';
import { usePageTracking } from '../hooks/usePageTracking';

const ThankYou = () => {
  const { trackConversion } = usePageTracking();
  
  useEffect(() => {
    // Track konwersję na stronie podziękowań
    trackConversion('ThankYou Page');
    
    // Google Ads conversion tracking
    if ((window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-16741438120/5yX2CKmazt0ZEKil-K4-'
      });
    }
  }, []);
  
  return <ABTestThankYou />;
};

export default ThankYou;
