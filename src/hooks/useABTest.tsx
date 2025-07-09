
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
    
    if (existingVariant && (existingVariant === 'A' || existingVariant === 'B')) {
      // Użyj nadpisanego wariantu jeśli jest podany
      const finalVariant = forceVariant || existingVariant;
      setVariant(finalVariant);
      localStorage.setItem(storageKey, finalVariant);
      console.log(`🧪 Existing user assigned to variant ${finalVariant} (force: ${forceVariant}, existing: ${existingVariant})`);
    } else {
      // Przypisz losowo wariant na podstawie splitRatio lub użyj nadpisanego
      const randomValue = Math.random();
      const assignedVariant: ABVariant = forceVariant || (randomValue < splitRatio ? 'A' : 'B');
      setVariant(assignedVariant);
      localStorage.setItem(storageKey, assignedVariant);
      
      console.log(`🎲 Random value: ${randomValue}, splitRatio: ${splitRatio}, assigned variant: ${assignedVariant}`);
      
      // Zapisz unikalnego użytkownika - POPRAWKA
      trackUniqueUser(testName, assignedVariant);
      console.log(`🧪 New user assigned to variant ${assignedVariant}`);
    }

    setIsLoaded(true);
  }, [testName, splitRatio, forceVariant, enabled]);

  useEffect(() => {
    console.log(`📊 Second useEffect triggered - isLoaded: ${isLoaded}, enabled: ${enabled}, variant: ${variant}`);
    
    if (isLoaded && enabled) {
      // Zapisz wyświetlenie (view) tylko po załadowaniu - POPRAWKA
      console.log(`📈 About to track view for ${testName}, variant ${variant}`);
      trackView(testName, variant);
    }
  }, [isLoaded, variant, testName, enabled]);

  return {
    variant,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B',
    trackConversion: () => {
      console.log(`🎯 trackConversion called for ${testName}, variant ${variant}, enabled: ${enabled}`);
      return trackConversion(testName, variant, enabled);
    },
    getStats: () => getStats(testName),
    resetStats: () => resetStats(testName),
    isLoaded,
    enabled
  };
};

// POPRAWIONE FUNKCJE - wyciągnięte na zewnątrz hooka
const trackUniqueUser = (testName: string, currentVariant: ABVariant) => {
  const uniqueUsersKey = `ab_test_${testName}_variant_${currentVariant.toLowerCase()}_unique_users`;
  const currentUsers = parseInt(localStorage.getItem(uniqueUsersKey) || '0');
  const newCount = currentUsers + 1;
  localStorage.setItem(uniqueUsersKey, newCount.toString());
  
  console.log(`👤 AB Test: ${testName} - Unique user tracked for Variant ${currentVariant}. Total: ${newCount}`);
  console.log(`💾 Saved to localStorage key: ${uniqueUsersKey} with value: ${newCount}`);
  
  // Debug - sprawdź czy rzeczywiście zapisało
  const verification = localStorage.getItem(uniqueUsersKey);
  console.log(`🔍 Verification - reading back from localStorage: ${verification}`);
};

const trackView = (testName: string, currentVariant: ABVariant) => {
  const viewsKey = `ab_test_${testName}_variant_${currentVariant.toLowerCase()}_views`;
  const currentViews = parseInt(localStorage.getItem(viewsKey) || '0');
  const newCount = currentViews + 1;
  localStorage.setItem(viewsKey, newCount.toString());
  
  console.log(`📊 AB Test: ${testName} - View tracked for Variant ${currentVariant}. Total: ${newCount}`);
  console.log(`💾 Saved to localStorage key: ${viewsKey} with value: ${newCount}`);
  
  // Debug - sprawdź czy rzeczywiście zapisało
  const verification = localStorage.getItem(viewsKey);
  console.log(`🔍 Verification - reading back from localStorage: ${verification}`);
};

const trackConversion = (testName: string, currentVariant: ABVariant, enabled: boolean) => {
  console.log(`🎯 trackConversion function called with: testName=${testName}, variant=${currentVariant}, enabled=${enabled}`);
  
  if (!enabled) {
    console.log('🚫 AB Test disabled - conversion not tracked');
    return;
  }
  
  const conversionsKey = `ab_test_${testName}_variant_${currentVariant.toLowerCase()}_conversions`;
  const currentConversions = parseInt(localStorage.getItem(conversionsKey) || '0');
  const newCount = currentConversions + 1;
  localStorage.setItem(conversionsKey, newCount.toString());
  
  console.log(`🎯 AB Test: ${testName} - Conversion tracked for Variant ${currentVariant}. Total: ${newCount}`);
  console.log(`💾 Saved to localStorage key: ${conversionsKey} with value: ${newCount}`);
  
  // Debug - sprawdź czy rzeczywiście zapisało
  const verification = localStorage.getItem(conversionsKey);
  console.log(`🔍 Verification - reading back from localStorage: ${verification}`);
};

const getStats = (testName: string): ABTestStats => {
  console.log(`📈 Getting stats for ${testName}`);
  
  // Debug wszystkich kluczy w localStorage
  console.log('🔍 All localStorage keys related to A/B test:');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.includes(`ab_test_${testName}`)) {
      console.log(`  ${key}: ${localStorage.getItem(key)}`);
    }
  }
  
  const stats = {
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
  
  console.log(`📈 Final stats for ${testName}:`, stats);
  return stats;
};

const resetStats = (testName: string) => {
  const keys = [
    `ab_test_${testName}_variant_a_unique_users`,
    `ab_test_${testName}_variant_a_views`,
    `ab_test_${testName}_variant_a_conversions`,
    `ab_test_${testName}_variant_b_unique_users`,
    `ab_test_${testName}_variant_b_views`,
    `ab_test_${testName}_variant_b_conversions`,
  ];
  
  console.log(`🔄 Resetting stats for ${testName}, removing keys:`, keys);
  keys.forEach(key => {
    console.log(`🗑️ Removing key: ${key}`);
    localStorage.removeItem(key);
  });
  console.log(`🔄 AB Test: ${testName} - All stats reset`);
};
