
import { useState, useEffect } from 'react';
import { useSimpleTracking } from './useSimpleTracking';

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
  const { trackPageView, trackConversion: simpleTrackConversion, getStats } = useSimpleTracking();

  useEffect(() => {
    console.log('🚀 useABTest hook initializing with config:', { testName, splitRatio, forceVariant, enabled });
    
    // Jeśli A/B test jest wyłączony, zawsze używaj wariantu A
    if (!enabled) {
      console.log('❌ A/B Test disabled, using variant A');
      setVariant('A');
      setIsLoaded(true);
      return;
    }

    // Sprawdź czy użytkownik już ma przypisany wariant
    const storageKey = `ab_test_${testName}`;
    const existingVariant = localStorage.getItem(storageKey) as ABVariant;
    
    console.log(`🔍 Checking localStorage for key: ${storageKey}, found: ${existingVariant}`);
    
    let finalVariant: ABVariant;
    
    if (existingVariant && (existingVariant === 'A' || existingVariant === 'B')) {
      // Użyj nadpisanego wariantu jeśli jest podany
      finalVariant = forceVariant || existingVariant;
      console.log(`🧪 Existing user assigned to variant ${finalVariant} (force: ${forceVariant}, existing: ${existingVariant})`);
    } else {
      // Przypisz losowo wariant na podstawie splitRatio lub użyj nadpisanego
      const randomValue = Math.random();
      finalVariant = forceVariant || (randomValue < splitRatio ? 'A' : 'B');
      
      console.log(`🎲 Random value: ${randomValue}, splitRatio: ${splitRatio}, assigned variant: ${finalVariant}`);
      console.log(`🧪 New user assigned to variant ${finalVariant}`);
    }
    
    console.log(`🎯 Final variant before setState: ${finalVariant}`);
    setVariant(finalVariant);
    localStorage.setItem(storageKey, finalVariant);
    
    console.log(`🏁 useABTest initialization complete - variant: ${finalVariant}`);
    setIsLoaded(true);
  }, [testName, splitRatio, forceVariant, enabled]);

  useEffect(() => {
    console.log(`📊 Second useEffect triggered - isLoaded: ${isLoaded}, enabled: ${enabled}, variant: ${variant}`);
    
    if (isLoaded && enabled && variant) {
      // Używaj useSimpleTracking do śledzenia page view
      console.log(`📈 About to track page view for ${testName}, variant ${variant}`);
      trackPageView(testName, variant);
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
        simpleTrackConversion(finalConversionName, variant);
      }
    },
    getStats: () => {
      const stats = getStats();
      
      // Konwertuj z Simple Tracking do formatu ABTestStats
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
