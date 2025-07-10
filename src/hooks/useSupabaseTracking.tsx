import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TrackingEvent {
  timestamp: number;
  sessionId: string;
  event: string;
  variant?: string;
  testName?: string;
}

// Generowanie prostego ID sesji
const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Pobieranie ID sesji (1 godzina ważności)
const getSessionId = (): string => {
  const SESSION_DURATION = 60 * 60 * 1000; // 1 godzina w ms
  const now = Date.now();
  
  const sessionData = localStorage.getItem('supabase_tracking_session');
  
  if (sessionData) {
    try {
      const { sessionId, timestamp } = JSON.parse(sessionData);
      
      // Sprawdź czy sesja nie wygasła
      if (now - timestamp < SESSION_DURATION) {
        return sessionId;
      }
    } catch (error) {
      console.error('Error parsing session data:', error);
    }
  }
  
  // Utwórz nową sesję
  const newSessionId = generateSessionId();
  localStorage.setItem('supabase_tracking_session', JSON.stringify({
    sessionId: newSessionId,
    timestamp: now
  }));
  
  console.log(`🆔 New Supabase session created: ${newSessionId}`);
  return newSessionId;
};

// Zapisywanie sesji do Supabase
const saveSessionToSupabase = async (sessionId: string) => {
  try {
    const { error } = await supabase
      .from('ab_test_sessions')
      .insert({ session_id: sessionId })
      .select();
    
    if (error && error.code !== '23505') { // Ignoruj duplikaty
      console.error('❌ Error saving session to Supabase:', error);
    } else {
      console.log(`✅ Session saved to Supabase: ${sessionId}`);
    }
  } catch (error) {
    console.error('❌ Error saving session to Supabase:', error);
  }
};

// Zapisywanie eventu do Supabase
const saveEventToSupabase = async (eventName: string, variant?: string, testName?: string) => {
  try {
    const sessionId = getSessionId();
    
    // Upewnij się, że sesja istnieje w bazie
    await saveSessionToSupabase(sessionId);
    
    const { error } = await supabase
      .from('ab_test_events')
      .insert({
        session_id: sessionId,
        event_name: eventName,
        variant,
        test_name: testName
      });
    
    if (error) {
      console.error('❌ Error saving event to Supabase:', error);
      // Fallback do localStorage jeśli Supabase nie działa
      saveEventToLocalStorage(eventName, variant, testName);
    } else {
      console.log(`📊 Event saved to Supabase: ${eventName}${variant ? ` (${variant})` : ''} - Session: ${sessionId}`);
    }
  } catch (error) {
    console.error('❌ Error saving event to Supabase:', error);
    // Fallback do localStorage jeśli Supabase nie działa
    saveEventToLocalStorage(eventName, variant, testName);
  }
};

// Fallback do localStorage
const saveEventToLocalStorage = (eventName: string, variant?: string, testName?: string) => {
  try {
    const sessionId = getSessionId();
    const event: TrackingEvent = {
      timestamp: Date.now(),
      sessionId,
      event: eventName,
      variant,
      testName
    };
    
    const eventsKey = 'supabase_tracking_events';
    const existingEvents = localStorage.getItem(eventsKey);
    let events: TrackingEvent[] = [];
    
    if (existingEvents) {
      try {
        events = JSON.parse(existingEvents);
      } catch (error) {
        console.error('Error parsing events:', error);
        events = [];
      }
    }
    
    events.push(event);
    localStorage.setItem(eventsKey, JSON.stringify(events));
    
    console.log(`📊 Event saved to localStorage (fallback): ${eventName}${variant ? ` (${variant})` : ''}`);
  } catch (error) {
    console.error('❌ Error saving event to localStorage:', error);
  }
};

