import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FunnelStep {
  stepName: string;
  variant?: string;
  testName?: string;
  metadata?: Record<string, any>;
}

// Generowanie prostego ID sesji
const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Pobieranie ID sesji (1 godzina ważności)
const getSessionId = (): string => {
  // NAJWAŻNIEJSZE: Użyj tego samego session ID co system Supabase trackingu
  const supabaseSessionKey = 'supabase_tracking_session';
  const supabaseSessionData = localStorage.getItem(supabaseSessionKey);
  
  if (supabaseSessionData) {
    try {
      const parsed = JSON.parse(supabaseSessionData);
      if (parsed.sessionId) {
        console.log('🔗 Funnel tracking using Supabase session ID:', parsed.sessionId.substring(0, 8) + '...');
        return parsed.sessionId;
      }
    } catch (e) {
      console.log('Error parsing Supabase session data');
    }
  }
  
  // Fallback - sprawdź własną sesję funnel
  const SESSION_DURATION = 60 * 60 * 1000; // 1 godzina w ms
  const now = Date.now();
  
  const sessionData = localStorage.getItem('funnel_tracking_session');
  
  if (sessionData) {
    try {
      const { sessionId, timestamp } = JSON.parse(sessionData);
      
      // Sprawdź czy sesja nie wygasła
      if (now - timestamp < SESSION_DURATION) {
        return sessionId;
      }
    } catch (error) {
      console.error('Error parsing funnel session data:', error);
    }
  }
  
  // Utwórz nową sesję
  const newSessionId = generateSessionId();
  localStorage.setItem('funnel_tracking_session', JSON.stringify({
    sessionId: newSessionId,
    timestamp: now
  }));
  
  console.log(`🎯 New funnel session created: ${newSessionId}`);
  return newSessionId;
};

// Zapisywanie kroku funnelu do Supabase
const saveFunnelStepToSupabase = async (stepName: string, variant?: string, testName?: string, metadata?: Record<string, any>) => {
  try {
    const sessionId = getSessionId();
    
    // Walidacja danych przed zapisem
    if (!stepName || stepName.trim() === '') {
      console.error('❌ Step name is required');
      return;
    }
    
    const stepData = {
      session_id: sessionId,
      step_name: stepName.trim(),
      variant: variant || null,
      test_name: testName || null,
      metadata: metadata || {}
    };
    
    console.log('🎯 Saving funnel step to Supabase:', stepData);
    
    const { error } = await supabase
      .from('user_funnel_tracking')
      .insert(stepData);
    
    if (error) {
      console.error('❌ Error saving funnel step to Supabase:', error);
      // Fallback do localStorage jeśli Supabase nie działa
      saveFunnelStepToLocalStorage(stepName, variant, testName, metadata);
    } else {
      console.log(`✅ Funnel step saved to Supabase: ${stepName}${variant ? ` (${variant})` : ''} - Session: ${sessionId}`);
    }
  } catch (error) {
    console.error('❌ Error saving funnel step to Supabase:', error);
    // Fallback do localStorage jeśli Supabase nie działa
    saveFunnelStepToLocalStorage(stepName, variant, testName, metadata);
  }
};

// Fallback do localStorage
const saveFunnelStepToLocalStorage = (stepName: string, variant?: string, testName?: string, metadata?: Record<string, any>) => {
  try {
    const sessionId = getSessionId();
    const step: FunnelStep & { timestamp: number; sessionId: string } = {
      timestamp: Date.now(),
      sessionId,
      stepName,
      variant,
      testName,
      metadata
    };
    
    const stepsKey = 'funnel_tracking_steps';
    const existingSteps = localStorage.getItem(stepsKey);
    let steps: any[] = [];
    
    if (existingSteps) {
      try {
        steps = JSON.parse(existingSteps);
      } catch (error) {
        console.error('Error parsing funnel steps:', error);
        steps = [];
      }
    }
    
    steps.push(step);
    localStorage.setItem(stepsKey, JSON.stringify(steps));
    
    console.log(`🎯 Funnel step saved to localStorage (fallback): ${stepName}${variant ? ` (${variant})` : ''}`);
  } catch (error) {
    console.error('❌ Error saving funnel step to localStorage:', error);
  }
};

