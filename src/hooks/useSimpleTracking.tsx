
import { useEffect } from 'react';

interface TrackingEvent {
  timestamp: number;
  sessionId: string;
  event: string;
  variant?: string;
}

// Generowanie prostego ID sesji
const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Pobieranie ID sesji (1 godzina ważności)
const getSessionId = (): string => {
  const SESSION_DURATION = 60 * 60 * 1000; // 1 godzina w ms
  const now = Date.now();
  
  const sessionData = localStorage.getItem('simple_tracking_session');
  
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
  localStorage.setItem('simple_tracking_session', JSON.stringify({
    sessionId: newSessionId,
    timestamp: now
  }));
  
  console.log(`🆔 New session created: ${newSessionId}`);
  return newSessionId;
};

// Zapisywanie eventu - ZAWSZE DZIAŁA
const saveEvent = (eventName: string, variant?: string) => {
  try {
    const sessionId = getSessionId();
    const event: TrackingEvent = {
      timestamp: Date.now(),
      sessionId,
      event: eventName,
      variant
    };
    
    const eventsKey = 'simple_tracking_events';
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
    
    console.log(`📊 Event tracked: ${eventName}${variant ? ` (${variant})` : ''} - Session: ${sessionId}`);
    console.log(`📊 Total events now: ${events.length}`);
  } catch (error) {
    console.error('❌ Error saving event:', error);
  }
};

// Pobieranie statystyk - ZAWSZE ZWRACA DANE
const getStats = () => {
  const eventsKey = 'simple_tracking_events';
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
    console.log(`📊 Found ${events.length} events in localStorage`);
    
    const uniqueSessions = new Set(events.map(e => e.sessionId)).size;
    
    const eventsByType: Record<string, number> = {};
    const eventsByVariant: Record<string, number> = {};
    
    events.forEach(event => {
      eventsByType[event.event] = (eventsByType[event.event] || 0) + 1;
      
      if (event.variant) {
        // KLUCZ: event_variant (np. page_view_sms_verification_A)
        const key = `${event.event}_${event.variant}`;
        eventsByVariant[key] = (eventsByVariant[key] || 0) + 1;
      }
    });
    
    console.log('📊 Events by type:', eventsByType);
    console.log('📊 Events by variant:', eventsByVariant);
    
    return {
      uniqueSessions,
      totalEvents: events.length,
      eventsByType,
      eventsByVariant,
      allEvents: events
    };
  } catch (error) {
    console.error('❌ Error getting stats:', error);
    return {
      uniqueSessions: 0,
      totalEvents: 0,
      eventsByType: {},
      eventsByVariant: {},
      allEvents: []
    };
  }
};

// Hook do śledzenia - ZAWSZE DZIAŁA
export const useSimpleTracking = () => {
  const trackEvent = (eventName: string, variant?: string) => {
    console.log(`🎯 Tracking event: ${eventName} with variant: ${variant}`);
    console.log(`🔍 Current localStorage events before save:`, localStorage.getItem('simple_tracking_events'));
    saveEvent(eventName, variant);
    console.log(`🔍 Current localStorage events after save:`, localStorage.getItem('simple_tracking_events'));
  };
  
  const trackPageView = (pageName: string, variant?: string) => {
    const eventName = `page_view_${pageName}`;
    console.log(`📄 Tracking page view: ${eventName} with variant: ${variant}`);
    trackEvent(eventName, variant);
  };
  
  const trackConversion = (conversionName: string, variant?: string) => {
    const eventName = `conversion_${conversionName}`;
    console.log(`🎯 Tracking conversion: ${eventName} with variant: ${variant}`);
    trackEvent(eventName, variant);
  };
  
  const clearStats = () => {
    localStorage.removeItem('simple_tracking_events');
    localStorage.removeItem('simple_tracking_session');
    console.log('📊 All tracking data cleared');
  };
  
  return {
    trackEvent,
    trackPageView,
    trackConversion,
    getStats,
    clearStats
  };
};
