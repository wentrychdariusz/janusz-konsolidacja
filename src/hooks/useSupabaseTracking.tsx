
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TrackingEvent {
  timestamp: number;
  sessionId: string;
  event: string;
  variant?: string;
  testName?: string;
  userIp?: string;
}

// Funkcja do uzyskania IP użytkownika
const getUserIP = async (): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('get-user-ip');
    
    if (error) {
      console.error('Error getting user IP:', error);
      return 'unknown';
    }
    
    return data?.ip || 'unknown';
  } catch (error) {
    console.error('Error calling get-user-ip function:', error);
    return 'unknown';
  }
};

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

// Zapisywanie sesji do Supabase z IP
const saveSessionToSupabase = async (sessionId: string, userIp: string) => {
  try {
    const { error } = await supabase
      .from('ab_test_sessions')
      .insert({ 
        session_id: sessionId,
        user_ip: userIp
      })
      .select();
    
    if (error && error.code !== '23505') { // Ignoruj duplikaty
      console.error('❌ Error saving session to Supabase:', error);
    } else if (error?.code === '23505') {
      console.log(`ℹ️ Session already exists: ${sessionId}`);
    } else {
      console.log(`✅ Session saved to Supabase: ${sessionId} (IP: ${userIp})`);
    }
  } catch (error) {
    console.error('❌ Error saving session to Supabase:', error);
  }
};

// Zapisywanie eventu do Supabase z walidacją i IP
const saveEventToSupabase = async (eventName: string, variant?: string, testName?: string) => {
  try {
    const sessionId = getSessionId();
    const userIp = await getUserIP();
    
    // Walidacja danych przed zapisem
    if (!eventName || eventName.trim() === '') {
      console.error('❌ Event name is required');
      return;
    }
    
    // Upewnij się, że sesja istnieje w bazie
    await saveSessionToSupabase(sessionId, userIp);
    
    const eventData = {
      session_id: sessionId,
      event_name: eventName.trim(),
      variant: variant || null,
      test_name: testName || null,
      user_ip: userIp
    };
    
    console.log('📊 Saving event to Supabase:', eventData);
    
    const { error } = await supabase
      .from('ab_test_events')
      .insert(eventData);
    
    if (error) {
      console.error('❌ Error saving event to Supabase:', error);
      // Fallback do localStorage jeśli Supabase nie działa
      saveEventToLocalStorage(eventName, variant, testName, userIp);
    } else {
      console.log(`✅ Event saved to Supabase: ${eventName}${variant ? ` (${variant})` : ''} - Session: ${sessionId} (IP: ${userIp})`);
    }
  } catch (error) {
    console.error('❌ Error saving event to Supabase:', error);
    // Fallback do localStorage jeśli Supabase nie działa
    saveEventToLocalStorage(eventName, variant, testName);
  }
};

// Fallback do localStorage
const saveEventToLocalStorage = (eventName: string, variant?: string, testName?: string, userIp?: string) => {
  try {
    const sessionId = getSessionId();
    const event: TrackingEvent = {
      timestamp: Date.now(),
      sessionId,
      event: eventName,
      variant,
      testName,
      userIp
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

// Pobieranie statystyk z Supabase z liczeniem unikalnych IP
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
    
    // Zlicz unikalne IP zamiast sesji
    const uniqueIPs = new Set(events?.map(e => e.user_ip).filter(ip => ip && ip !== 'unknown') || []).size;
    const uniqueSessions = new Set(events?.map(e => e.session_id) || []).size;
    
    console.log(`📊 Unique IPs: ${uniqueIPs}, Unique Sessions: ${uniqueSessions}`);
    
    const eventsByType: Record<string, number> = {};
    const eventsByVariant: Record<string, number> = {};
    
    events?.forEach(event => {
      // Zlicz według typu eventu
      eventsByType[event.event_name] = (eventsByType[event.event_name] || 0) + 1;
      
      // Zlicz według wariantu (tylko jeśli variant jest zdefiniowany)
      if (event.variant && event.variant.trim() !== '') {
        const key = `${event.event_name}_${event.variant}`;
        eventsByVariant[key] = (eventsByVariant[key] || 0) + 1;
      }
    });
    
    console.log('📊 Events by type (Supabase):', eventsByType);
    console.log('📊 Events by variant (Supabase):', eventsByVariant);
    
    return {
      uniqueSessions: uniqueIPs, // Użyj unikalnych IP zamiast sesji  
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
    // Walidacja przed śledzeniem
    if (!eventName || eventName.trim() === '') {
      console.error('❌ Cannot track event: eventName is required');
      return;
    }
    
    console.log(`🎯 Tracking event to Supabase: "${eventName}" with variant: "${variant}", test: "${testName}"`);
    saveEventToSupabase(eventName.trim(), variant?.trim(), testName?.trim());
  };
  
  const trackPageView = (pageName: string, variant?: string, testName?: string) => {
    if (!pageName || pageName.trim() === '') {
      console.error('❌ Cannot track page view: pageName is required');
      return;
    }
    
    const eventName = `page_view_${pageName.trim()}`;
    console.log(`📄 Tracking page view to Supabase: "${eventName}" with variant: "${variant}", test: "${testName}"`);
    trackEvent(eventName, variant?.trim(), testName?.trim());
  };
  
  const trackConversion = (conversionName: string, variant?: string, testName?: string) => {
    if (!conversionName || conversionName.trim() === '') {
      console.error('❌ Cannot track conversion: conversionName is required');
      return;
    }
    
    const eventName = `conversion_${conversionName.trim()}`;
    console.log(`🎯 Tracking conversion to Supabase: "${eventName}" with variant: "${variant}", test: "${testName}"`);
    trackEvent(eventName, variant?.trim(), testName?.trim());
  };
  
  const getStats = async () => {
    console.log('📊 Getting stats from Supabase...');
    return await getStatsFromSupabase();
  };
  
  const clearStats = async () => {
    console.log('🗑️ Clearing all stats from Supabase and localStorage...');
    try {
      // Wyczyść z Supabase - usuń wszystkie eventy
      const { error: eventsError } = await supabase
        .from('ab_test_events')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Usuń wszystkie
      
      if (eventsError) {
        console.error('❌ Error clearing Supabase events:', eventsError);
      } else {
        console.log('✅ Supabase events cleared');
      }

      // Wyczyść sesje z Supabase
      const { error: sessionsError } = await supabase
        .from('ab_test_sessions')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Usuń wszystkie
      
      if (sessionsError) {
        console.error('❌ Error clearing Supabase sessions:', sessionsError);
      } else {
        console.log('✅ Supabase sessions cleared');
      }
      
      // Wyczyść localStorage
      localStorage.removeItem('supabase_tracking_events');
      localStorage.removeItem('supabase_tracking_session');
      console.log('✅ LocalStorage tracking data cleared');
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
