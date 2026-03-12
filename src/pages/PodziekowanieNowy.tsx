import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageTracking } from '@/hooks/usePageTracking';

const PodziekowanieNowy = () => {
  const [searchParams] = useSearchParams();
  const { trackConversion } = usePageTracking();
  
  let name = searchParams.get('name') || '';
  let email = searchParams.get('email') || '';
  let phone = searchParams.get('phone') || '';
  const salaryRange = searchParams.get('salary_range') || '';
  const debtRange = searchParams.get('debt_range') || '';
  const hasBik = searchParams.get('has_bik') || '';
  
  if (!name || !email || !phone) {
    const savedUserData = localStorage.getItem('user_data');
    if (savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        name = name || userData.name || '';
        email = email || userData.email || '';
        phone = phone || userData.phone || '';
      } catch (e) {
        console.error('Error parsing user_data from localStorage:', e);
      }
    }
  }

  useEffect(() => {
    trackConversion('ThankYou Nowy Page');
    
    const sendWebhook = async () => {
      const webhookUrl = 'https://hook.eu2.make.com/yusy3i37uoiv14b2dx1zv6wro898d9q5';
      
      const webhookPayload = {
        name: name || 'Nie podano',
        phone: phone || 'Nie podano',
        email: email || 'Nie podano',
        source: 'podziekowanie_nowy',
        salary_range: salaryRange,
        debt_range: debtRange,
        has_bik: hasBik,
        salaryRange,
        debtRange,
        hasBik,
        timestamp: new Date().toISOString(),
      };
      
      try {
        console.log('📤 Sending webhook from PodziekowanieNowy:', webhookPayload);
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload)
        });
        console.log('✅ Webhook sent successfully');
      } catch (error) {
        console.error('❌ Webhook error:', error);
      }
    };
    
    sendWebhook();
  }, [name, email, phone]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-6">
            <img 
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
              alt="Dariusz Wentrych" 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-business-blue-200 shadow-xl object-cover mx-auto mb-3" 
            />
            <h3 className="text-lg sm:text-xl font-bold text-navy-900">Dariusz Wentrych</h3>
            <p className="text-sm sm:text-base text-business-blue-600 font-medium mb-4">#1 Ekspert ds. oddłużeń</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-900">
              ✅ Dziękujemy{name ? `, ${decodeURIComponent(name)}` : ''}!
            </h1>
          </div>

          {/* Główna informacja */}
          <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 mb-2">
              Twoje zgłoszenie zostało przyjęte
            </h2>
            <p className="text-sm sm:text-base text-navy-700 leading-relaxed">
              Nasz ekspert przeanalizuje Twoją sytuację i skontaktuje się z Tobą najszybciej jak to możliwe.
            </p>
          </div>

          {/* Co dalej */}
          <div className="bg-warm-neutral-50 border-2 border-warm-neutral-200 rounded-xl p-5 mb-6">
            <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-4">
              📋 Co dalej?
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-navy-700">
              <li className="flex items-start gap-3">
                <span className="text-lg">📞</span>
                <span>Nasz doradca zadzwoni do Ciebie w ciągu <strong>24 godzin</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">📧</span>
                <span>Sprawdzaj skrzynkę email — wyślemy szczegóły</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">📱</span>
                <span>Odbierz telefon od naszego doradcy</span>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-warm-neutral-200">
            <p className="text-xs sm:text-sm text-warm-neutral-500">
              Dziękujemy za zaufanie. Pomagamy tysiącom Polaków wyjść z długów.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PodziekowanieNowy;
