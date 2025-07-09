
import { useState, useEffect } from 'react';

type ABVariant = 'A' | 'B';

interface ABTestConfig {
  testName: string;
  splitRatio?: number; // 0.5 = 50/50 split
}

export const useABTest = ({ testName, splitRatio = 0.5 }: ABTestConfig) => {
  const [variant, setVariant] = useState<ABVariant>('A');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sprawdź czy użytkownik już ma przypisany wariant
    const storageKey = `ab_test_${testName}`;
    const existingVariant = localStorage.getItem(storageKey) as ABVariant;
    
    if (existingVariant && (existingVariant === 'A' || existingVariant === 'B')) {
      setVariant(existingVariant);
    } else {
      // Przypisz losowo wariant na podstawie splitRatio
      const randomValue = Math.random();
      const assignedVariant: ABVariant = randomValue < splitRatio ? 'A' : 'B';
      setVariant(assignedVariant);
      localStorage.setItem(storageKey, assignedVariant);
    }

    // Zapisz wyświetlenie (view)
    trackView(variant);
    setIsLoaded(true);
  }, [testName, splitRatio]);

  const trackView = (currentVariant: ABVariant) => {
    const viewsKey = `ab_variant_${currentVariant.toLowerCase()}_views`;
    const currentViews = parseInt(localStorage.getItem(viewsKey) || '0');
    localStorage.setItem(viewsKey, (currentViews + 1).toString());
    
    console.log(`📊 AB Test: ${testName} - Variant ${currentVariant} view tracked`);
  };

  const trackConversion = () => {
    const conversionsKey = `ab_variant_${variant.toLowerCase()}_conversions`;
    const currentConversions = parseInt(localStorage.getItem(conversionsKey) || '0');
    localStorage.setItem(conversionsKey, (currentConversions + 1).toString());
    
    console.log(`🎯 AB Test: ${testName} - Variant ${variant} conversion tracked`);
  };

  return {
    variant,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B',
    trackConversion,
    isLoaded
  };
};
