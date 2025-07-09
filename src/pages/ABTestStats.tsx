
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
  const { getStats, clearStats } = useSimpleTracking();
  const [variantA, setVariantA] = useState<VariantStats>({ users: 0, views: 0, conversions: 0, conversionRate: 0 });
  const [variantB, setVariantB] = useState<VariantStats>({ users: 0, views: 0, conversions: 0, conversionRate: 0 });
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const refreshStats = () => {
    console.log('🔄 Refreshing A/B test stats...');
    const stats = getStats();
    
    // Wariant A
    const aUsers = stats.eventsByVariant['page_view_sms_verification_A'] || 0;
    const aViews = stats.eventsByType['page_view_sms_verification'] || 0; // wszystkie wyświetlenia
    const aConversions = stats.eventsByVariant['conversion_thank_you_A'] || 0;
    const aConversionRate = aUsers > 0 ? (aConversions / aUsers) * 100 : 0;
    
    // Wariant B  
    const bUsers = stats.eventsByVariant['page_view_sms_verification_B'] || 0;
    const bViews = stats.eventsByType['page_view_sms_verification'] || 0; // wszystkie wyświetlenia
    const bConversions = stats.eventsByVariant['conversion_thank_you_B'] || 0;
    const bConversionRate = bUsers > 0 ? (bConversions / bUsers) * 100 : 0;
    
    setVariantA({ users: aUsers, views: aViews, conversions: aConversions, conversionRate: aConversionRate });
    setVariantB({ users: bUsers, views: bViews, conversions: bConversions, conversionRate: bConversionRate });
    setLastUpdate(new Date().toLocaleTimeString());
    
    console.log('📊 Stats updated:', { variantA: { users: aUsers, conversions: aConversions, rate: aConversionRate }, variantB: { users: bUsers, conversions: bConversions, rate: bConversionRate } });
  };

  const generateTestData = () => {
    console.log('🧪 Generating realistic test data...');
    
    // Symuluj realistyczne dane A/B test
    const testEvents = [
      // Wariant A - 45 użytkowników, 12 konwersji (26.7%)
      ...Array(45).fill(0).map(() => ({ event: 'page_view_sms_verification', variant: 'A' })),
      ...Array(12).fill(0).map(() => ({ event: 'conversion_thank_you', variant: 'A' })),
      
      // Wariant B - 52 użytkowników, 18 konwersji (34.6%)  
      ...Array(52).fill(0).map(() => ({ event: 'page_view_sms_verification', variant: 'B' })),
      ...Array(18).fill(0).map(() => ({ event: 'conversion_thank_you', variant: 'B' })),
    ];
    
    // Wyczyść poprzednie dane
    clearStats();
    
    // Dodaj testowe eventy
    testEvents.forEach(({ event, variant }) => {
      const eventData = { 
        timestamp: Date.now(), 
        sessionId: `test_${Math.random().toString(36)}`, 
        event, 
        variant 
      };
      
      const existingEvents = JSON.parse(localStorage.getItem('simple_tracking_events') || '[]');
      existingEvents.push(eventData);
      localStorage.setItem('simple_tracking_events', JSON.stringify(existingEvents));
    });
    
    console.log('✅ Test data generated');
    setTimeout(refreshStats, 100);
  };

  useEffect(() => {
    refreshStats();
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
            A/B Test - SMS Verification
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
        <div className="flex justify-center gap-4">
          <Button onClick={refreshStats} variant="outline" className="bg-green-50 hover:bg-green-100 border-green-200">
            🔄 Odśwież dane
          </Button>
          <Button onClick={generateTestData} className="bg-blue-600 hover:bg-blue-700 text-white">
            🧪 Wygeneruj testowe dane
          </Button>
          <Button onClick={() => { clearStats(); refreshStats(); }} variant="destructive">
            🗑️ Wyczyść wszystko
          </Button>
        </div>

        {/* Podsumowanie ogólne */}
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

        {/* Porównanie wariantów - główne karty */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Wariant A */}
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader className="bg-blue-100 border-b border-blue-200">
              <CardTitle className="text-2xl text-blue-800 flex items-center justify-between">
                Wariant A (Oryginalny)
                <Badge className="bg-blue-600 text-white text-lg px-3 py-1">
                  {variantA.conversionRate.toFixed(1)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="text-lg font-medium text-gray-700">Unikalni użytkownicy:</span>
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
                  <div className="text-sm text-blue-700 font-medium">Współczynnik konwersji</div>
                  <div className="text-4xl font-bold text-blue-800">{variantA.conversionRate.toFixed(1)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wariant B */}
          <Card className="border-red-200 bg-red-50/30">
            <CardHeader className="bg-red-100 border-b border-red-200">
              <CardTitle className="text-2xl text-red-800 flex items-center justify-between">
                Wariant B (Agresywny)
                <Badge className="bg-red-600 text-white text-lg px-3 py-1">
                  {variantB.conversionRate.toFixed(1)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-red-100">
                  <span className="text-lg font-medium text-gray-700">Unikalni użytkownicy:</span>
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
                  <div className="text-sm text-red-700 font-medium">Współczynnik konwersji</div>
                  <div className="text-4xl font-bold text-red-800">{variantB.conversionRate.toFixed(1)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wykres porównawczy */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Porównanie wizualne wariantów</CardTitle>
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

        {/* Analiza wyników */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-800">Analiza wyników</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Statystyki różnic:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Różnica w użytkownikach: <strong>{Math.abs(variantB.users - variantA.users)}</strong></li>
                  <li>• Różnica w konwersjach: <strong>{Math.abs(variantB.conversions - variantA.conversions)}</strong></li>
                  <li>• Różnica w współczynniku: <strong>{Math.abs(variantB.conversionRate - variantA.conversionRate).toFixed(1)}%</strong></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Zwycięzca:</h3>
                <div className="text-2xl font-bold">
                  {variantB.conversionRate > variantA.conversionRate ? (
                    <span className="text-red-600">🏆 Wariant B prowadzi!</span>
                  ) : variantA.conversionRate > variantB.conversionRate ? (
                    <span className="text-blue-600">🏆 Wariant A prowadzi!</span>
                  ) : (
                    <span className="text-gray-600">🤝 Remis</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer info */}
        <div className="text-center text-gray-500 text-sm">
          <p>Statystyki oparte na unikalnych sesjach (1 godzina ważności) • Dane przechowywane lokalnie</p>
        </div>

      </div>
    </div>
  );
};

export default ABTestStats;
