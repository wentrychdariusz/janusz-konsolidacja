import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}



const KontaktNowy = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [spotsLeft] = useState(() => Math.floor(Math.random() * 3) + 2);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const salaryRange = searchParams.get('salary_range') || '';
  const debtRange = searchParams.get('debt_range') || '';
  const hasBik = searchParams.get('has_bik') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);

    try {
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

      // Ten sam redirect co ContactFormVariantA
      setTimeout(() => {
        const params = new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          salary_range: salaryRange,
          debt_range: debtRange,
          has_bik: hasBik,
        });
        navigate(`/podziekowanie-nowy?${params.toString()}`);
      }, 2000);

    } catch (error) {
      console.error('Contact form submission error:', error);
      // Redirect nawet przy błędzie — tak samo jak oryginał
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        salary_range: salaryRange,
        debt_range: debtRange,
        has_bik: hasBik,
      });
      navigate(`/podziekowanie-nowy?${params.toString()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy-900 mb-3">Dziękujemy!</h2>
          <p className="text-warm-neutral-600">Twoje dane zostały przesłane. Przekierowujemy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-lato min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Urgency banner */}
        <div className="bg-navy-900 text-white text-center py-3 px-4 rounded-t-2xl font-bold text-lg sm:text-xl">
          📅 Zarezerwuj konsultację z naszym ekspertem
        </div>

        <div className="bg-white rounded-b-2xl shadow-2xl p-6 sm:p-8">

          {/* Avatar + heading */}
          <div className="text-center mb-6">
            <img
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
              alt="Dariusz Wentrych"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-business-blue-200 shadow-lg object-cover mx-auto mb-4"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
              Wypełnij formularz i otrzymaj pomoc
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-1">Imię i nazwisko *</label>
              <input
                type="text"
                name="name"
                placeholder="Wpisz swoje imię i nazwisko"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-5 py-4 text-lg border-2 border-warm-neutral-200 rounded-xl focus:border-business-blue-500 focus:ring-2 focus:ring-business-blue-200 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="twoj@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-5 py-4 text-lg border-2 border-warm-neutral-200 rounded-xl focus:border-business-blue-500 focus:ring-2 focus:ring-business-blue-200 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-1">Telefon *</label>
              <input
                type="tel"
                name="phone"
                placeholder="+48 123 456 789"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-5 py-4 text-lg border-2 border-warm-neutral-200 rounded-xl focus:border-business-blue-500 focus:ring-2 focus:ring-business-blue-200 outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 sm:py-5 text-xl sm:text-2xl rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wysyłam...' : 'Zapisz się na konsultację'}
            </button>
          </form>

          {/* Trust signals */}
          <div className="mt-6 space-y-2 text-center text-warm-neutral-500 text-sm">
            <p>✅ Bez zobowiązań — darmowa rozmowa</p>
            <p>🔒 Twoje dane są bezpieczne</p>
            <p>⭐ 15 000+ zadowolonych klientów</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontaktNowy;
