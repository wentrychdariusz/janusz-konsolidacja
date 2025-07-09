
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, TrendingUp, Users, MousePointer, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ABTestStats = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    variantA: {
      views: 0,
      conversions: 0,
      conversionRate: 0
    },
    variantB: {
      views: 0,
      conversions: 0,
      conversionRate: 0
    }
  });

  // Hasło do dostępu (można zmienić)
  const ADMIN_PASSWORD = 'wentrych2024';

  // Sprawdź czy użytkownik jest już zalogowany
  useEffect(() => {
    const authenticated = localStorage.getItem('ab_test_auth');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Pobierz statystyki z localStorage
  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
      // Odświeżaj co 30 sekund
      const interval = setInterval(loadStats, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const loadStats = () => {
    const variantAViews = parseInt(localStorage.getItem('ab_variant_a_views') || '0');
    const variantAConversions = parseInt(localStorage.getItem('ab_variant_a_conversions') || '0');
    const variantBViews = parseInt(localStorage.getItem('ab_variant_b_views') || '0');
    const variantBConversions = parseInt(localStorage.getItem('ab_variant_b_conversions') || '0');

    setStats({
      variantA: {
        views: variantAViews,
        conversions: variantAConversions,
        conversionRate: variantAViews > 0 ? (variantAConversions / variantAViews * 100) : 0
      },
      variantB: {
        views: variantBViews,
        conversions: variantBConversions,
        conversionRate: variantBViews > 0 ? (variantBConversions / variantBViews * 100) : 0
      }
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('ab_test_auth', 'true');
      setError('');
    } else {
      setError('Nieprawidłowe hasło');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ab_test_auth');
    setPassword('');
  };

  const resetStats = () => {
    if (confirm('Czy na pewno chcesz zresetować wszystkie statystyki?')) {
      localStorage.removeItem('ab_variant_a_views');
      localStorage.removeItem('ab_variant_a_conversions');
      localStorage.removeItem('ab_variant_b_views');
      localStorage.removeItem('ab_variant_b_conversions');
      loadStats();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Dostęp do statystyk A/B</CardTitle>
            <CardDescription className="text-center">
              Wprowadź hasło, aby uzyskać dostęp do statystyk testów A/B
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Wprowadź hasło"
                  className="w-full px-4 py-3 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Zaloguj się
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalViews = stats.variantA.views + stats.variantB.views;
  const totalConversions = stats.variantA.conversions + stats.variantB.conversions;
  const overallConversionRate = totalViews > 0 ? (totalConversions / totalViews * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Statystyki Testów A/B</h1>
            <p className="text-warm-neutral-600 mt-2">Panel administracyjny - dane w czasie rzeczywistym</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetStats}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Reset statystyk
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Wyloguj
            </button>
          </div>
        </div>

        {/* Ogólne statystyki */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Łączne wyświetlenia</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Łączne konwersje</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConversions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ogólna konwersja</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallConversionRate.toFixed(2)}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Test aktywny</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">TAK</div>
            </CardContent>
          </Card>
        </div>

        {/* Porównanie wariantów */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wariant A */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Wariant A (Oryginalny)</CardTitle>
              <CardDescription className="text-center">Obecna wersja strony</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats.variantA.conversionRate.toFixed(2)}%
                </div>
                <p className="text-gray-600">Współczynnik konwersji</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800">{stats.variantA.views}</div>
                  <div className="text-sm text-blue-600">Wyświetlenia</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">{stats.variantA.conversions}</div>
                  <div className="text-sm text-green-600">Konwersje</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wariant B */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Wariant B (Test)</CardTitle>
              <CardDescription className="text-center">Nowa wersja do testowania</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {stats.variantB.conversionRate.toFixed(2)}%
                </div>
                <p className="text-gray-600">Współczynnik konwersji</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-800">{stats.variantB.views}</div>
                  <div className="text-sm text-purple-600">Wyświetlenia</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">{stats.variantB.conversions}</div>
                  <div className="text-sm text-green-600">Konwersje</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wyniki testu */}
        {totalViews > 10 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Analiza wyników</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                {stats.variantA.conversionRate > stats.variantB.conversionRate ? (
                  <div className="text-blue-600">
                    <div className="text-2xl font-bold mb-2">Wariant A prowadzi!</div>
                    <p>Oryginalny wariant ma wyższą konwersję o {(stats.variantA.conversionRate - stats.variantB.conversionRate).toFixed(2)} punktów procentowych</p>
                  </div>
                ) : stats.variantB.conversionRate > stats.variantA.conversionRate ? (
                  <div className="text-purple-600">
                    <div className="text-2xl font-bold mb-2">Wariant B prowadzi!</div>
                    <p>Testowy wariant ma wyższą konwersję o {(stats.variantB.conversionRate - stats.variantA.conversionRate).toFixed(2)} punktów procentowych</p>
                  </div>
                ) : (
                  <div className="text-gray-600">
                    <div className="text-2xl font-bold mb-2">Remis!</div>
                    <p>Oba warianty mają identyczną konwersję</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          Ostatnia aktualizacja: {new Date().toLocaleString('pl-PL')}
        </div>
      </div>
    </div>
  );
};

export default ABTestStats;
