import React from 'react';
import { useABTest } from '../hooks/useABTest';
import { useABTestSettings } from '../hooks/useABTestSettings';
import ContactFormVariantA from './ContactFormVariantA';
import ContactFormVariantB from './ContactFormVariantB';

const ABTestContactForm = () => {
  console.log('🚀 ABTestContactForm component starting...');
  
  const { settings } = useABTestSettings();
  console.log('⚙️ ABTestSettings loaded:', settings);
  
  const { variant, isLoaded, trackConversion } = useABTest({
    testName: 'contact_form_test',
    splitRatio: 0.5,
    enabled: settings.contact_form_enabled,
    forceVariant: settings.contact_form_force_variant
  });

  console.log('🎯 useABTest returned:', { variant, isLoaded, trackConversion: typeof trackConversion });

  // DODAJ DEBUGOWANIE localStorage i sessionStorage
  console.log('📦 Current localStorage A/B Test data:');
  console.log('  ab_test_contact_form_test:', localStorage.getItem('ab_test_contact_form_test'));
  
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

  console.log(`🧪 A/B Test Contact Form: Showing variant ${variant}`);
  console.log(`🧪 Settings enabled:`, settings.contact_form_enabled);
  console.log(`🧪 Force variant:`, settings.contact_form_force_variant);
  console.log(`🧪 trackConversion function:`, typeof trackConversion);

  // Przekaż trackConversion do komponentów
  if (variant === 'A') {
    console.log('🧪 Rendering Contact Form Variant A with trackConversion:', trackConversion);
    return <ContactFormVariantA onConversion={trackConversion} />;
  } else {
    console.log('🧪 Rendering Contact Form Variant B with trackConversion:', trackConversion);
    return <ContactFormVariantB onConversion={trackConversion} />;
  }
};

export default ABTestContactForm;