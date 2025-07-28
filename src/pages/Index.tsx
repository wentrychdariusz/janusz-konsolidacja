
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useABTest } from '../hooks/useABTest';
import { useABTestSettings } from '../hooks/useABTestSettings';

const Index = () => {
  const { settings, isLoaded } = useABTestSettings();
  const { variant, isLoaded: abTestLoaded } = useABTest({
    testName: 'glowna1_calculator',
    enabled: settings.glowna1_enabled ?? true,
    forceVariant: settings.glowna1_force_variant,
    splitRatio: 0.5
  });

  // Czekaj aż oba hooki się załadują
  if (!isLoaded || !abTestLoaded) {
    return <div>Loading...</div>;
  }

  // Przekieruj na odpowiednią wersję na podstawie A/B testu
  if (variant === 'A') {
    console.log('🎯 A/B Test: Redirecting to glowna1a (old calculator)');
    return <Navigate to="/glowna1a" replace />;
  } else {
    console.log('🎯 A/B Test: Redirecting to glowna1b (new calculator)');
    return <Navigate to="/glowna1b" replace />;
  }
};

export default Index;
