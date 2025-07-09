import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useABTestSettings } from '../hooks/useABTestSettings';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

const ABTestStats = () => {
  const { settings, updateSettings, resetSettings } = useABTestSettings();
  const [stats, setStats] = useState<ABTestStats>({
    variantA: { uniqueUsers: 0, totalViews: 0, conversions: 0 },
    variantB: { uniqueUsers: 0, totalViews: 0, conversions: 0 }
  });
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // Funkcja do bezpośredniego odczytu statystyk z localStorage
  const getDirectStats = (): ABTestStats => {
    console.log('📈 [ABTestStats] getDirectStats called at:', new Date().toISOString());
    
    // Sprawdzamy wszystkie klucze w localStorage
    const allKeys: string[] = [];
    const abTestKeys: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        allKeys.push(`${key}: ${localStorage.getItem(key)}`);
        if (key.includes('ab_test_sms_verification_test')) {
          abTestKeys.push(`${key}: ${localStorage.getItem(key)}`);
        }
      }
    }
    
    console.log('🔍 [ABTestStats] All localStorage keys:', allKeys);
    console.log('🔍 [ABTestStats] A/B Test keys:', abTestKeys);
    
    // POPRAWIONE KLUCZE - zgodne z useABTest
    const keys = {
      variantA: {
        uniqueUsers: 'ab_test_sms_verification_test_variant_a_unique_users',
        views: 'ab_test_sms_verification_test_variant_a_views', 
        conversions: 'ab_test_sms_verification_test_variant_a_conversions'
      },
      variantB: {
        uniqueUsers: 'ab_test_sms_verification_test_variant_b_unique_users',
        views: 'ab_test_sms_verification_test_variant_b_views',
        conversions: 'ab_test_sms_verification_test_variant_b_conversions'
      }
    };
    
    console.log('🔍 [ABTestStats] Looking for keys:', keys);
    
    // Sprawdzamy czy klucze istnieją i co zawierają
    const variantAUniqueUsers = localStorage.getItem(keys.variantA.uniqueUsers);
    const variantAViews = localStorage.getItem(keys.variantA.views);
    const variantAConversions = localStorage.getItem(keys.variantA.conversions);
    const variantBUniqueUsers = localStorage.getItem(keys.variantB.uniqueUsers);
    const variantBViews = localStorage.getItem(keys.variantB.views);
    const variantBConversions = localStorage.getItem(keys.variantB.conversions);
    
    console.log('🔍 [ABTestStats] Raw values:');
    console.log(`  Variant A uniqueUsers: "${variantAUniqueUsers}"`);
    console.log(`  Variant A views: "${variantAViews}"`);
    console.log(`  Variant A conversions: "${variantAConversions}"`);
    console.log(`  Variant B uniqueUsers: "${variantBUniqueUsers}"`);
    console.log(`  Variant B views: "${variantBViews}"`);
    console.log(`  Variant B conversions: "${variantBConversions}"`);
    
    const directStats = {
      variantA: {
        uniqueUsers: parseInt(variantAUniqueUsers || '0'),
        totalViews: parseInt(variantAViews || '0'),
        conversions: parseInt(variantAConversions || '0'),
      },
      variantB: {
        uniqueUsers: parseInt(variantBUniqueUsers || '0'),
        totalViews: parseInt(variantBViews || '0'),
        conversions: parseInt(variantBConversions || '0'),
      }
    };
    
    console.log('📈 [ABTestStats] Final stats:', directStats);
    
    // Ustawiamy debug info
    setDebugInfo([
      `Odświeżone o: ${new Date().toLocaleTimeString()}`,
      `Found ${abTestKeys.length} A/B test keys in localStorage`,
      `Variant A: ${variantAUniqueUsers || 'null'} users, ${variantAViews || 'null'} views, ${variantAConversions || 'null'} conversions`,
      `Variant B: ${variantBUniqueUsers || 'null'} users, ${variantBViews || 'null'} views, ${variantBConversions || 'null'} conversions`,
      `Total localStorage keys: ${allKeys.length}`,
      `POPRAWIONE: Teraz używam prawidłowych kluczy z useABTest!`
    ]);
    
    return directStats;
  };

  // Funkcja do resetowania statystyk
  const resetStats = () => {
    const keys = [
      'ab_test_sms_verification_test_variant_a_unique_users',
      'ab_test_sms_verification_test_variant_a_views',
      'ab_test_sms_verification_test_variant_a_conversions',
      'ab_test_sms_verification_test_variant_b_unique_users',
      'ab_test_sms_verification_test_variant_b_views',
      'ab_test_sms_verification_test_variant_b_conversions',
    ];
    
    console.log('🔄 [ABTestStats] Resetting stats, removing keys:', keys);
    keys.forEach(key => {
      console.log(`🗑️ [ABTestStats] Removing key: ${key}`);
      localStorage.removeItem(key);
    });
    console.log('🔄 [ABTestStats] All stats reset');
    
    // Odśwież statystyki po resecie
    refreshStats();
  };

  // Funkcja do odświeżania statystyk
  const refreshStats = () => {
    console.log('🔄 [ABTestStats] refreshStats called - button clicked!');
    const newStats = getDirectStats();
    setStats(newStats);
    console.log('🔄 [ABTestStats] Stats refreshed:', newStats);
    
    // Force re-render by updating debug info
    setDebugInfo(prev => [...prev, `Kliknięto odśwież o: ${new Date().toLocaleTimeString()}`]);
  };

  // Załaduj statystyki przy pierwszym renderze
  useEffect(() => {
    console.log('🚀 [ABTestStats] Component mounted, loading initial stats');
    refreshStats();
  }, []);

  const calculateConversionRate = (conversions: number, uniqueUsers: number) => {
    if (uniqueUsers === 0) return 0;
    return ((conversions / uniqueUsers) * 100).toFixed(2);
  };

  const chartData = [
    {
      name: 'Wariant A',
      'Unikalni użytkownicy': stats.variantA.uniqueUsers,
      'Wyświetlenia': stats.variantA.totalViews,
      'Konwersje': stats.variantA.conversions,
    },
    {
      name: 'Wariant B',
      'Unikalni użytkownicy': stats.variantB.uniqueUsers,
      'Wyświetlenia': stats.variantB.totalViews,
      'Konwersje': stats.variantB.conversions,
    },
  ];

  const pieData = [
    { name: 'Wariant A', value: stats.variantA.uniqueUsers, color: '#3b82f6' },
    { name: 'Wariant B', value: stats.variantB.uniqueUsers, color: '#ef4444' },
  ];

  const totalUsers = stats.variantA.uniqueUsers + stats.variantB.uniqueUsers;
  const totalConversions = stats.variantA.conversions + stats.variantB.conversions;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Statystyki A/B Test - SMS Verification
          </h1>
          <p className="text-gray-600">
            Zarządzanie i analiza testów A/B dla strony weryfikacji SMS
          </p>
        </div>

        {/* Enhanced Debug Panel */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">Debug - Dane localStorage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Wariant A:</strong>
                  <ul className="ml-4">
                    <li>Unikalni: {stats.variantA.uniqueUsers}</li>
                    <li>Wyświetlenia: {stats.variantA.totalViews}</li>
                    <li>Konwersje: {stats.variantA.conversions}</li>
                  </ul>
                </div>
                <div>
                  <strong>Wariant B:</strong>
                  <ul className="ml-4">
                    <li>Unikalni: {stats.variantB.uniqueUsers}</li>
                    <li>Wyświetlenia: {stats.variantB.totalViews}</li>
                    <li>Konwersje: {stats.variantB.conversions}</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <strong>Debug Info:</strong>
                <ul className="ml-4 text-xs">
                  {debugInfo.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t pt-4">
                <Button 
                  variant="outline" 
                  onClick={refreshStats}
                  className="mr-2"
                >
                  🔄 TEST ODŚWIEŻ DANE
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    console.log('🔍 [DEBUG] Manual localStorage check:');
                    for (let i = 0; i < localStorage.length; i++) {
                      const key = localStorage.key(i);
                      if (key) {
                        console.log(`${key}: ${localStorage.getItem(key)}`);
                      }
                    }
                  }}
                >
                  🔍 Debug localStorage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ustawienia A/B Testu */}
        <Card>
          <CardHeader>
            <CardTitle>Ustawienia A/B Testu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="ab-test-enabled"
                  checked={settings.sms_verification_enabled}
                  onCheckedChange={(enabled) => 
                    updateSettings({ sms_verification_enabled: enabled })
                  }
                />
                <Label htmlFor="ab-test-enabled">
                  Włącz A/B Test
                </Label>
              </div>
              
              <Badge variant={settings.sms_verification_enabled ? "default" : "secondary"}>
                {settings.sms_verification_enabled ? "Aktywny" : "Wyłączony"}
              </Badge>
            </div>

            <div className="space-y-2">
              <Label>Wymuszony wariant</Label>
              <div className="flex items-center space-x-4">
                <Select
                  value={settings.sms_verification_force_variant || "none"}
                  onValueChange={(value) => 
                    updateSettings({ 
                      sms_verification_force_variant: value === "none" ? undefined : value as "A" | "B"
                    })
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Wybierz wariant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Automatyczny podział</SelectItem>
                    <SelectItem value="A">Wymuszony wariant A</SelectItem>
                    <SelectItem value="B">Wymuszony wariant B</SelectItem>
                  </SelectContent>
                </Select>
                
                {settings.sms_verification_force_variant && (
                  <Badge variant="outline">
                    Wariant {settings.sms_verification_force_variant} wymuszony
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={resetSettings}
                size="sm"
              >
                Reset ustawień
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Podsumowanie */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Łączni użytkownicy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Łączne konwersje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{totalConversions}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Konwersja A</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {calculateConversionRate(stats.variantA.conversions, stats.variantA.uniqueUsers)}%
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Konwersja B</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {calculateConversionRate(stats.variantB.conversions, stats.variantB.uniqueUsers)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Szczegółowe statystyki */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Wariant A (Oryginalny)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.variantA.uniqueUsers}
                  </div>
                  <div className="text-sm text-gray-500">Unikalni użytkownicy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.variantA.totalViews}
                  </div>
                  <div className="text-sm text-gray-500">Wyświetlenia</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.variantA.conversions}
                  </div>
                  <div className="text-sm text-gray-500">Konwersje</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  Współczynnik konwersji: {calculateConversionRate(stats.variantA.conversions, stats.variantA.uniqueUsers)}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wariant B (Agresywny)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {stats.variantB.uniqueUsers}
                  </div>
                  <div className="text-sm text-gray-500">Unikalni użytkownicy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {stats.variantB.totalViews}
                  </div>
                  <div className="text-sm text-gray-500">Wyświetlenia</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.variantB.conversions}
                  </div>
                  <div className="text-sm text-gray-500">Konwersje</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  Współczynnik konwersji: {calculateConversionRate(stats.variantB.conversions, stats.variantB.uniqueUsers)}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wykresy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Porównanie wariantów</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Unikalni użytkownicy" fill="#3b82f6" />
                  <Bar dataKey="Konwersje" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Podział użytkowników</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Akcje */}
        <Card>
          <CardHeader>
            <CardTitle>Akcje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button 
                variant="destructive" 
                onClick={() => {
                  if (confirm('Czy na pewno chcesz zresetować wszystkie statystyki?')) {
                    resetStats();
                  }
                }}
              >
                Reset wszystkich statystyk
              </Button>
              <Button 
                variant="outline" 
                onClick={refreshStats}
              >
                Odśwież dane
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  console.log('LocalStorage keys:');
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key?.includes('ab_test')) {
                      console.log(`${key}: ${localStorage.getItem(key)}`);
                    }
                  }
                }}
              >
                Debug localStorage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ABTestStats;
