import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const webhookUrl = "https://hook.eu2.make.com/yusy3i37uoiv14b2dx1zv6wro898d9q5";

const KontaktNowy = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [spotsLeft] = useState(() => Math.floor(Math.random() * 3) + 2); // 2-4
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const salaryRange = searchParams.get('salary_range') || '';
  const debtRange = searchParams.get('debt_range') || '';
  const hasBik = searchParams.get('has_bik') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          salary_range: salaryRange,
          debt_range: debtRange,
          has_bik: hasBik,
          timestamp: new Date().toISOString(),
          source: 'kontakt-nowy',
        }),
      });
    } catch (err) {
      console.error('Webhook error:', err);
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      navigate(`/podziekowania?name=${encodeURIComponent(formData.name)}&phone=${encodeURIComponent(formData.phone)}`);
    }, 1500);

    setIsSubmitting(false);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Gotowe! Przekierowuję...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="font-lato min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Urgency banner */}
        <div className="bg-red-600 text-white text-center py-3 px-4 rounded-t-2xl font-bold text-lg sm:text-xl animate-pulse">
          🔥 Zostały tylko {spotsLeft} wolne miejsca na konsultację!
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
              Zarezerwuj darmową konsultację
            </h1>
            <p className="text-warm-neutral-600 text-base sm:text-lg">
              Podaj imię i numer — oddzwonimy w ciągu <strong>24h</strong>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Twoje imię"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-5 py-4 text-lg border-2 border-warm-neutral-200 rounded-xl focus:border-business-blue-500 focus:ring-2 focus:ring-business-blue-200 outline-none transition-all"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Numer telefonu"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-5 py-4 text-lg border-2 border-warm-neutral-200 rounded-xl focus:border-business-blue-500 focus:ring-2 focus:ring-business-blue-200 outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.phone}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 sm:py-5 text-xl sm:text-2xl rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wysyłam...' : '📞 Zadzwońcie do mnie'}
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
