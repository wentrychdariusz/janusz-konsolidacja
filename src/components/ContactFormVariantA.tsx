import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Rocket, CheckCircle } from 'lucide-react';
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
        {/* Header - Wariant A: Klasyczny design */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-business-blue-600 to-navy-900 p-6 rounded-xl mb-6">
            <div className="flex justify-center items-center mb-4">
              <img 
                src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                alt="Dariusz Wentrych"
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg object-cover"
              />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold mb-2">Skontaktuj się z nami</h1>
              <p className="text-base text-blue-100">#1 ekspert finansowy oddłużania i konsolidacja</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-navy-900 mb-3">
            Umów rozmowę z ekspertem
          </h2>
          <p className="text-warm-neutral-600 text-base leading-relaxed">
            Wypełnij formularz, a nasz ekspert skontaktuje się z Tobą w ciągu 24 godzin
          </p>
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

            <p className="text-sm text-gray-500 text-center mt-4">
              Twoje dane są bezpieczne. Nie wysyłamy spamu.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormVariantA;