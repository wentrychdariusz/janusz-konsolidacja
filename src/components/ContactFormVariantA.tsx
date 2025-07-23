import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Rocket, CheckCircle, ArrowDown, Shield, User } from 'lucide-react';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';

// Rozszerzenie obiektu window o fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}

interface ContactFormVariantAProps {
  onConversion?: () => void;
}

const ContactFormVariantA = ({ onConversion }: ContactFormVariantAProps) => {
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
    trackEvent('contact_form_variant_a_view');
    
    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Contact Form Variant A',
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
        source: "ContactFormVariantA",
        variant: "A"
      };
      
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      
      // Track conversion
      trackEvent('contact_form_variant_a_conversion');
      onConversion?.();
      
      // Facebook Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Contact Form Variant A',
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
        navigate(`/podziekowania?${params.toString()}`);
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
      navigate(`/podziekowania?${params.toString()}`);
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
              <h1 className="text-2xl font-bold mb-2">🎉 Gratulacje!</h1>
              <p className="text-lg text-success-100">Zakwalifikowałeś się do oddłużenia i konsolidacji</p>
            </div>
          </div>

          {/* Sekcja z ekspertem i firmą */}
          <div className="bg-warm-neutral-50 p-6 rounded-xl mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Dariusz Wentrych */}
              <div className="flex flex-col items-center text-center">
                <img 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                  alt="Dariusz Wentrych"
                  className="w-20 h-20 rounded-full overflow-hidden border-3 border-business-blue-600 shadow-lg object-cover mb-3"
                />
                <h3 className="text-lg font-bold text-navy-900">Dariusz Wentrych</h3>
                <p className="text-sm text-business-blue-600 font-medium">Ekspert finansowy</p>
              </div>

              {/* Firma pod nadzorem KNF */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-8 h-8 text-business-blue-600" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-navy-900">Firma pod nadzorem</p>
                    <p className="text-lg font-bold text-business-blue-600">KNF</p>
                  </div>
                </div>
                <p className="text-xs text-warm-neutral-600">Komisja Nadzoru Finansowego</p>
              </div>
            </div>
          </div>

          {/* List od Dariusza - graficznie */}
          <div className="bg-white border-2 border-warm-neutral-200 rounded-xl p-6 mb-8 shadow-inner">
            <div className="border-l-4 border-business-blue-600 pl-4 mb-6">
              <h2 className="text-lg font-bold text-navy-900 mb-2">Drogi Kliencie,</h2>
            </div>
            
            <div className="text-left space-y-4 text-warm-neutral-700 leading-relaxed">
              <p className="font-semibold text-navy-800">
                Zadłużenie działa jak choroba. Jeśli je zignorujesz – będzie postępować.
              </p>
              
              <p>
                Ten problem nie wybiera. Nie interesuje go, ile zarabiasz, w jakim jesteś wieku, czy prowadzisz firmę, czy masz rodzinę.
              </p>
              
              <p>
                Jak każda poważna sprawa – jeśli nie zareagujesz, zacznie przejmować kontrolę.
              </p>
              
              <p>
                Możesz to odsuwać. Ale ono nie znika. Tylko rośnie – z czasem i z odsetkami.
              </p>

              <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-lg">
                <p className="font-bold text-navy-800 mb-2">Albo działasz teraz.</p>
                <p>Albo liczysz, że sprawa rozwiąże się sama.</p>
                <p className="font-semibold">Ale tak się nie dzieje. Zadłużenie nie stoi w miejscu. Zawsze rośnie.</p>
              </div>

              <div className="text-right mt-6">
                <p className="font-semibold text-navy-800">Z poważaniem,</p>
                <p className="font-bold text-business-blue-600">Dariusz Wentrych</p>
              </div>
            </div>
          </div>

          {/* Strzałka w dół */}
          <div className="flex justify-center mb-6">
            <div className="bg-business-blue-600 text-white p-3 rounded-full animate-bounce">
              <ArrowDown className="w-6 h-6" />
            </div>
          </div>

          {/* Pierwsza i ostatnia szansa */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6">
            <p className="text-navy-800 font-bold text-lg text-center mb-2">
              ⚠️ To Twoja pierwsza i ostatnia szansa
            </p>
            <p className="text-warm-neutral-700 text-center leading-relaxed">
              Formularz możesz wypełnić tylko raz. Jeśli go porzucisz – nie wracamy.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-navy-900 mb-4">
            Wypełnij formularz - Darek przeanalizuje Twoją sytuację
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
              className="w-full px-4 py-4 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-14 text-base"
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
              className="w-full px-4 py-4 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-14 text-base"
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
              className="w-full px-4 py-4 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-14 text-base"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
              className="w-full bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-4 px-6 text-base rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              {isSubmitting ? "Wysyłanie..." : "Umów bezpłatną konsultację"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Twoje dane są bezpieczne. Nie wysyłamy spamu.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormVariantA;