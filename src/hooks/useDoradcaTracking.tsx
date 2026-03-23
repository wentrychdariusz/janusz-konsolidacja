import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

const getSessionId = (): string => {
  let sid = sessionStorage.getItem('doradca_session_id');
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem('doradca_session_id', sid);
  }
  return sid;
};

const trackEvent = async (eventName: string, metadata?: Record<string, string>) => {
  const sessionId = getSessionId();
  try {
    await supabase.from('ab_test_events').insert({
      session_id: sessionId,
      event_name: eventName,
      test_name: 'doradca_chat',
      variant: 'doradca',
      page_url: window.location.href,
      referrer_url: document.referrer || null,
    });
    console.log(`📊 [Doradca] Tracked: ${eventName}`, metadata);
  } catch (e) {
    console.error('Tracking error:', e);
  }
};

export const useDoradcaTracking = () => {
  const pageViewTracked = useRef(false);

  useEffect(() => {
    if (!pageViewTracked.current) {
      pageViewTracked.current = true;
      trackEvent('doradca_page_view');
    }
  }, []);

  const trackQuestion = (questionText: string, questionNumber: number) => {
    trackEvent(`doradca_question_${questionNumber}`);
    if (questionNumber === 1) trackEvent('doradca_first_question');
  };

  const trackSuggestionClick = (suggestion: string) => {
    trackEvent('doradca_suggestion_click');
  };

  const trackCtaClick = () => {
    trackEvent('doradca_cta_click');
  };

  const trackCalculatorShown = () => {
    trackEvent('doradca_calculator_shown');
  };

  const trackCalculatorStep = (step: number, value: string) => {
    trackEvent(`doradca_calculator_step_${step}`);
  };

  const trackCalculatorComplete = () => {
    trackEvent('doradca_calculator_complete');
  };

  return {
    trackQuestion,
    trackSuggestionClick,
    trackCtaClick,
    trackCalculatorShown,
    trackCalculatorStep,
    trackCalculatorComplete,
  };
};
