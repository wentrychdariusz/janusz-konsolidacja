
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Basia",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      text: "Dzięki systemowi Magdy zarabiam teraz 12 tysięcy miesięcznie! To zmieniło moje życie.",
      gradient: "from-prestige-gold-400 via-prestige-gold-300 to-yellow-200",
      earnings: "12 000 zł/mies"
    },
    {
      name: "Ania",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face",
      text: "Nie wierzyłam, że to możliwe. Po 2 miesiącach zarabiam już 8 tysięcy dodatkowo!",
      gradient: "from-business-blue-400 via-business-blue-300 to-blue-200",
      earnings: "8 000 zł/mies"
    }
  ];

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 text-prestige-gold-500 fill-current" />
    ));
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-16 md:py-24">
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
            Co mówią moje <span className="text-business-blue-500">podopieczne</span>
          </h2>
          <p className="text-warm-neutral-600 text-lg max-w-2xl mx-auto font-lato">
            Prawdziwe historie kobiet, które zmieniły swoje życie dzięki mojemu systemowi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${testimonial.gradient} p-6 text-center`}>
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <h3 className="text-white font-bold text-xl font-montserrat">{testimonial.name}</h3>
                <div className="text-white/90 font-semibold text-lg mt-1">{testimonial.earnings}</div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  {renderStars()}
                </div>
                <p className="text-warm-neutral-700 text-base leading-relaxed font-lato text-center">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-warm-neutral-600 font-medium font-lato">
            Dołącz do grona zadowolonych kobiet, które zmieniły swoje życie finansowe
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
