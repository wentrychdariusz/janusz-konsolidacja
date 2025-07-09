
import React from 'react';
import { useABTest } from '../hooks/useABTest';
import { useABTestSettings } from '../hooks/useABTestSettings';
import SmsVerificationVariantA from './SmsVerificationVariantA';
import SmsVerificationVariantB from './SmsVerificationVariantB';

const ABTestSmsVerification = () => {
  const { settings } = useABTestSettings();
  
  const { variant, isLoaded, trackConversion } = useABTest({
    testName: 'sms_verification_test',
    splitRatio: 0.5,
    enabled: settings.sms_verification_enabled,
    forceVariant: settings.sms_verification_force_variant
  });

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

  // Przekaż trackConversion do komponentów
  if (variant === 'A') {
    return <SmsVerificationVariantA onConversion={trackConversion} />;
  } else {
    return <SmsVerificationVariantB onConversion={trackConversion} />;
  }
};

export default ABTestSmsVerification;