// Pobieranie statystyk funnelu z Supabase
const getFunnelStatsFromSupabase = async () => {
  try {
    const { data: steps, error } = await supabase
      .from('user_funnel_tracking')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ Error getting funnel stats from Supabase:', error);
      return getFunnelStatsFromLocalStorage();
    }
    
    console.log(`🎯 Found ${steps?.length || 0} funnel steps in Supabase`);
    
    const uniqueSessions = new Set(steps?.map(s => s.session_id) || []).size;
    
    const stepsByName: Record<string, number> = {};
    const stepsByVariant: Record<string, number> = {};
    
    steps?.forEach(step => {
      // Zlicz według nazwy kroku
      stepsByName[step.step_name] = (stepsByName[step.step_name] || 0) + 1;
      
      // Zlicz według wariantu (tylko jeśli variant jest zdefiniowany)
      if (step.variant && step.variant.trim() !== '') {
        const key = `${step.step_name}_${step.variant}`;
        stepsByVariant[key] = (stepsByVariant[key] || 0) + 1;
      }
    });
    
    console.log('🎯 Funnel steps by name (Supabase):', stepsByName);
    console.log('🎯 Funnel steps by variant (Supabase):', stepsByVariant);
    
    return {
      uniqueSessions,
      totalSteps: steps?.length || 0,
      stepsByName,
      stepsByVariant,
      allSteps: steps || []
    };
  } catch (error) {
    console.error('❌ Error getting funnel stats from Supabase:', error);
    return getFunnelStatsFromLocalStorage();
  }
};

// Fallback do localStorage
const getFunnelStatsFromLocalStorage = () => {
  const stepsKey = 'funnel_tracking_steps';
  const existingSteps = localStorage.getItem(stepsKey);
  
  if (!existingSteps) {
    console.log('🎯 No funnel steps found in localStorage');
    return {
      uniqueSessions: 0,
      totalSteps: 0,
      stepsByName: {},
      stepsByVariant: {},
      allSteps: []
    };
  }
  
  try {
    const steps: any[] = JSON.parse(existingSteps);
    console.log(`🎯 Found ${steps.length} funnel steps in localStorage (fallback)`);
    
    const uniqueSessions = new Set(steps.map(s => s.sessionId)).size;
    
    const stepsByName: Record<string, number> = {};
    const stepsByVariant: Record<string, number> = {};
    
    steps.forEach(step => {
      stepsByName[step.stepName] = (stepsByName[step.stepName] || 0) + 1;
      
      if (step.variant) {
        const key = `${step.stepName}_${step.variant}`;
        stepsByVariant[key] = (stepsByVariant[key] || 0) + 1;
      }
    });
    
    return {
      uniqueSessions,
      totalSteps: steps.length,
      stepsByName,
      stepsByVariant,
      allSteps: steps
    };
  } catch (error) {
    console.error('❌ Error getting funnel stats from localStorage:', error);
    return {
      uniqueSessions: 0,
      totalSteps: 0,
      stepsByName: {},
      stepsByVariant: {},
      allSteps: []
    };
  }
};

// Hook do śledzenia funnelu
export const useFunnelTracking = () => {
  const trackFunnelStep = (stepName: string, variant?: string, testName?: string, metadata?: Record<string, any>) => {
    // Walidacja przed śledzeniem
    if (!stepName || stepName.trim() === '') {
      console.error('❌ Cannot track funnel step: stepName is required');
      return;
    }
    
    console.log(`🎯 Tracking funnel step: "${stepName}" with variant: "${variant}", test: "${testName}"`);
    saveFunnelStepToSupabase(stepName.trim(), variant?.trim(), testName?.trim(), metadata);
  };
  
  const getFunnelStats = async () => {
    console.log('🎯 Getting funnel stats from Supabase...');
    return await getFunnelStatsFromSupabase();
  };
  
  const clearFunnelStats = async () => {
    console.log('🗑️ Clearing all funnel stats from Supabase and localStorage...');
    try {
      // Wyczyść z Supabase - usuń wszystkie kroki
      const { error: stepsError } = await supabase
        .from('user_funnel_tracking')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Usuń wszystkie
      
      if (stepsError) {
        console.error('❌ Error clearing Supabase funnel steps:', stepsError);
      } else {
        console.log('✅ Supabase funnel steps cleared');
      }
      
      // Wyczyść localStorage
      localStorage.removeItem('funnel_tracking_steps');
      localStorage.removeItem('funnel_tracking_session');
      console.log('✅ LocalStorage funnel tracking data cleared');
    } catch (error) {
      console.error('❌ Error clearing funnel stats:', error);
    }
  };
  
  return {
    trackFunnelStep,
    getFunnelStats,
    clearFunnelStats
  };
};