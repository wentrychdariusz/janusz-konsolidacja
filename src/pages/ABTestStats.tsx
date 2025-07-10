import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSimpleTracking } from '../hooks/useSimpleTracking';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VariantStats {
  users: number;
  views: number;
  conversions: number;
  conversionRate: number;
}

const ABTestStats = () => {
  const { getStats, clearStats, trackPageView, trackConversion } = useSimpleTracking();
  const [variantA, setVariantA] = useState<VariantStats>({ users: 0, views: 0, conversions: 0, conversionRate: 0 });
  const [variantB, setVariantB] = useState<VariantStats>({ users: 0, views: 0, conversions: 0, conversionRate: 0 });
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const refreshStats = () => {
    console.log('🔄 Refreshing A/B test stats...');
    console.log('🌐 Current domain:', window.location.hostname);
    console.log('📍 Current URL:', window.location.href);
    const stats = getStats();
    console.log('📊 All stats:', stats);
    
    // DEBUGOWANIE: Sprawdź localStorage bezpośrednio
    console.log('🔍 RAW localStorage check:');
    const rawEvents = localStorage.getItem('simple_tracking_events');
    console.log('📦 simple_tracking_events:', rawEvents);
    if (rawEvents) {
      try {
        const events = JSON.parse(rawEvents);
        console.log('📊 Events count:', events.length);
        console.log('📋 Recent events:', events.slice(-3));
      } catch (e) {
        console.error('❌ Error parsing events:', e);
      }
    }
    
    // DEBUGGING: Sprawdź wszystkie klucze w eventsByVariant
    console.log('🔍 Available keys in eventsByVariant:');
    Object.keys(stats.eventsByVariant).forEach(key => {
      console.log(`  ${key}: ${stats.eventsByVariant[key]}`);
    });
    
    // Mapowanie kluczy - używaj DOKŁADNIE tych samych kluczy co w localStorage
    const aViews = stats.eventsByVariant['page_view_sms_verification_test_A'] || 0;
    const aConversions = stats.eventsByVariant['conversion_sms_verification_test_success_A'] || 0;
    const aConversionRate = aViews > 0 ? (aConversions / aViews) * 100 : 0;
    
    const bViews = stats.eventsByVariant['page_view_sms_verification_test_B'] || 0;
    const bConversions = stats.eventsByVariant['conversion_sms_verification_test_success_B'] || 0;
    const bConversionRate = bViews > 0 ? (bConversions / bViews) * 100 : 0;
    
    console.log('🔍 Looking for keys:', {
      aViews: `page_view_sms_verification_test_A = ${aViews}`,
      aConversions: `conversion_sms_verification_test_success_A = ${aConversions}`,
      bViews: `page_view_sms_verification_test_B = ${bViews}`,
      bConversions: `conversion_sms_verification_test_success_B = ${bConversions}`
    });
    
    setVariantA({ users: aViews, views: aViews, conversions: aConversions, conversionRate: aConversionRate });
    setVariantB({ users: bViews, views: bViews, conversions: bConversions, conversionRate: bConversionRate });
    setLastUpdate(new Date().toLocaleTimeString());
    
    console.log('🎯 Final React state set:');
    console.log('  Variant A:', { users: aViews, views: aViews, conversions: aConversions, rate: aConversionRate });
    console.log('  Variant B:', { users: bViews, views: bViews, conversions: bConversions, rate: bConversionRate });
    console.log('🕐 Last update:', new Date().toLocaleTimeString());
    
    console.log('📊 Stats updated:', { 
      variantA: { views: aViews, conversions: aConversions, rate: aConversionRate }, 
      variantB: { views: bViews, conversions: bConversions, rate: bConversionRate } 
    });
  };

  const generateTestData = () => {
    console.log('🧪 Generating realistic test data...');
    
    // Wyczyść poprzednie dane
    clearStats();
    
    // Symuluj realistyczne dane A/B test - Wariant A (45 użytkowników, 12 konwersji)
    for (let i = 0; i < 45; i++) {
      trackPageView('sms_verification_test', 'A');
    }
    for (let i = 0; i < 12; i++) {
      trackConversion('sms_verification_test_success', 'A');
    }
    
    // Wariant B (52 użytkowników, 18 konwersji)  
    for (let i = 0; i < 52; i++) {
      trackPageView('sms_verification_test', 'B');
    }
    for (let i = 0; i < 18; i++) {
      trackConversion('sms_verification_test_success', 'B');
    }
    
    console.log('✅ Test data generated');
    setTimeout(refreshStats, 100);
  };

  useEffect(() => {
    refreshStats();
    
    // Auto-refresh every 2 seconds to catch new events
    const interval = setInterval(refreshStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = [
    {
      name: 'Wariant A',
      'Użytkownicy': variantA.users,
      'Konwersje': variantA.conversions,
    },
    {
      name: 'Wariant B', 
      'Użytkownicy': variantB.users,
      'Konwersje': variantB.conversions,
    },
  ];

  const totalUsers = variantA.users + variantB.users;
  const totalConversions = variantA.conversions + variantB.conversions;
  const overallConversionRate = totalUsers > 0 ? (totalConversions / totalUsers) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            A/B Test - SMS Verification Stats 2025
          </h1>
          <p className="text-gray-600 text-lg">
            Analiza skuteczności wariantów strony weryfikacji
          </p>
          {lastUpdate && (
            <Badge variant="outline" className="mt-2">
              Ostatnia aktualizacja: {lastUpdate}
            </Badge>
          )}
        </div>

        {/* Akcje */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Button onClick={refreshStats} variant="outline" className="bg-green-50 hover:bg-green-100 border-green-200">
            🔄 Odśwież dane
          </Button>
          <Button onClick={generateTestData} className="bg-blue-600 hover:bg-blue-700 text-white">
            🧪 Wygeneruj testowe dane
          </Button>
          <Button onClick={() => { clearStats(); refreshStats(); }} variant="destructive">
            🗑️ Wyczyść WSZYSTKIE dane (łącznie z thank you page)
          </Button>
          <Button 
            onClick={() => window.location.href = '/admin-logout'} 
            variant="outline" 
            className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
          >
            🚪 Wyloguj się
          </Button>
        </div>

        {/* Podsumowanie */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Łączni użytkownicy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Łączne konwersje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{totalConversions}</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Średni współczynnik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{overallConversionRate.toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Główne porównanie wariantów */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Wariant A */}
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader className="bg-blue-100 border-b border-blue-200">
              <CardTitle className="text-2xl text-blue-800 flex items-center justify-between">
                Wariant A
                <Badge className="bg-blue-600 text-white text-lg px-3 py-1">
                  {variantA.conversionRate.toFixed(1)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="text-lg font-medium text-gray-700">Użytkownicy:</span>
                  <span className="text-2xl font-bold text-blue-600">{variantA.users}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="text-lg font-medium text-gray-700">Wyświetlenia:</span>
                  <span className="text-2xl font-bold text-blue-600">{variantA.views}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="text-lg font-medium text-gray-700">Konwersje:</span>
                  <span className="text-2xl font-bold text-green-600">{variantA.conversions}</span>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <div className="text-sm text-blue-700 font-medium">% Konwersji</div>
                  <div className="text-4xl font-bold text-blue-800">{variantA.conversionRate.toFixed(1)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wariant B */}
          <Card className="border-red-200 bg-red-50/30">
            <CardHeader className="bg-red-100 border-b border-red-200">
              <CardTitle className="text-2xl text-red-800 flex items-center justify-between">
                Wariant B
                <Badge className="bg-red-600 text-white text-lg px-3 py-1">
                  {variantB.conversionRate.toFixed(1)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-red-100">
                  <span className="text-lg font-medium text-gray-700">Użytkownicy:</span>
                  <span className="text-2xl font-bold text-red-600">{variantB.users}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-red-100">
                  <span className="text-lg font-medium text-gray-700">Wyświetlenia:</span>
                  <span className="text-2xl font-bold text-red-600">{variantB.views}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-red-100">
                  <span className="text-lg font-medium text-gray-700">Konwersje:</span>
                  <span className="text-2xl font-bold text-green-600">{variantB.conversions}</span>
                </div>
                <div className="bg-red-100 p-4 rounded-lg text-center">
                  <div className="text-sm text-red-700 font-medium">% Konwersji</div>
                  <div className="text-4xl font-bold text-red-800">{variantB.conversionRate.toFixed(1)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wykres */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Porównanie wizualne</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Użytkownicy" fill="#3b82f6" name="Użytkownicy" />
                <Bar dataKey="Konwersje" fill="#10b981" name="Konwersje" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Analiza */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-800">Wyniki</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold mb-4">
                {variantB.conversionRate > variantA.conversionRate ? (
                  <span className="text-red-600">🏆 Wariant B prowadzi o {(variantB.conversionRate - variantA.conversionRate).toFixed(1)}%</span>
                ) : variantA.conversionRate > variantB.conversionRate ? (
                  <span className="text-blue-600">🏆 Wariant A prowadzi o {(variantA.conversionRate - variantB.conversionRate).toFixed(1)}%</span>
                ) : (
                  <span className="text-gray-600">🤝 Remis</span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Różnica w konwersjach: {Math.abs(variantB.conversions - variantA.conversions)} • 
                Różnica w użytkownikach: {Math.abs(variantB.users - variantA.users)}
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default ABTestStats;
