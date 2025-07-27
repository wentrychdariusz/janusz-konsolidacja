import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  useEffect(() => {
    fetchSuspiciousData();
  }, []);

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

  if (loading) {
    return <div className="p-6">Ładowanie analizy podejrzanych zachowań...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔍 Analiza Podejrzanych Zachowań</h1>
      
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
  );
};

export default SuspiciousAnalysis;