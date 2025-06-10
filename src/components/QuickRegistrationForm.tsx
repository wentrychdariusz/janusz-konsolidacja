
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';

const QuickRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://eu-submit.jotform.com/submit/251483072317353', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          q3_name: formData.name,
          q4_email: formData.email,
          q5_contactNumber5: formData.phone,
        }),
      });

      if (response.ok) {
        toast({
          title: "Sukces!",
          description: "Dziękuję za zgłoszenie! Odezwę się najszybciej jak to możliwe.",
        });
        setFormData({ name: "", email: "", phone: "" });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Wystąpił problem z wysłaniem formularza. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white shadow-xl border-0 w-full max-w-md mx-auto rounded-lg overflow-hidden">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-navy-900 to-business-blue-600 text-white rounded-t-lg pb-4 pt-6">
        <div className="flex justify-center mb-4">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face" 
            alt="Magda Soska" 
            className="w-14 h-14 rounded-full overflow-hidden border-3 border-prestige-gold-400 shadow-xl"
          />
        </div>
        <h3 className="text-lg font-bold text-white">Magda Soska</h3>
        <p className="text-sm text-prestige-gold-300">Ekspert w zarabianiu online</p>
        
        <div className="mt-4 px-4">
          <h2 className="text-lg font-bold">Zapisz się na konsultację</h2>
          <p className="text-sm text-prestige-gold-300 mt-2 font-medium">
            Pokażę ci jak zarobić od 5 do 15 tysięcy miesięcznie
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        <div className="text-center bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">
            Wypełnij formularz, a odezwę się najszybciej jak to możliwe
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-navy-800">
              Imię <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Wpisz swoje imię"
              required
              className="mt-1 border-warm-neutral-300 focus:border-navy-600 focus:ring-navy-600 h-10"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-navy-800">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="twoj@email.com"
              required
              className="mt-1 border-warm-neutral-300 focus:border-navy-600 focus:ring-navy-600 h-10"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-navy-800">
              Telefon <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+48 123 456 789"
              required
              className="mt-1 border-warm-neutral-300 focus:border-navy-600 focus:ring-navy-600 h-10"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-navy-900 to-navy-700 hover:from-navy-800 hover:to-navy-600 text-white font-bold text-lg md:text-xl rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 h-14 md:h-16"
          >
            {isSubmitting ? 'Wysyłanie...' : '🚀 Umów rozmowę'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuickRegistrationForm;
