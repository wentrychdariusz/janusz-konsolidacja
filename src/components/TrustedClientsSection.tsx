
import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { Star, ChevronLeft, ChevronRight, Users, Heart, CheckCircle } from 'lucide-react';

const TrustedClientsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const clientImages = [
    "/lovable-uploads/73ec7538-32fd-47a6-9460-ecfe26f5985b.png",
    "/lovable-uploads/731a75cc-be2d-432e-ba08-6d2b2f601a69.png",
    "/lovable-uploads/006c64e3-6a85-4c9a-ac54-1d2b2f601a69.png",
    "/lovable-uploads/e02defc0-4e3f-46bf-9b38-ccbd8ce23531.png",
    "/lovable-uploads/a7da1141-d0f1-484e-af6a-d6f7704d0efb.png",
    "/lovable-uploads/3eb21e4e-0f4f-42db-938e-f1e7b917cc4e.png",
    "/lovable-uploads/7400b6f6-4a58-46c3-a434-f941fcae211a.png",
    "/lovable-uploads/6d6c71e9-c427-4ea3-ba95-42f30c256d9f.png"
  ];

  const testimonials = [
    {
      name: "Anna Kowalska",
      position: "Właścicielka małej firmy",
      text: "Dzięki Dariuszowi udało mi się pozbyć długów o wartości 340 000 zł. Myślałam, że już nigdy nie wyjdę z tej sytuacji. Teraz moja firma działa lepiej niż kiedykolwiek.",
      rating: 5,
      image: "/lovable-uploads/73ec7538-32fd-47a6-9460-ecfe26f5985b.png",
      verified: true
    },
    {
      name: "Tomasz Nowak",
      position: "Przedsiębiorca",
      text: "Profesjonalne podejście i skuteczne rozwiązania. Redukcja zadłużenia o 60% w ciągu 8 miesięcy. Polecam każdemu, kto ma problemy finansowe.",
      rating: 5,
      image: "/lovable-uploads/731a75cc-be2d-432e-ba08-6d2b2f601a69.png",
      verified: true
    },
    {
      name: "Maria Wiśniewska",
      position: "Kierownik działu",
      text: "Wreszcie mogę spać spokojnie. Długi, które mnie męczyły przez lata, zostały uregulowane zgodnie z moimi możliwościami. Jestem bardzo wdzięczna.",
      rating: 5,
      image: "/lovable-uploads/006c64e3-6a85-4c9a-ac54-1d2b2f601a69.png",
      verified: true
    },
    {
      name: "Piotr Zieliński",
      position: "Dyrektor handlowy",
      text: "Skuteczne negocjacje z wierzycielami i plan spłat dopasowany do moich możliwości. Teraz mam kontrolę nad swoimi finansami.",
      rating: 5,
      image: "/lovable-uploads/e02defc0-4e3f-46bf-9b38-ccbd8ce23531.png",
      verified: true
    },
    {
      name: "Katarzyna Lewandowska",
      position: "Konsultantka",
      text: "Dzięki kompleksowemu podejściu Dariusza udało się rozwiązać problemy z ZUS i Urzędem Skarbowym. Polecam jego usługi.",
      rating: 5,
      image: "/lovable-uploads/a7da1141-d0f1-484e-af6a-d6f7704d0efb.png",
      verified: true
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "15,000+",
      text: "Zadowolonych klientów"
    },
    {
      icon: Heart,
      number: "98%",
      text: "Pozytywnych opinii"
    },
    {
      icon: CheckCircle,
      number: "20",
      text: "Lat doświadczenia"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-navy-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-navy-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Oni mi
            </span>
            <span className="bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-300 bg-clip-text text-transparent">
              {" "}zaufali
            </span>
          </h2>
          
          <p className="text-blue-200 text-xl md:text-2xl font-lato max-w-3xl mx-auto mb-12">
            Poznaj historie ludzi, którzy odzyskali kontrolę nad swoim życiem finansowym
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-navy-800/50 backdrop-blur-sm rounded-2xl p-6 border border-navy-700/30 hover:border-navy-600/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-2 font-montserrat">
                  {stat.number}
                </div>
                <p className="text-blue-200 font-lato font-medium">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section with Light Background */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header inside light section */}
            <div className="text-center py-12 px-8">
              <h3 className="font-montserrat text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                Co mówią nasi klienci
              </h3>
              <p className="text-gray-600 text-lg font-lato">
                Prawdziwe opinie od zadowolonych klientów
              </p>
            </div>

            {/* Desktop Testimonials */}
            <div className="hidden md:block px-8 pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 text-lg font-lato mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                        <OptimizedImage
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <p className="font-montserrat font-bold text-navy-900">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {testimonial.position}
                        </p>
                        {testimonial.verified && (
                          <div className="flex items-center mt-1">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-600 text-xs font-medium">Zweryfikowany klient</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Testimonial Slider */}
            <div className="block md:hidden px-4 pb-12">
              <div className="relative">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mx-4">
                  {/* Navigation buttons */}
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white border-2 border-gray-200 hover:border-navy-500 text-navy-700 rounded-full p-3 shadow-lg transition-all duration-300 z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white border-2 border-gray-200 hover:border-navy-500 text-navy-700 rounded-full p-3 shadow-lg transition-all duration-300 z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Testimonial content */}
                  <div className="px-4">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 text-lg font-lato mb-6 leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                        <OptimizedImage
                          src={testimonials[currentTestimonial].image}
                          alt={testimonials[currentTestimonial].name}
                          className="w-full h-full object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <p className="font-montserrat font-bold text-navy-900">
                          {testimonials[currentTestimonial].name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {testimonials[currentTestimonial].position}
                        </p>
                        {testimonials[currentTestimonial].verified && (
                          <div className="flex items-center mt-1">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-600 text-xs font-medium">Zweryfikowany klient</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dots indicator for mobile */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                          index === currentTestimonial 
                            ? 'bg-navy-600' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Photos Grid */}
        <div className="mb-16">
          <h3 className="text-center font-montserrat text-2xl md:text-3xl font-bold text-white mb-8">
            Twarze zadowolonych klientów
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {clientImages.map((image, index) => (
              <div 
                key={index} 
                className="relative group cursor-pointer"
              >
                <div className="aspect-square relative overflow-hidden rounded-2xl shadow-lg border-2 border-navy-700/30 group-hover:border-prestige-gold-400/50 transition-all duration-300">
                  <OptimizedImage
                    src={image}
                    alt={`Zadowolony klient ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={index < 4}
                    width={150}
                    height={150}
                  />
                  
                  <div className="absolute inset-0 bg-navy-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  <div className="absolute bottom-2 left-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-prestige-gold-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-navy-700 to-navy-600 text-white rounded-full px-8 py-4 shadow-lg">
              <span className="font-bold text-lg mr-2">+</span>
              <span className="font-lato text-lg">Tysiące innych zadowolonych klientów</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-navy-800 to-navy-700 rounded-3xl p-8 shadow-2xl border border-navy-600/30">
            <h3 className="text-white font-montserrat text-2xl md:text-3xl font-bold mb-4">
              Dołącz do grona zadowolonych klientów
            </h3>
            <p className="text-blue-200 text-lg font-lato mb-6">
              Twoja historia sukcesu może być następna
            </p>
            <button className="bg-gradient-to-r from-prestige-gold-500 to-prestige-gold-400 text-navy-900 font-bold px-8 py-4 rounded-full hover:from-prestige-gold-400 hover:to-prestige-gold-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Rozpocznij swoją zmianę
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedClientsSection;
