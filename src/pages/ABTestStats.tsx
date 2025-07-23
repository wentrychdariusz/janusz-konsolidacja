import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';

interface VariantStats {
  users: number;
  views: number;
  conversions: number;
  conversionRate: number;
}

const ABTestStats = () => {
  const { getStats, clearStats, trackPageView, trackConversion } = useSupabaseTracking();
  
  // SMS Verification Test Stats
  const [smsVariantA, setSmsVariantA] = useState<VariantStats>({ users: 0, views: 0, conversions: 0, conversionRate: 0 });
  const [smsVariantB, setSmsVariantB] = useState<VariantStats>({ users: 0, views: 0, conversions: 0, conversionRate: 0 });
  
  // Contact Form Test Stats
  const [contactVariantA, setContactVariantA] = useState<VariantStats>({ users: 0, views: 0, conversions: 0, conversionRate: 0 });
  const [contactVariantB, setContactVariantB] = useState<VariantStats>({ users: 0, views: 0, conversions: 0, conversionRate: 0 });
  
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshStats = async () => {
    console.log('🔄 Refreshing A/B test stats from Supabase...');
    setIsLoading(true);
    
    try {
      // Dodaj krótkie opóźnienie dla Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const stats = await getStats();
      console.log('📊 All stats from Supabase:', stats);
      
      // Zapisz dane debug
      setDebugInfo(stats);

      // Wypisz wszystkie klucze dla debugowania
      Object.keys(stats.eventsByVariant).forEach(key => {
        console.log(`  ${key}: ${stats.eventsByVariant[key]}`);
      });

      // SMS Verification Test - mapowanie kluczy
      const smsAViews = stats.eventsByVariant['page_view_sms_verification_test_A'] || 0;
      const smsAConversions = stats.eventsByVariant['conversion_sms_verification_test_success_A'] || 0;
      const smsAConversionRate = smsAViews > 0 ? (smsAConversions / smsAViews) * 100 : 0;
      
      const smsBViews = stats.eventsByVariant['page_view_sms_verification_test_B'] || 0;
      const smsBConversions = stats.eventsByVariant['conversion_sms_verification_test_success_B'] || 0;
      const smsBConversionRate = smsBViews > 0 ? (smsBConversions / smsBViews) * 100 : 0;

      // Contact Form Test - mapowanie kluczy
      const contactAViews = stats.eventsByVariant['contact_form_variant_a_view'] || 0;
      const contactAConversions = stats.eventsByVariant['contact_form_variant_a_conversion'] || 0;
      const contactAConversionRate = contactAViews > 0 ? (contactAConversions / contactAViews) * 100 : 0;
      
      const contactBViews = stats.eventsByVariant['contact_form_variant_b_view'] || 0;
      const contactBConversions = stats.eventsByVariant['contact_form_variant_b_conversion'] || 0;
      const contactBConversionRate = contactBViews > 0 ? (contactBConversions / contactBViews) * 100 : 0;
      
      console.log('🔍 SMS Test - Looking for keys:', {
        smsAViews: `page_view_sms_verification_test_A = ${smsAViews}`,
        smsAConversions: `conversion_sms_verification_test_success_A = ${smsAConversions}`,
        smsBViews: `page_view_sms_verification_test_B = ${smsBViews}`,
        smsBConversions: `conversion_sms_verification_test_success_B = ${smsBConversions}`
      });

      console.log('🔍 Contact Form Test - Looking for keys:', {
        contactAViews: `contact_form_variant_a_view = ${contactAViews}`,
        contactAConversions: `contact_form_variant_a_conversion = ${contactAConversions}`,
        contactBViews: `contact_form_variant_b_view = ${contactBViews}`,
        contactBConversions: `contact_form_variant_b_conversion = ${contactBConversions}`
      });
      
      setSmsVariantA({ 
        users: stats.uniqueSessions || 0, 
        views: smsAViews, 
        conversions: smsAConversions, 
        conversionRate: smsAConversionRate 
      });
      setSmsVariantB({ 
        users: stats.uniqueSessions || 0, 
        views: smsBViews, 
        conversions: smsBConversions, 
        conversionRate: smsBConversionRate 
      });

      setContactVariantA({ 
        users: stats.uniqueSessions || 0, 
        views: contactAViews, 
        conversions: contactAConversions, 
        conversionRate: contactAConversionRate 
      });
      setContactVariantB({ 
        users: stats.uniqueSessions || 0, 
        views: contactBViews, 
        conversions: contactBConversions, 
        conversionRate: contactBConversionRate 
      });

    } catch (error) {
      console.error('❌ Error refreshing stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearStats = async () => {
    setIsLoading(true);
    await clearStats();
    await refreshStats();
  };

  // Funkcje testowe
  const handleTestSMSViewA = () => {
    console.log('🧪 Testing SMS A view');
    trackPageView('sms_verification_test', 'A');
    setTimeout(() => refreshStats(), 2000);
  };

  const handleTestSMSConversionA = () => {
    console.log('🧪 Testing SMS A conversion');
    trackConversion('sms_verification_test', 'success', 'A');
    setTimeout(() => refreshStats(), 2000);
  };

  const handleTestContactViewA = () => {
    console.log('🧪 Testing Contact A view');
    trackConversion('contact_form_variant_a_view');
    setTimeout(() => refreshStats(), 2000);
  };

  const handleTestContactConversionA = () => {
    console.log('🧪 Testing Contact A conversion');
    trackConversion('contact_form_variant_a_conversion');
    setTimeout(() => refreshStats(), 2000);
  };

  useEffect(() => {
    refreshStats();
    
    // Auto-refresh co 5 sekund
    const interval = setInterval(refreshStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">
            A/B Test Dashboard 2025
          </h1>
          <p className="text-warm-neutral-600">
            Analiza skuteczności wariantów
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            onClick={refreshStats} 
            variant="outline" 
            className="bg-green-50 hover:bg-green-100 border-green-200"
            disabled={isLoading}
          >
            {isLoading ? 'Ładowanie...' : '🔄 Odśwież dane'}
          </Button>
          
          <Button 
            onClick={handleClearStats} 
            variant="destructive"
            disabled={isLoading}
          >
            🗑️ Wyczyść wszystkie dane
          </Button>
        </div>
        
        {/* SMS Verification Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4">
            📱 Test SMS Verification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* SMS Variant A */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Wariant A (Klasyczny)</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-700">Wyświetlenia:</span>
                  <span className="font-medium text-blue-900">{smsVariantA.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Konwersje:</span>
                  <span className="font-medium text-blue-900">{smsVariantA.conversions}</span>
                </div>
                <div className="flex justify-between border-t border-blue-200 pt-2">
                  <span className="text-blue-700 font-medium">Wskaźnik konwersji:</span>
                  <span className="font-bold text-blue-900">{smsVariantA.conversionRate.toFixed(1)}%</span>
                </div>
              </div>
              <div className="mt-3 space-x-2">
                <Button size="sm" onClick={handleTestSMSViewA} variant="outline">
                  Test View
                </Button>
                <Button size="sm" onClick={handleTestSMSConversionA} variant="outline">
                  Test Conv
                </Button>
              </div>
            </div>

            {/* SMS Variant B */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Wariant B (Zdjęcia klientów)</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-700">Wyświetlenia:</span>
                  <span className="font-medium text-green-900">{smsVariantB.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Konwersje:</span>
                  <span className="font-medium text-green-900">{smsVariantB.conversions}</span>
                </div>
                <div className="flex justify-between border-t border-green-200 pt-2">
                  <span className="text-green-700 font-medium">Wskaźnik konwersji:</span>
                  <span className="font-bold text-green-900">{smsVariantB.conversionRate.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMS Winner */}
          <div className="text-center">
            {smsVariantA.conversionRate > smsVariantB.conversionRate ? (
              <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                <span className="text-blue-800 font-bold">🏆 Wariant A prowadzi! (+{(smsVariantA.conversionRate - smsVariantB.conversionRate).toFixed(1)} p.p.)</span>
              </div>
            ) : smsVariantB.conversionRate > smsVariantA.conversionRate ? (
              <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                <span className="text-green-800 font-bold">🏆 Wariant B prowadzi! (+{(smsVariantB.conversionRate - smsVariantA.conversionRate).toFixed(1)} p.p.)</span>
              </div>
            ) : (
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                <span className="text-gray-800 font-bold">🤝 Remis - identyczne wyniki</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4">
            📧 Test Formularza Kontaktowego
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Contact Variant A */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">Wariant A (Klasyczny)</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-700">Wyświetlenia:</span>
                  <span className="font-medium text-purple-900">{contactVariantA.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Konwersje:</span>
                  <span className="font-medium text-purple-900">{contactVariantA.conversions}</span>
                </div>
                <div className="flex justify-between border-t border-purple-200 pt-2">
                  <span className="text-purple-700 font-medium">Wskaźnik konwersji:</span>
                  <span className="font-bold text-purple-900">{contactVariantA.conversionRate.toFixed(1)}%</span>
                </div>
              </div>
              <div className="mt-3 space-x-2">
                <Button size="sm" onClick={handleTestContactViewA} variant="outline">
                  Test View
                </Button>
                <Button size="sm" onClick={handleTestContactConversionA} variant="outline">
                  Test Conv
                </Button>
              </div>
            </div>

            {/* Contact Variant B */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">Wariant B (Promocyjny)</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-orange-700">Wyświetlenia:</span>
                  <span className="font-medium text-orange-900">{contactVariantB.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-700">Konwersje:</span>
                  <span className="font-medium text-orange-900">{contactVariantB.conversions}</span>
                </div>
                <div className="flex justify-between border-t border-orange-200 pt-2">
                  <span className="text-orange-700 font-medium">Wskaźnik konwersji:</span>
                  <span className="font-bold text-orange-900">{contactVariantB.conversionRate.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Winner */}
          <div className="text-center">
            {contactVariantA.conversionRate > contactVariantB.conversionRate ? (
              <div className="bg-purple-100 border border-purple-300 rounded-lg p-4">
                <span className="text-purple-800 font-bold">🏆 Wariant A prowadzi! (+{(contactVariantA.conversionRate - contactVariantB.conversionRate).toFixed(1)} p.p.)</span>
              </div>
            ) : contactVariantB.conversionRate > contactVariantA.conversionRate ? (
              <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
                <span className="text-orange-800 font-bold">🏆 Wariant B prowadzi! (+{(contactVariantB.conversionRate - contactVariantA.conversionRate).toFixed(1)} p.p.)</span>
              </div>
            ) : (
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                <span className="text-gray-800 font-bold">🤝 Remis - identyczne wyniki</span>
              </div>
            )}
          </div>
        </div>

        {/* Debug Info */}
        {debugInfo && (
          <div className="bg-gray-100 rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🔍 Debug Info</h3>
            <div className="bg-white rounded p-3 text-sm font-mono overflow-auto max-h-64">
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ABTestStats;