// Pobieranie statystyk z Supabase
const getStatsFromSupabase = async () => {
  try {
    const { data: events, error } = await supabase
      .from('ab_test_events')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ Error getting stats from Supabase:', error);
      return getStatsFromLocalStorage();
    }
    
    console.log(`📊 Found ${events?.length || 0} events in Supabase`);
    
    const uniqueSessions = new Set(events?.map(e => e.session_id) || []).size;
    
    const eventsByType: Record<string, number> = {};
    const eventsByVariant: Record<string, number> = {};
    
    events?.forEach(event => {
      eventsByType[event.event_name] = (eventsByType[event.event_name] || 0) + 1;
      
      if (event.variant) {
        const key = `${event.event_name}_${event.variant}`;
        eventsByVariant[key] = (eventsByVariant[key] || 0) + 1;
      }
    });
    
    console.log('📊 Events by type (Supabase):', eventsByType);
    console.log('📊 Events by variant (Supabase):', eventsByVariant);
    
    return {
      uniqueSessions,
      totalEvents: events?.length || 0,
      eventsByType,
      eventsByVariant,
      allEvents: events || []
    };
  } catch (error) {
    console.error('❌ Error getting stats from Supabase:', error);
    return getStatsFromLocalStorage();
  }
};

// Fallback do localStorage
const getStatsFromLocalStorage = () => {
  const eventsKey = 'supabase_tracking_events';
  const existingEvents = localStorage.getItem(eventsKey);
  
  if (!existingEvents) {
    console.log('📊 No events found in localStorage');
    return {
      uniqueSessions: 0,
      totalEvents: 0,
      eventsByType: {},
      eventsByVariant: {},
      allEvents: []
    };
  }
  
  try {
    const events: TrackingEvent[] = JSON.parse(existingEvents);
    console.log(`📊 Found ${events.length} events in localStorage (fallback)`);
    
    const uniqueSessions = new Set(events.map(e => e.sessionId)).size;
    
    const eventsByType: Record<string, number> = {};
    const eventsByVariant: Record<string, number> = {};
    
    events.forEach(event => {
      eventsByType[event.event] = (eventsByType[event.event] || 0) + 1;
      
      if (event.variant) {
        const key = `${event.event}_${event.variant}`;
        eventsByVariant[key] = (eventsByVariant[key] || 0) + 1;
      }
    });
    
    return {
      uniqueSessions,
      totalEvents: events.length,
      eventsByType,
      eventsByVariant,
      allEvents: events
    };
  } catch (error) {
    console.error('❌ Error getting stats from localStorage:', error);
    return {
      uniqueSessions: 0,
      totalEvents: 0,
      eventsByType: {},
      eventsByVariant: {},
      allEvents: []
    };
  }
};

// Hook do śledzenia z Supabase
export const useSupabaseTracking = () => {
  const trackEvent = (eventName: string, variant?: string, testName?: string) => {
    console.log(`🎯 Tracking event to Supabase: ${eventName} with variant: ${variant}, test: ${testName}`);
    saveEventToSupabase(eventName, variant, testName);
  };
  
  const trackPageView = (pageName: string, variant?: string, testName?: string) => {
    const eventName = `page_view_${pageName}`;
    console.log(`📄 Tracking page view to Supabase: ${eventName} with variant: ${variant}, test: ${testName}`);
    trackEvent(eventName, variant, testName);
  };
  
  const trackConversion = (conversionName: string, variant?: string, testName?: string) => {
    const eventName = `conversion_${conversionName}`;
    console.log(`🎯 Tracking conversion to Supabase: ${eventName} with variant: ${variant}, test: ${testName}`);
    trackEvent(eventName, variant, testName);
  };
  
  const getStats = async () => {
    return await getStatsFromSupabase();
  };
  
  const clearStats = async () => {
    try {
      // Wyczyść z Supabase
      const { error } = await supabase
        .from('ab_test_events')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Usuń wszystkie
      
      if (error) {
        console.error('❌ Error clearing Supabase stats:', error);
      } else {
        console.log('📊 Supabase stats cleared');
      }
      
      // Wyczyść localStorage
      localStorage.removeItem('supabase_tracking_events');
      localStorage.removeItem('supabase_tracking_session');
      console.log('📊 LocalStorage tracking data cleared');
    } catch (error) {
      console.error('❌ Error clearing stats:', error);
    }
  };
  
  return {
    trackEvent,
    trackPageView,
    trackConversion,
    getStats,
    clearStats
  };
};