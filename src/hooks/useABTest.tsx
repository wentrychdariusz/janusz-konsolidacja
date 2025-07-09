
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
    
    let finalVariant: ABVariant;
    let isNewUser = false;
    
    if (existingVariant && (existingVariant === 'A' || existingVariant === 'B')) {
      // Użyj nadpisanego wariantu jeśli jest podany
      finalVariant = forceVariant || existingVariant;
      console.log(`🧪 Existing user assigned to variant ${finalVariant} (force: ${forceVariant}, existing: ${existingVariant})`);
    } else {
      // Przypisz losowo wariant na podstawie splitRatio lub użyj nadpisanego
      const randomValue = Math.random();
      finalVariant = forceVariant || (randomValue < splitRatio ? 'A' : 'B');
      isNewUser = true;
      
      console.log(`🎲 Random value: ${randomValue}, splitRatio: ${splitRatio}, assigned variant: ${finalVariant}`);
      console.log(`🧪 New user assigned to variant ${finalVariant}`);
    }
    
    console.log(`🎯 Final variant before setState: ${finalVariant}`);
    setVariant(finalVariant);
    localStorage.setItem(storageKey, finalVariant);
    
    // WAŻNE: Zapisz unikalnego użytkownika tylko dla nowych użytkowników
    if (isNewUser) {
      console.log(`👤 Tracking unique user for NEW user, variant: ${finalVariant}`);
      trackUniqueUser(testName, finalVariant);
    }
    
    console.log(`🏁 useABTest initialization complete - variant: ${finalVariant}, isNewUser: ${isNewUser}`);
    setIsLoaded(true);
  }, [testName, splitRatio, forceVariant, enabled]);

  useEffect(() => {
    console.log(`📊 Second useEffect triggered - isLoaded: ${isLoaded}, enabled: ${enabled}, variant: ${variant}`);
    
    if (isLoaded && enabled && variant) {
      // WAŻNE: Zapisz wyświetlenie (view) za każdym razem gdy komponent się ładuje
      console.log(`📈 About to track view for ${testName}, variant ${variant}`);
      trackView(testName, variant);
    } else {
      console.log(`⏸️ Skipping view tracking - isLoaded: ${isLoaded}, enabled: ${enabled}, variant: ${variant}`);
    }
  }, [isLoaded, variant, testName, enabled]);

  return {
    variant,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B',
    trackConversion: () => {
      console.log(`🎯 trackConversion called for ${testName}, variant ${variant}, enabled: ${enabled}`);
      if (enabled) {
        trackConversion(testName, variant);
      }
    },
    getStats: () => getStats(testName),
    resetStats: () => resetStats(testName),
    isLoaded,
    enabled
  };
};

// NAPRAWIONE FUNKCJE TRACKUJĄCE
const trackUniqueUser = (testName: string, currentVariant: ABVariant) => {
  const uniqueUsersKey = `ab_test_${testName}_variant_${currentVariant.toLowerCase()}_unique_users`;
  
  try {
    console.log(`🚨 [CRITICAL DEBUG] trackUniqueUser called with testName: "${testName}", variant: "${currentVariant}"`);
    console.log(`🚨 [CRITICAL DEBUG] Generated key: "${uniqueUsersKey}"`);
    console.log(`🚨 [CRITICAL DEBUG] localStorage available?`, typeof Storage !== 'undefined');
    
    const currentUsersStr = localStorage.getItem(uniqueUsersKey);
    console.log(`👤 Reading unique users from localStorage: ${uniqueUsersKey} = "${currentUsersStr}"`);
    
    const currentUsers = currentUsersStr ? parseInt(currentUsersStr, 10) : 0;
    const validCurrentUsers = isNaN(currentUsers) ? 0 : currentUsers;
    const newCount = validCurrentUsers + 1;
    
    console.log(`🚨 [CRITICAL DEBUG] About to set localStorage with key: "${uniqueUsersKey}", value: "${newCount}"`);
    localStorage.setItem(uniqueUsersKey, newCount.toString());
    console.log(`🚨 [CRITICAL DEBUG] localStorage.setItem completed`);
    
    console.log(`👤 AB Test: ${testName} - Unique user tracked for Variant ${currentVariant}. Previous: ${validCurrentUsers}, New: ${newCount}`);
    
    // Weryfikacja
    const verification = localStorage.getItem(uniqueUsersKey);
    console.log(`🔍 Verification - reading back from localStorage: "${verification}"`);
    
    // SPRAWDŹ WSZYSTKIE KLUCZE PO ZAPISIE
    console.log(`🚨 [CRITICAL DEBUG] All localStorage keys after setting:`);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.includes('ab_test')) {
        console.log(`  🔑 ${key}: ${localStorage.getItem(key)}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error tracking unique user:`, error);
  }
};

const trackView = (testName: string, currentVariant: ABVariant) => {
  const viewsKey = `ab_test_${testName}_variant_${currentVariant.toLowerCase()}_views`;
  
  try {
    const currentViewsStr = localStorage.getItem(viewsKey);
    console.log(`📊 Reading views from localStorage: ${viewsKey} = "${currentViewsStr}"`);
    
    const currentViews = currentViewsStr ? parseInt(currentViewsStr, 10) : 0;
    const validCurrentViews = isNaN(currentViews) ? 0 : currentViews;
    const newCount = validCurrentViews + 1;
    
    localStorage.setItem(viewsKey, newCount.toString());
    
    console.log(`📊 AB Test: ${testName} - View tracked for Variant ${currentVariant}. Previous: ${validCurrentViews}, New: ${newCount}`);
    
    // Weryfikacja
    const verification = localStorage.getItem(viewsKey);
    console.log(`🔍 Verification - reading back from localStorage: "${verification}"`);
  } catch (error) {
    console.error(`❌ Error tracking view:`, error);
  }
};

const trackConversion = (testName: string, currentVariant: ABVariant) => {
  const conversionsKey = `ab_test_${testName}_variant_${currentVariant.toLowerCase()}_conversions`;
  
  try {
    const currentConversionsStr = localStorage.getItem(conversionsKey);
    console.log(`🎯 Reading conversions from localStorage: ${conversionsKey} = "${currentConversionsStr}"`);
    
    const currentConversions = currentConversionsStr ? parseInt(currentConversionsStr, 10) : 0;
    const validCurrentConversions = isNaN(currentConversions) ? 0 : currentConversions;
    const newCount = validCurrentConversions + 1;
    
    localStorage.setItem(conversionsKey, newCount.toString());
    
    console.log(`🎯 AB Test: ${testName} - Conversion tracked for Variant ${currentVariant}. Previous: ${validCurrentConversions}, New: ${newCount}`);
    
    // Weryfikacja
    const verification = localStorage.getItem(conversionsKey);
    console.log(`🔍 Verification - reading back from localStorage: "${verification}"`);
  } catch (error) {
    console.error(`❌ Error tracking conversion:`, error);
  }
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
