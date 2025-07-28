import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface SuspiciousBehavior {
  id: string;
  session_id: string;
  form_type: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  suspicious_categories: string[];
  income_reported: number;
  total_debt_reported: number;
  income_to_debt_ratio: number;
  behavioral_patterns: any;
  created_at: string;
}

const SuspiciousAnalysis = () => {
  const [suspiciousData, setSuspiciousData] = useState<SuspiciousBehavior[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const CORRECT_PASSWORD = 'Tykurwo6913!';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      // Zapisz w sessionStorage żeby nie pytać ponownie w tej sesji
      sessionStorage.setItem('suspicious_analysis_auth', 'true');
    } else {
      setAuthError('Nieprawidłowe hasło');
      setPassword('');
    }
  };

  useEffect(() => {
    // Sprawdź czy już był zalogowany w tej sesji
    const wasAuthenticated = sessionStorage.getItem('suspicious_analysis_auth');
    if (wasAuthenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSuspiciousData();
    }
  }, [isAuthenticated]);

  const fetchSuspiciousData = async () => {
    try {
      const { data, error } = await supabase
        .from('suspicious_behavior_analysis')
        .select('*')
        .in('risk_level', ['medium', 'high', 'critical']) // Tylko podejrzane
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setSuspiciousData(data as SuspiciousBehavior[] || []);
    } catch (error) {
      console.error('Error fetching suspicious data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-800';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '⚡';
      default: return '📊';
    }
  };

  // Jeśli nie zalogowany, pokaż ekran logowania
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-navy-900 to-business-blue-600 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-navy-900 mb-2">
              Analiza Podejrzanych Zachowań
            </CardTitle>
            <p className="text-warm-neutral-600">
              Wprowadź hasło aby uzyskać dostęp
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-navy-700 font-medium">
                  Hasło dostępu
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Wprowadź hasło"
                    className="pr-10 border-2 border-gray-300 focus:border-business-blue-500 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">
                    {authError}
                  </p>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold"
              >
                Zaloguj się
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy-900 mx-auto mb-4"></div>
          <p className="text-navy-700 text-lg">Ładowanie analizy podejrzanych zachowań...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-navy-900">🔍 Analiza Podejrzanych Zachowań</h1>
          <Button 
            onClick={() => {
              sessionStorage.removeItem('suspicious_analysis_auth');
              setIsAuthenticated(false);
            }}
            variant="outline"
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            Wyloguj
          </Button>
        </div>
      
      <div className="grid gap-4">
        {suspiciousData.map((behavior) => (
          <Card 
            key={behavior.id} 
            className={`border-2 ${getRiskColor(behavior.risk_level)}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getRiskIcon(behavior.risk_level)}
                Sesja: {behavior.session_id.slice(-8)}
                <span className="text-sm bg-white px-2 py-1 rounded">
                  {behavior.risk_level.toUpperCase()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="font-semibold">Dochód:</p>
                  <p>{behavior.income_reported?.toLocaleString()} PLN</p>
                </div>
                <div>
                  <p className="font-semibold">Zadłużenie:</p>
                  <p>{behavior.total_debt_reported?.toLocaleString()} PLN</p>
                </div>
                <div>
                  <p className="font-semibold">Stosunek:</p>
                  <p>{behavior.income_to_debt_ratio ? `${(behavior.income_to_debt_ratio * 100).toFixed(0)}%` : 'N/A'}</p>
                </div>
                <div>
                  <p className="font-semibold">Data:</p>
                  <p>{new Date(behavior.created_at).toLocaleString('pl-PL')}</p>
                </div>
              </div>

              {behavior.suspicious_categories.length > 0 && (
                <div className="mb-4">
                  <p className="font-semibold mb-2">Kategorie podejrzeń:</p>
                  <div className="flex flex-wrap gap-2">
                    {behavior.suspicious_categories.map((category, index) => (
                      <span 
                        key={index}
                        className="bg-red-200 text-red-800 px-2 py-1 rounded text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {behavior.behavioral_patterns?.inconsistencies?.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">🚨 Wykryte niespójności:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {behavior.behavioral_patterns.inconsistencies.map((inconsistency: string, index: number) => (
                      <li key={index} className="text-red-700 text-sm">
                        {inconsistency}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {suspiciousData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Brak podejrzanych zachowań do wyświetlenia</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default SuspiciousAnalysis;