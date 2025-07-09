import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, CheckCircle, Phone, ArrowLeft } from 'lucide-react';
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

  const { trackPageView, trackConversion } = useSimpleTracking();

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

          {/* Dariusz and team section */}
          <div className="text-center bg-gradient-to-r from-success-600 to-success-500 text-white p-6 rounded-xl mb-8">
            <div className="flex justify-center items-center mb-4">
              <div className="flex items-center space-x-2">
                {/* Dariusz main photo */}
                <img 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                  alt="Dariusz Wentrych"
                  className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-xl object-cover"
                />
                
                {/* Plus icon */}
                <Plus className="w-3 h-3 text-white" />
                
                {/* Team members */}
                <div className="flex items-center space-x-1">
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarImage 
                      src="/lovable-uploads/763d172c-71d2-4164-a6e6-97c3127b6592.png"
                      alt="Członek zespołu"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-xs">KZ</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarImage 
                      src="/lovable-uploads/cbddfa95-6c86-4139-b791-f13477aaea8a.png"
                      alt="Członek zespołu"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-xs">MK</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarImage 
                      src="/lovable-uploads/73083e2d-4631-4f25-abd0-a482d29bb838.png"
                      alt="Członek zespołu"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-xs">AS</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Zespół Ekspertów ds. Oddłużeń</h2>
              <p className="text-sm text-success-100">Twoje zgłoszenie zostało przyjęte</p>
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
            
            {name && email && phone && (
              <div className="bg-warm-neutral-50 rounded-lg p-4 border border-warm-neutral-200 mb-6">
                <p className="text-xs lg:text-sm text-warm-neutral-600">
                  <strong>Twoje dane kontaktowe:</strong><br />
                  Imię: {decodeURIComponent(name)}<br />
                  Email: {decodeURIComponent(email)}<br />
                  Telefon: {decodeURIComponent(phone)}
                </p>
              </div>
            )}
            
            <Link 
              to="/" 
              className="inline-flex items-center bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 mx-auto"
            >
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
