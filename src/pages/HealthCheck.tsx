import React from 'react';
import FinancialHealthCheck from '@/components/FinancialHealthCheck';
import { usePageTracking } from '@/hooks/usePageTracking';

const HealthCheck = () => {
  const { trackPageView } = usePageTracking();

  React.useEffect(() => {
    trackPageView('Financial Health Check');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-navy-900 mb-2">
              💚 Twój Finansowy Health Check
            </h1>
            <p className="text-warm-neutral-600">
              Oceń swoją kondycję finansową w 2 minuty
            </p>
          </div>
          <FinancialHealthCheck />
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;