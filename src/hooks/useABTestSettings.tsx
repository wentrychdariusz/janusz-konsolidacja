
import { useState, useEffect } from 'react';

type ABVariant = 'A' | 'B';

interface ABTestSettings {
  sms_verification_enabled: boolean;
  sms_verification_force_variant?: ABVariant;
  contact_form_enabled: boolean;
  contact_form_force_variant?: ABVariant;
  glowna1_enabled: boolean;
  glowna1_force_variant?: ABVariant;
}

const DEFAULT_SETTINGS: ABTestSettings = {
  sms_verification_enabled: true,
  sms_verification_force_variant: undefined,
  contact_form_enabled: true,
  contact_form_force_variant: undefined,
  glowna1_enabled: true,
  glowna1_force_variant: undefined,
};

export const useABTestSettings = () => {
  const [settings, setSettings] = useState<ABTestSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wczytaj ustawienia z localStorage
    const savedSettings = localStorage.getItem('ab_test_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (error) {
        console.error('Error parsing AB test settings:', error);
        setSettings(DEFAULT_SETTINGS);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateSettings = (newSettings: Partial<ABTestSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('ab_test_settings', JSON.stringify(updatedSettings));
    console.log('📋 AB Test settings updated:', updatedSettings);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('ab_test_settings');
    console.log('🔄 AB Test settings reset to defaults');
  };

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoaded
  };
};
