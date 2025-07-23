import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Rocket, CheckCircle, Users, Shield, Clock, ArrowDown } from 'lucide-react';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';

// Rozszerzenie obiektu window o fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}

interface ContactFormVariantBProps {
  onConversion?: () => void;
}

const ContactFormVariantB = ({ onConversion }: ContactFormVariantBProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { trackEvent } = useSupabaseTracking();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Webhook URL
  const webhookUrl = "https://hook.eu2.make.com/yusy3i37uoiv14b2dx1zv6wro898d9q5";

  useEffect(() => {
    // Track page view
    trackEvent('contact_form_variant_b_view');
    
    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Contact Form Variant B',
        content_category: 'Lead Generation'
      });
    }
  }, [trackEvent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) return;
    
    setIsSubmitting(true);
    
    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        timestamp: new Date().toISOString(),
        source: "ContactFormVariantB",
        variant: "B"
      };
      
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      
      // Track conversion - formularz kontaktowy wypełniony
      trackEvent('contact_form_variant_b_conversion');
      trackEvent('contact_form_completed', 'B', 'contact_form_test');
      onConversion?.();
      
      // Facebook Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Contact Form Variant B',
          content_category: 'Lead Generation',
          value: 1,
          currency: 'PLN'
        });
      }
      
      setSubmitSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        const params = new URLSearchParams({
          success: 'true',
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        });
        navigate(`/sms-verification?${params.toString()}`);
      }, 2000);
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      // Still track as conversion for testing
      onConversion?.();
      
      // Redirect even on error
      const params = new URLSearchParams({
        success: 'true',
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      navigate(`/sms-verification?${params.toString()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border-0 p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-success-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy-900 mb-3">
            Dziękujemy!
          </h2>
          <p className="text-warm-neutral-600">
            Twoje dane zostały przesłane. Przekierowujemy...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 max-w-lg w-full">
        {/* Header - Kwalifikacja */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-success-600 to-success-500 p-6 rounded-xl mb-6">
            <div className="text-white">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">🎉 Gratulacje!</h1>
              <p className="text-lg lg:text-xl text-success-100">Zakwalifikowałeś się do oddłużenia i konsolidacji</p>
            </div>
          </div>

          {/* Ekspert i firma */}
          <div className="bg-warm-neutral-50 p-6 rounded-xl mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Dariusz Wentrych */}
              <div className="flex flex-col items-center text-center">
                <img 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                  alt="Dariusz Wentrych"
                  className="w-20 h-20 rounded-full overflow-hidden border-3 border-business-blue-600 shadow-lg object-cover mb-3"
                />
                <h3 className="text-lg font-bold text-navy-900">Dariusz Wentrych</h3>
                <p className="text-sm text-business-blue-600 font-medium">#1 ekspert oddłużeń i konsolidacji</p>
                <p className="text-xs text-warm-neutral-600 mt-1">Autor bestsellera</p>
                <p className="text-xs font-semibold text-navy-800">"Nowe życie bez długów"</p>
              </div>

              {/* Statystyki */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-business-blue-600">15.000+</p>
                    <p className="text-xs text-warm-neutral-600">zadowolonych klientów</p>
                  </div>
                  <div className="w-px h-12 bg-warm-neutral-300"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-business-blue-600">20+</p>
                    <p className="text-xs text-warm-neutral-600">lat na rynku</p>
                  </div>
                </div>
              </div>

              {/* Firma pod nadzorem KNF */}
              <div className="flex flex-col items-center text-center">
                <img 
                  src="/lovable-uploads/e275ad04-dbd9-4823-8abb-025d0d50bda9.png"
                  alt="KNF - Komisja Nadzoru Finansowego"
                  className="h-20 lg:h-16 w-auto mb-3 object-contain"
                />
                <p className="text-sm lg:text-xs text-warm-neutral-600 font-medium">Firma pod nadzorem</p>
                <p className="text-sm lg:text-xs font-bold text-navy-800">Komisji Nadzoru Finansowego</p>
              </div>
            </div>
          </div>

          {/* Strzałka w dół */}
          <div className="flex justify-center mb-6">
            <div className="bg-business-blue-600 text-white p-3 rounded-full animate-bounce">
              <ArrowDown className="w-6 h-6" />
            </div>
          </div>

          {/* Wartość konsultacji */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-navy-900 mb-4 text-center">Wartość tej konsultacji?</h3>
            <div className="text-center mb-6">
              <p className="text-lg lg:text-xl text-warm-neutral-700 mb-2">U nas godzina doradztwa kosztuje:</p>
              <p className="text-3xl lg:text-4xl font-bold text-red-500 line-through mb-3">500 zł</p>
              <p className="text-lg lg:text-xl text-warm-neutral-700 mb-2">Dla Ciebie teraz:</p>
              <p className="text-5xl lg:text-6xl font-bold text-success-600 mb-3">0 zł</p>
              <p className="text-lg lg:text-xl text-red-600 font-bold">Ale tylko raz!</p>
            </div>
            
            <div className="text-left space-y-4">
              <p className="text-lg lg:text-xl font-bold text-navy-900 mb-4">Dlaczego warto? Bo zrobimy coś, czego nie da Ci konkurencja:</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-success-600 font-bold text-lg">✔️</span>
                  <p className="text-base lg:text-lg text-warm-neutral-700">Przeanalizujemy Twoją sytuację i wymyślimy realny plan wyjścia z zadłużenia</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-success-600 font-bold text-lg">✔️</span>
                  <p className="text-base lg:text-lg text-warm-neutral-700">Pokażemy, jak poprawić Twój BIK i zwiększyć zdolność finansową</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-success-600 font-bold text-lg">✔️</span>
                  <p className="text-base lg:text-lg text-warm-neutral-700">Pomożemy uzyskać najlepszą możliwą pożyczkę — nie pierwszą z brzegu</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-success-600 font-bold text-lg">✔️</span>
                  <p className="text-base lg:text-lg text-warm-neutral-700">Mamy dostęp do prywatnego finansowania, niedostępnego w bankach</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-success-600 font-bold text-lg">✔️</span>
                  <p className="text-base lg:text-lg text-warm-neutral-700">I wszystko w pełnej dyskrecji — bez ocen, bez nacisku, z pełnym szacunkiem</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-lg lg:text-xl font-bold text-navy-900 mb-2">To szansa, której nie daje Ci nikt inny.</p>
                <p className="text-base lg:text-lg text-warm-neutral-700">Wypełnij formularz i zobacz, że to działa.</p>
              </div>
            </div>
          </div>

          {/* Strzałka w dół */}
          <div className="flex justify-center mb-6">
            <div className="bg-business-blue-600 text-white p-3 rounded-full animate-bounce">
              <ArrowDown className="w-6 h-6" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-navy-900 mb-4">
            Wypełnij formularz i zapisz się na bezpłatną konsultację
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-base font-medium text-navy-800 mb-2">
              Imię i nazwisko <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Wpisz swoje imię i nazwisko"
              required
              className="w-full px-4 py-4 border-2 border-warm-neutral-300 rounded-xl focus:border-success-500 focus:ring-2 focus:ring-success-200 h-14 text-base transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-base font-medium text-navy-800 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="twoj@email.com"
              required
              className="w-full px-4 py-4 border-2 border-warm-neutral-300 rounded-xl focus:border-success-500 focus:ring-2 focus:ring-success-200 h-14 text-base transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-base font-medium text-navy-800 mb-2">
              Telefon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+48 123 456 789"
              required
              className="w-full px-4 py-4 border-2 border-warm-neutral-300 rounded-xl focus:border-success-500 focus:ring-2 focus:ring-success-200 h-14 text-base transition-all duration-200"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
              className="w-full bg-gradient-to-r from-success-700 to-success-600 hover:from-success-800 hover:to-success-700 text-white font-bold py-4 px-6 text-base rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              {isSubmitting ? "Wysyłanie..." : "Umów bezpłatną konsultację"}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Twoje dane są bezpieczne. Nie wysyłamy spamu.
              </p>
              <p className="text-xs text-success-600 font-medium mt-1">
                ✅ Konsultacja jest w 100% bezpłatna i bez zobowiązań
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormVariantB;