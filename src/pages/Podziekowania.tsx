import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSimpleTracking } from '../hooks/useSimpleTracking';
import teamPhoto from '@/assets/team-photo.jpg';

// Rozszerzenie obiektu window o fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}

const Podziekowania = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  const isPaidTest = searchParams.get('paid') === 'true';
  const paymentStatusFromUrl = searchParams.get('payment_status') || 'Nieopłacone';

  const {
    trackPageView,
    trackConversion
  } = useSimpleTracking();

  // Facebook Pixel + Webhook - wszystko w jednym useEffect
  useEffect(() => {
    // Jeśli jest parametr paid=true, ustaw status płatności
    if (isPaidTest) {
      localStorage.setItem('payment_status', 'Opłacone');
      localStorage.setItem('sms_verified_timestamp', Date.now().toString());
    }

    // Pobierz dane z localStorage
    let effectiveName = name;
    let effectiveEmail = email;
    let effectivePhone = phone;
    
    // Fallback z localStorage
    const savedUserData = localStorage.getItem('user_data');
    if ((!effectiveName || !effectiveEmail || !effectivePhone) && savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        effectiveName = effectiveName || userData.name || '';
        effectiveEmail = effectiveEmail || userData.email || '';
        effectivePhone = effectivePhone || userData.phone || '';
      } catch (e) {
        console.error('Error parsing user_data from localStorage:', e);
      }
    }

    // Track dla Facebook Pixel
    const variant = localStorage.getItem('ab_test_sms_verification') as 'A' | 'B' || 'A';
    trackPageView('thank_you', variant);
    trackConversion('final_thank_you', variant);
    console.log(`🎯 Thank you page: tracked for variant ${variant}`);
    
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Konsultacja umówiona',
        content_category: 'Lead Generation',
        value: 1,
        currency: 'PLN'
      });
      console.log('🎯 Facebook Pixel: Lead conversion tracked for wentrych.pl/podziekowania');
    }

    // Wyślij webhook do Make.com
    const sendWebhook = async () => {
      try {
        const webhookUrl = 'https://hook.eu2.make.com/janusz-go-ba-63dd01e7';

        // Oczyść dane z potencjalnych problemów
        const cleanString = (str: string) => {
          if (!str) return 'Nie podano';
          return str.trim().replace(/[\r\n\t]/g, ' ');
        };

        const payload = {
          rows: [{
            name: cleanString(effectiveName),
            phone: cleanString(effectivePhone),
            email: cleanString(effectiveEmail),
            payment_status: paymentStatusFromUrl,
          }]
        };

        console.log('📤 Sending webhook from /podziekowania:', payload);
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        console.log('✅ Webhook response status:', res.status);
      } catch (err) {
        console.error('❌ Webhook error (/podziekowania):', err);
      }
    };
    
    sendWebhook();
  }, [name, email, phone]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[600px] w-full">
          
          {/* Success header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-6">
              <CheckCircle className="w-16 h-16 text-success-600" />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-success-600 mb-3">
              Dziękujemy za zgłoszenie!
            </h1>
            <p className="text-warm-neutral-600 text-sm lg:text-base">
              Twoje dane zostały przesłane. Nasz ekspert skontaktuje się z Tobą wkrótce.
            </p>
          </div>

          {/* Team Section */}
          <div className="bg-gradient-to-r from-business-blue-600 to-navy-900 text-white p-6 md:p-8 rounded-xl mb-8">
            <div className="flex flex-col items-center space-y-6">
              {/* Team Photo */}
              <div className="w-full max-w-md">
                <img 
                  src={teamPhoto} 
                  alt="Nasz zespół ekspertów finansowych" 
                  className="w-full h-auto rounded-lg shadow-xl border-4 border-white"
                />
              </div>
              
              {/* Team Info */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Nasz Zespół Ekspertów
                </h3>
                <p className="text-lg md:text-xl text-blue-100 mb-4">
                  Wentrych Eksperci Finansowi
                </p>
                
                {/* Quick Contact Message */}
                <div className="bg-white/10 rounded-lg px-6 py-4 mt-6">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <Clock className="w-6 h-6 text-prestige-gold-400" />
                    <p className="text-lg md:text-xl font-bold">
                      Skontaktujemy się z Tobą już wkrótce!
                    </p>
                  </div>
                  <p className="text-base md:text-lg text-blue-100">
                    Nasz ekspert odezwie się do Ciebie w najbliższym czasie, aby pomóc rozwiązać Twoją sytuację finansową.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call back message */}
          <div className="text-center flex-1 flex flex-col justify-center">
            <h3 className="text-lg lg:text-xl font-bold text-navy-900 mb-3">
              Twoja sprawa jest już w naszych rękach
            </h3>
            <p className="text-sm lg:text-base text-navy-700 mb-6">
              Nasz ekspert skontaktuje się z Tobą, aby omówić szczegóły i zaproponować najlepsze rozwiązanie Twojej sytuacji finansowej.
            </p>
            
            {name && email && (
              <div className="bg-warm-neutral-50 rounded-lg p-4 border border-warm-neutral-200 mb-6">
                <p className="text-xs lg:text-sm text-warm-neutral-600">
                  <strong>Twoje dane kontaktowe:</strong><br />
                  Imię: {decodeURIComponent(name)}<br />
                  Email: {decodeURIComponent(email)}
                </p>
              </div>
            )}
            
            <Link to="/" className="inline-flex items-center bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 mx-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Wróć na stronę główną
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-warm-neutral-500">
              Dziękujemy za zaufanie. Twoje dane są bezpieczne i nie będą udostępniane osobom trzecim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podziekowania;
