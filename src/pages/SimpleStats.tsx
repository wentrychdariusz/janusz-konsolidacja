
import React, { useState, useEffect } from 'react';
import { useSimpleTracking } from '../hooks/useSimpleTracking';

const SimpleStats = () => {
  const { getStats, clearStats } = useSimpleTracking();
  const [stats, setStats] = useState(null);

  const refreshStats = () => {
    const currentStats = getStats();
    setStats(currentStats);
    console.log('📊 Current stats:', currentStats);
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const handleClearStats = () => {
    if (confirm('Czy na pewno chcesz wyczyścić wszystkie statystyki?')) {
      clearStats();
      refreshStats();
    }
  };

  if (!stats) {
    return <div className="p-8">Ładowanie statystyk...</div>;
  }

  const conversionRateA = stats.eventsByVariant['conversion_sms_verification_success_A'] || 0;
  const conversionRateB = stats.eventsByVariant['conversion_sms_verification_success_B'] || 0;
  const viewsA = stats.eventsByVariant['page_view_sms_verification_A'] || 0;
  const viewsB = stats.eventsByVariant['page_view_sms_verification_B'] || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Proste Statystyki A/B Test</h1>
            <div className="space-x-4">
              <button
                onClick={refreshStats}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Odśwież
              </button>
              <button
                onClick={handleClearStats}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Wyczyść
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Unikalne Sesje</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.uniqueSessions}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Łączne Eventy</h3>
              <p className="text-3xl font-bold text-green-600">{stats.totalEvents}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Konwersje Ogółem</h3>
              <p className="text-3xl font-bold text-purple-600">
                {conversionRateA + conversionRateB}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Wariant A</h3>
              <div className="space-y-2">
                <p><strong>Wyświetlenia:</strong> {viewsA}</p>
                <p><strong>Konwersje:</strong> {conversionRateA}</p>
                <p><strong>Współczynnik konwersji:</strong> {
                  viewsA > 0 ? ((conversionRateA / viewsA) * 100).toFixed(2) + '%' : '0%'
                }</p>
              </div>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-red-600">Wariant B</h3>
              <div className="space-y-2">
                <p><strong>Wyświetlenia:</strong> {viewsB}</p>
                <p><strong>Konwersje:</strong> {conversionRateB}</p>
                <p><strong>Współczynnik konwersji:</strong> {
                  viewsB > 0 ? ((conversionRateB / viewsB) * 100).toFixed(2) + '%' : '0%'
                }</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Wszystkie Eventy po Typach</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(stats.eventsByType as Record<string, number>).map(([event, count]) => (
                <div key={event} className="flex justify-between">
                  <span>{event}:</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-semibold mb-4">Eventy po Wariantach</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(stats.eventsByVariant as Record<string, number>).map(([event, count]) => (
                <div key={event} className="flex justify-between">
                  <span>{event}:</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStats;
