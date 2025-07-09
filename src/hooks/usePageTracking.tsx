import { useEffect } from 'react';

type ABVariant = 'A' | 'B';

// Prosty tracker jak w analytics
export const usePageTracking = () => {
  
  // Funkcja do śledzenia wyświetlenia strony
  const trackPageView = (pageName: string) => {
    console.log(`📊 [PageTracking] Tracking page view: ${pageName}`);
    
    // Pobierz wariant użytkownika z localStorage
    const variant = localStorage.getItem('ab_test_sms_verification') as ABVariant || 'A';
    console.log(`📊 [PageTracking] User variant: ${variant}`);
    
    // Klucz dla wyświetleń
    const viewsKey = `ab_test_sms_verification_variant_${variant.toLowerCase()}_views`;
    
    // Pobierz obecną liczbę i zwiększ
    const currentViews = parseInt(localStorage.getItem(viewsKey) || '0');
    const newCount = currentViews + 1;
    
    localStorage.setItem(viewsKey, newCount.toString());
    
    console.log(`📊 [PageTracking] ${pageName} view tracked for variant ${variant}: ${currentViews} → ${newCount}`);
  };
  
  // Funkcja do śledzenia konwersji
  const trackConversion = (conversionName: string) => {
    console.log(`🎯 [PageTracking] Tracking conversion: ${conversionName}`);
    
    // Pobierz wariant użytkownika z localStorage
    const variant = localStorage.getItem('ab_test_sms_verification') as ABVariant || 'A';
    console.log(`🎯 [PageTracking] User variant: ${variant}`);
    
    // Klucz dla konwersji
    const conversionsKey = `ab_test_sms_verification_variant_${variant.toLowerCase()}_conversions`;
    
    // Pobierz obecną liczbę i zwiększ
    const currentConversions = parseInt(localStorage.getItem(conversionsKey) || '0');
    const newCount = currentConversions + 1;
    
    localStorage.setItem(conversionsKey, newCount.toString());
    
    console.log(`🎯 [PageTracking] ${conversionName} conversion tracked for variant ${variant}: ${currentConversions} → ${newCount}`);
  };
  
  // Funkcja do śledzenia unikalnych użytkowników (tylko raz na sesję)
  const trackUniqueUser = () => {
    const sessionKey = 'ab_test_unique_tracked_this_session';
    
    // Sprawdź czy już był tracked w tej sesji
    if (sessionStorage.getItem(sessionKey)) {
      console.log(`👤 [PageTracking] User already tracked this session`);
      return;
    }
    
    console.log(`👤 [PageTracking] Tracking unique user`);
    
    // Pobierz wariant użytkownika
    let variant = localStorage.getItem('ab_test_sms_verification') as ABVariant;
    
    // Jeśli nie ma wariantu, przypisz losowo
    if (!variant) {
      variant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem('ab_test_sms_verification', variant);
      console.log(`👤 [PageTracking] New user assigned to variant: ${variant}`);
    }
    
    // Klucz dla unikalnych użytkowników
    const uniqueUsersKey = `ab_test_sms_verification_variant_${variant.toLowerCase()}_unique_users`;
    
    // Pobierz obecną liczbę i zwiększ
    const currentUsers = parseInt(localStorage.getItem(uniqueUsersKey) || '0');
    const newCount = currentUsers + 1;
    
    localStorage.setItem(uniqueUsersKey, newCount.toString());
    
    // Oznacz że był tracked w tej sesji
    sessionStorage.setItem(sessionKey, 'true');
    
    console.log(`👤 [PageTracking] Unique user tracked for variant ${variant}: ${currentUsers} → ${newCount}`);
  };
  
  return {
    trackPageView,
    trackConversion,
    trackUniqueUser,
    getUserVariant: () => localStorage.getItem('ab_test_sms_verification') as ABVariant || 'A'
  };
};