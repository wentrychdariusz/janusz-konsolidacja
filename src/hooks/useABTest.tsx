
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    // Jeśli A/B test jest wyłączony, zawsze używaj wariantu A
    if (!enabled) {
      setVariant('A');
      setIsLoaded(true);
      return;
    }

    // Sprawdź czy użytkownik już ma przypisany wariant
    const storageKey = `ab_test_${testName}`;
    const existingVariant = localStorage.getItem(storageKey) as ABVariant;
    
    if (existingVariant && (existingVariant === 'A' || existingVariant === 'B')) {
      // Użyj nadpisanego wariantu jeśli jest podany
      const finalVariant = forceVariant || existingVariant;
      setVariant(finalVariant);
      localStorage.setItem(storageKey, finalVariant);
    } else {
      // Przypisz losowo wariant na podstawie splitRatio lub użyj nadpisanego
      const assignedVariant: ABVariant = forceVariant || (Math.random() < splitRatio ? 'A' : 'B');
      setVariant(assignedVariant);
      localStorage.setItem(storageKey, assignedVariant);
      
      // Zapisz unikalnego użytkownika
      trackUniqueUser(assignedVariant);
    }

    setIsLoaded(true);
  }, [testName, splitRatio, forceVariant, enabled]);

  useEffect(() => {
    if (isLoaded && enabled) {
      // Zapisz wyświetlenie (view) tylko po załadowaniu
      trackView(variant);
    }
  }, [isLoaded, variant, testName, enabled]);

  const trackUniqueUser = (currentVariant: ABVariant) => {
    const uniqueUsersKey = `ab_test_${testName}_variant_${currentVariant.toLowerCase()}_unique_users`;
    const currentUsers = parseInt(localStorage.getItem(uniqueUsersKey) || '0');
    localStorage.setItem(uniqueUsersKey, (currentUsers + 1).toString());
    
    console.log(`👤 AB Test: ${testName} - New unique user for Variant ${currentVariant}`);
  };

  const trackView = (currentVariant: ABVariant) => {
    const viewsKey = `ab_test_${testName}_variant_${currentVariant.toLowerCase()}_views`;
    const currentViews = parseInt(localStorage.getItem(viewsKey) || '0');
    localStorage.setItem(viewsKey, (currentViews + 1).toString());
    
    console.log(`📊 AB Test: ${testName} - Variant ${currentVariant} view tracked`);
  };

  const trackConversion = () => {
    if (!enabled) return;
    
    const conversionsKey = `ab_test_${testName}_variant_${variant.toLowerCase()}_conversions`;
    const currentConversions = parseInt(localStorage.getItem(conversionsKey) || '0');
    localStorage.setItem(conversionsKey, (currentConversions + 1).toString());
    
    console.log(`🎯 AB Test: ${testName} - Variant ${variant} conversion tracked`);
  };

  const getStats = (): ABTestStats => {
    return {
      variantA: {
        uniqueUsers: parseInt(localStorage.getItem(`ab_test_${testName}_variant_a_unique_users`) || '0'),
        totalViews: parseInt(localStorage.getItem(`ab_test_${testName}_variant_a_views`) || '0'),
        conversions: parseInt(localStorage.getItem(`ab_test_${testName}_variant_a_conversions`) || '0'),
      },
      variantB: {
        uniqueUsers: parseInt(localStorage.getItem(`ab_test_${testName}_variant_b_unique_users`) || '0'),
        totalViews: parseInt(localStorage.getItem(`ab_test_${testName}_variant_b_views`) || '0'),
        conversions: parseInt(localStorage.getItem(`ab_test_${testName}_variant_b_conversions`) || '0'),
      }
    };
  };

  const resetStats = () => {
    const keys = [
      `ab_test_${testName}_variant_a_unique_users`,
      `ab_test_${testName}_variant_a_views`,
      `ab_test_${testName}_variant_a_conversions`,
      `ab_test_${testName}_variant_b_unique_users`,
      `ab_test_${testName}_variant_b_views`,
      `ab_test_${testName}_variant_b_conversions`,
    ];
    
    keys.forEach(key => localStorage.removeItem(key));
    console.log(`🔄 AB Test: ${testName} - Stats reset`);
  };

  return {
    variant,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B',
    trackConversion,
    getStats,
    resetStats,
    isLoaded,
    enabled
  };
};
