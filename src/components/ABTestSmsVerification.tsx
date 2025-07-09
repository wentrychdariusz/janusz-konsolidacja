
import React from 'react';
import { useABTest } from '../hooks/useABTest';
import SmsVerificationVariantA from './SmsVerificationVariantA';
import SmsVerificationVariantB from './SmsVerificationVariantB';

const ABTestSmsVerification = () => {
  const { variant, isLoaded, trackConversion } = useABTest({
    testName: 'sms_verification_test',
    splitRatio: 0.5,
    enabled: true
  });

  // Dodaj funkcję trackConversion do kontekstu aby komponenty mogły jej używać
  React.useEffect(() => {
    // Przekaż funkcję trackConversion do komponentów
    const originalTrackConversion = trackConversion;
    
    return () => {
      // Cleanup jeśli potrzebny
    };
  }, [trackConversion]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-business-blue-600 mx-auto mb-4"></div>
          <p className="text-warm-neutral-600">Ładowanie...</p>
        </div>
      </div>
    );
  }

  console.log(`🧪 A/B Test SMS Verification: Showing variant ${variant}`);

  // Przekaż trackConversion do komponentów przez props lub context
  if (variant === 'A') {
    return <SmsVerificationVariantA />;
  } else {
    return <SmsVerificationVariantB />;
  }
};

export default ABTestSmsVerification;
