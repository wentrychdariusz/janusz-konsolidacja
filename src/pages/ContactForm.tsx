import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ABTestContactForm from '../components/ABTestContactForm';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';
import { useFunnelTracking } from '../hooks/useFunnelTracking';

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { trackPageView, trackEvent } = useSupabaseTracking();
  const { trackFunnelStep } = useFunnelTracking();
  
  // Track page view dla strony /kontakt
  useEffect(() => {
    console.log('📄 ContactForm: Tracking page view for /kontakt');
    trackPageView('kontakt', undefined, 'main_site');
    trackFunnelStep('kontakt_page_view', undefined, 'debt_consolidation_funnel');
    
    // Sprawdź czy użytkownik przyszedł z kalkulatora
    const income = searchParams.get('income');
    const result = searchParams.get('result');
    
    if (income && result) {
      console.log('🧮 User came from calculator with result:', result);
      trackEvent('calculator_to_kontakt_redirect', result, 'debt_calculator');
      trackFunnelStep('calculator_to_kontakt', result, 'debt_consolidation_funnel', {
        income: income,
        calculatorResult: result
      });
    }
  }, [trackPageView, trackEvent, trackFunnelStep, searchParams]);
  
  // Zawsze pokaż formularz kontaktowy, niezależnie od parametrów
  return <ABTestContactForm />;
};

export default ContactForm;