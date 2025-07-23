
import { useState, useEffect } from 'react';
import { useSupabaseTracking } from './useSupabaseTracking';

type ABVariant = 'A' | 'B';

interface ABTestConfig {
  testName: string;
  splitRatio?: number; // 0.5 = 50/50 split
  forceVariant?: ABVariant; // Nadpisanie domyślnej wersji
  enabled?: boolean; // Możliwość wyłączenia A/B testu
}

interface ABTestStats {
  variantA: {
    uniqueUsers: number;
    totalViews: number;
    conversions: number;
  };
  variantB: {
    uniqueUsers: number;
    totalViews: number;
    conversions: number;
  };
}

export const useABTest = ({ testName, splitRatio = 0.5, forceVariant, enabled = true }: ABTestConfig) => {
  const [variant, setVariant] = useState<ABVariant>('A');
  const [isLoaded, setIsLoaded] = useState(false);
  const { trackPageView, trackConversion: supabaseTrackConversion, getStats } = useSupabaseTracking();

  useEffect(() => {
    console.log('🚀 useABTest hook initializing with config:', { testName, splitRatio, forceVariant, enabled });
    
    // Jeśli A/B test jest wyłączony, zawsze używaj wariantu A
    if (!enabled) {
      console.log('❌ A/B Test disabled, using variant A');
      setVariant('A');
      setIsLoaded(true);
      return;
    }

    // POPRAWIONE: Sprawdź czy użytkownik już ma przypisany wariant w localStorage
    const storageKey = `ab_test_${testName}`;
    const existingVariant = localStorage.getItem(storageKey) as ABVariant;
    
    console.log(`🔍 Checking localStorage for key: ${storageKey}, found: ${existingVariant}`);
    
    let finalVariant: ABVariant;
    
    if (existingVariant && (existingVariant === 'A' || existingVariant === 'B')) {
      // POPRAWKA: Jeśli użytkownik już ma wariant, ZAWSZE go używaj (ignoruj forceVariant dla existing users)
      finalVariant = existingVariant;
      console.log(`🔄 Existing user - using stored variant: ${existingVariant} (ignoring force: ${forceVariant})`);
    } else {
      // POPRAWKA: Używamy hash z sessionId dla równomiernego 50/50 podziału
      const sessionKey = 'supabase_tracking_session';
      const sessionData = localStorage.getItem(sessionKey);
      let sessionId = '';
      
      if (sessionData) {
        try {
          const parsed = JSON.parse(sessionData);
          sessionId = parsed.sessionId || '';
        } catch (e) {
          console.log('Error parsing session data');
        }
      }
      
      if (forceVariant) {
        finalVariant = forceVariant;
        console.log(`🎯 New user with forced variant: ${forceVariant}`);
      } else {
        // Używamy hash z sessionId + testName dla konsystentnego 50/50 podziału
        const hashInput = sessionId + testName;
        let hash = 0;
        for (let i = 0; i < hashInput.length; i++) {
          const char = hashInput.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        
        // Używamy modulo dla idealnego 50/50 podziału
        const isVariantA = Math.abs(hash) % 2 === 0;
        finalVariant = isVariantA ? 'A' : 'B';
        
        console.log(`🎲 Hash-based 50/50 assignment:`, {
          sessionId: sessionId.substring(0, 8) + '...',
          hash: hash,
          modulo: Math.abs(hash) % 2,
          finalVariant
        });
      }
      
    }
    
    console.log(`🎯 Final variant assignment: ${finalVariant}`);
    setVariant(finalVariant);
    localStorage.setItem(storageKey, finalVariant);
    
    console.log(`🏁 useABTest initialization complete - variant: ${finalVariant}`);
    setIsLoaded(true);
  }, [testName, splitRatio, forceVariant, enabled]);

  useEffect(() => {
    console.log(`📊 Second useEffect triggered - isLoaded: ${isLoaded}, enabled: ${enabled}, variant: ${variant}`);
    
    if (isLoaded && enabled && variant) {
      // Trackuj page view dla A/B testu
      const pageViewEvent = `page_view_${testName}_${variant}`;
      console.log(`📄 Tracking A/B test page view: ${pageViewEvent}`);
      trackPageView(testName, variant, testName);
    } else {
      console.log(`⏸️ Skipping view tracking - isLoaded: ${isLoaded}, enabled: ${enabled}, variant: ${variant}`);
    }
  }, [isLoaded, variant, testName, enabled, trackPageView]);

  return {
    variant,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B',
    trackConversion: (conversionName?: string) => {
      const finalConversionName = conversionName || `${testName}_success`;
      console.log(`🎯 trackConversion called for ${finalConversionName}, variant ${variant}, enabled: ${enabled}`);
      if (enabled) {
        supabaseTrackConversion(finalConversionName, variant, testName);
      }
    },
    getStats: async () => {
      const stats = await getStats();
      
      // Konwertuj z Supabase Tracking do formatu ABTestStats
      const variantAViews = stats.eventsByVariant[`page_view_${testName}_A`] || 0;
      const variantBViews = stats.eventsByVariant[`page_view_${testName}_B`] || 0;
      
      const variantAConversions = Object.keys(stats.eventsByVariant)
        .filter(key => key.includes('conversion_') && key.endsWith('_A'))
        .reduce((sum, key) => sum + (stats.eventsByVariant[key] || 0), 0);
        
      const variantBConversions = Object.keys(stats.eventsByVariant)
        .filter(key => key.includes('conversion_') && key.endsWith('_B'))
        .reduce((sum, key) => sum + (stats.eventsByVariant[key] || 0), 0);
      
      return {
        variantA: {
          uniqueUsers: variantAViews, // Page views jako proxy dla unique users
          totalViews: variantAViews,
          conversions: variantAConversions,
        },
        variantB: {
          uniqueUsers: variantBViews,
          totalViews: variantBViews,
          conversions: variantBConversions,
        }
      };
    },
    resetStats: () => {
      // Wyczyść tylko klucze związane z tym testem w localStorage
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`ab_test_${testName}`)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      console.log(`🔄 AB Test: ${testName} - Old A/B test keys reset`);
    },
    isLoaded,
    enabled
  };
};
