
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

// Zapisywanie eventu
const saveEvent = (eventName: string, variant?: string) => {
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
};

// Pobieranie statystyk
const getStats = () => {
  const eventsKey = 'simple_tracking_events';
  const existingEvents = localStorage.getItem(eventsKey);
  
  if (!existingEvents) {
    return {
      uniqueSessions: 0,
      totalEvents: 0,
      eventsByType: {},
      eventsByVariant: {}
    };
  }
  
  try {
    const events: TrackingEvent[] = JSON.parse(existingEvents);
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
    console.error('Error getting stats:', error);
    return {
      uniqueSessions: 0,
      totalEvents: 0,
      eventsByType: {},
      eventsByVariant: {}
    };
  }
};

// Hook do śledzenia
export const useSimpleTracking = () => {
  const trackEvent = (eventName: string, variant?: string) => {
    saveEvent(eventName, variant);
  };
  
  const trackPageView = (pageName: string, variant?: string) => {
    trackEvent(`page_view_${pageName}`, variant);
  };
  
  const trackConversion = (conversionName: string, variant?: string) => {
    trackEvent(`conversion_${conversionName}`, variant);
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
