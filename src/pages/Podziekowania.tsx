import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, CheckCircle, Phone, ArrowLeft, User, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSimpleTracking } from '../hooks/useSimpleTracking';

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
  const {
    trackPageView,
    trackConversion
  } = useSimpleTracking();

  // Facebook Pixel - track conversion dla wentrych.pl/podziekowania
  useEffect(() => {
    // Pobierz wariant użytkownika z localStorage
    const variant = localStorage.getItem('ab_test_sms_verification') as 'A' | 'B' || 'A';

    // Simple tracking z wariantem
    trackPageView('thank_you', variant);
    trackConversion('final_thank_you', variant);
    console.log(`🎯 Thank you page: tracked for variant ${variant}`);
    if (typeof window !== 'undefined' && window.fbq) {
      // Track konwersję dla wentrych.pl
      window.fbq('track', 'Lead', {
        content_name: 'Konsultacja umówiona',
        content_category: 'Lead Generation',
        value: 1,
        currency: 'PLN'
      });
      console.log('🎯 Facebook Pixel: Lead conversion tracked for wentrych.pl/podziekowania');
    }
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
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

          {/* Dariusz Wentrych Eksperci Finansowi section */}
          <div className="text-center bg-gradient-to-r from-success-600 to-success-500 text-white p-6 rounded-xl mb-8">
            <div className="flex justify-center items-center mb-4">
              <img src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" alt="Dariusz Wentrych" className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-xl object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Wentrych Eksperci Finansowi</h2>
              <p className="text-sm text-success-100">Twoje zgłoszenie zostało przyjęte</p>
            </div>
          </div>

          {/* Janusz - Expert Contact Section */}
          <div className="bg-gradient-to-r from-business-blue-600 to-navy-900 text-white p-6 md:p-8 rounded-xl mb-8">
            <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-8">
              {/* Janusz Photo */}
              <div className="flex-shrink-0">
                <img src="/lovable-uploads/85aea4b7-a6c9-428e-9787-3f867bd14c94.png" alt="Janusz Gołba - Ekspert ds. Relacji z Klientem" className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl" />
              </div>
              
              {/* Janusz Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
                  <User className="w-6 h-6 text-prestige-gold-400" />
                  <h3 className="text-xl md:text-2xl font-bold">JANUSZ GOŁBA</h3>
                </div>
                <p className="text-base md:text-lg text-blue-100 mb-3">
                  Ekspert ds. Relacji z Klientem
                </p>
                
                {/* Trust message */}
                <p className="text-base md:text-lg text-prestige-gold-200 font-semibold mb-4">
                  Zaufało mi już kilka tysięcy klientów
                </p>
                
                {/* License Info */}
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                  <Award className="w-12 h-12 text-prestige-gold-400" />
                  <div>
                    <p className="text-base md:text-lg text-blue-100 font-medium">Certyfikowany Doradca Kredyt Studio (Wentrych Eksperci Finansowi)</p>
                    <p className="text-sm md:text-base text-blue-200">
                      Licencja nr 3
                    </p>
                    <p className="text-sm md:text-base text-white">
                      Ważność: 08/2030
                    </p>
                  </div>
                </div>
                
                {/* Phone Number */}
                <div className="flex items-center justify-center md:justify-start space-x-3 mt-4 bg-white/10 rounded-lg px-4 py-3">
                  <Phone className="w-5 h-5 text-prestige-gold-400" />
                  <span className="font-bold text-base md:text-lg">
                    +48 786 107 138
                  </span>
                </div>
                
                {/* Personal message */}
                <div className="mt-4 text-center md:text-left">
                  <p className="text-sm md:text-base text-blue-100 font-medium">
                    📞 To ja będę do Ciebie dzwonił i prowadził Twoją sprawę
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call back message */}
          <div className="text-center flex-1 flex flex-col justify-center">
            <Phone className="w-12 h-12 text-navy-900 mx-auto mb-4" />
            <h3 className="text-lg lg:text-xl font-bold text-navy-900 mb-3">
              Oddzwonimy w ciągu 24 godzin
            </h3>
            <p className="text-sm lg:text-base text-navy-700 mb-6">
              Nasz ekspert skontaktuje się z Tobą, aby przeprowadzić bezpłatną konsultację i zaproponować najlepsze rozwiązanie Twojej sytuacji finansowej.
            </p>
            
            {name && email && phone && <div className="bg-warm-neutral-50 rounded-lg p-4 border border-warm-neutral-200 mb-6">
                <p className="text-xs lg:text-sm text-warm-neutral-600">
                  <strong>Twoje dane kontaktowe:</strong><br />
                  Imię: {decodeURIComponent(name)}<br />
                  Email: {decodeURIComponent(email)}<br />
                  Telefon: {decodeURIComponent(phone)}
                </p>
              </div>}
            
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
    </div>;
};
export default Podziekowania;
