import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageTracking } from '@/hooks/usePageTracking';

const PodziękowanieBezVIP = () => {
  const [searchParams] = useSearchParams();
  const { trackConversion } = usePageTracking();
  
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';

  useEffect(() => {
    trackConversion('ThankYou Without VIP Page');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border-0 p-6 sm:p-8 lg:p-10">
          
          {/* Header z wizerunkiem Dariusza Wentrycha */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <div className="flex flex-col items-center">
                <img 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
                  alt="Dariusz Wentrych" 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-business-blue-200 shadow-xl object-cover mb-3" 
                />
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-navy-900">Dariusz Wentrych</h3>
                  <p className="text-sm sm:text-base text-business-blue-600 font-medium">#1 Ekspert ds. oddłużeń</p>
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-3">
              ✅ Dziękujemy za rejestrację!
            </h1>
          </div>

          {/* Główna informacja */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 sm:p-6 rounded-lg mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 mb-3">
              Rozumiemy Twoją sytuację
            </h2>
            <p className="text-sm sm:text-base text-navy-700 leading-relaxed mb-3">
              Widzimy, że nie zdecydowałeś się na priorytetową obsługę VIP za 9,90 zł. 
              To w porządku - rozumiemy, że każdy ma swoją sytuację finansową.
            </p>
            <p className="text-sm sm:text-base text-navy-700 leading-relaxed">
              <strong>Mimo wszystko chcemy Ci pomóc!</strong> Twoja sprawa zostanie przekazana 
              do naszego zespołu, jednak realizacja może potrwać dłużej ze względu na kolejkę 
              oczekujących klientów.
            </p>
          </div>

          {/* Co dalej */}
          <div className="bg-gradient-to-br from-warm-neutral-50 to-warm-neutral-100 border-2 border-warm-neutral-300 rounded-xl p-5 sm:p-6 mb-6">
            <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-business-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Co dalej?
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-navy-700">
              <li className="flex items-start gap-3">
                <span className="text-lg">📞</span>
                <span>Nasz doradca skontaktuje się z Tobą w ciągu najbliższych dni</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">📧</span>
                <span>Sprawdzaj email <strong>{email}</strong> - wyślemy szczegóły</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">📱</span>
                <span>Odbierz telefon na numer <strong>{phone}</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">⏰</span>
                <span>Czas realizacji może wynieść od kilku dni do tygodnia</span>
              </li>
            </ul>
          </div>

          {/* Informacja o oczekiwaniu */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
            <p className="text-sm text-yellow-900">
              <strong>⚠️ Uwaga:</strong> Ze względu na dużą liczbę zgłoszeń, czas oczekiwania na 
              kontakt może być wydłużony. Klienci priorytetowi (VIP) obsługiwani są w pierwszej kolejności.
            </p>
          </div>

          {/* Podsumowanie danych */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
            <h4 className="text-sm font-bold text-gray-700 mb-3">Twoje dane rejestracyjne:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              {name && (
                <div className="flex justify-between">
                  <span className="font-medium">Imię i nazwisko:</span>
                  <span>{name}</span>
                </div>
              )}
              {email && (
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex justify-between">
                  <span className="font-medium">Telefon:</span>
                  <span>{phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-500">
              Dziękujemy za zaufanie. Skontaktujemy się z Tobą najszybciej jak to możliwe.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PodziękowanieBezVIP;
