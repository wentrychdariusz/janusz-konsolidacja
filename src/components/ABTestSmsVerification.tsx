
import React from 'react';
import { useABTest } from '../hooks/useABTest';
import { useABTestSettings } from '../hooks/useABTestSettings';
import SmsVerificationVariantA from './SmsVerificationVariantA';
import SmsVerificationVariantB from './SmsVerificationVariantB';

const ABTestSmsVerification = () => {
  console.log('🚀 ABTestSmsVerification component starting...');
  
  const { settings } = useABTestSettings();
  console.log('⚙️ ABTestSettings loaded:', settings);
  
  const { variant, isLoaded, trackConversion } = useABTest({
    testName: 'sms_verification_test',
    splitRatio: 0.5,
    enabled: settings.sms_verification_enabled,
    forceVariant: settings.sms_verification_force_variant
  });

  console.log('🎯 useABTest returned:', { variant, isLoaded, trackConversion: typeof trackConversion });

  // DODAJ DEBUGOWANIE localStorage i sessionStorage
  console.log('📦 Current localStorage A/B Test data:');
  console.log('  ab_test_sms_verification_test:', localStorage.getItem('ab_test_sms_verification_test'));
  
  console.log('📦 Current session data:');
  const sessionData = localStorage.getItem('supabase_tracking_session');
  if (sessionData) {
    try {
      const parsed = JSON.parse(sessionData);
      console.log('  Session ID:', parsed.sessionId?.substring(0, 12) + '...');
      console.log('  Session timestamp:', new Date(parsed.timestamp).toLocaleTimeString());
    } catch (e) {
      console.log('  Error parsing session data');
    }
  }

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
  console.log(`🧪 Settings enabled:`, settings.sms_verification_enabled);
  console.log(`🧪 Force variant:`, settings.sms_verification_force_variant);
  console.log(`🧪 trackConversion function:`, typeof trackConversion);

  // Przekaż trackConversion do komponentów
  if (variant === 'A') {
    console.log('🧪 Rendering Variant A with trackConversion:', trackConversion);
    return <SmsVerificationVariantA onConversion={trackConversion} />;
  } else {
    console.log('🧪 Rendering Variant B with trackConversion:', trackConversion);
    return <SmsVerificationVariantB onConversion={trackConversion} />;
  }
};

export default ABTestSmsVerification;
