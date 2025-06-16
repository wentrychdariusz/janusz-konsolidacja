
import React, { useState, useEffect, useRef } from 'react';
import OptimizedImage from './OptimizedImage';
import { Star, ChevronLeft, ChevronRight, Users, Heart, CheckCircle, Quote, ArrowLeftRight } from 'lucide-react';

const TrustedClientsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentDesktopSet, setCurrentDesktopSet] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);
  
  const clientImages = ["/lovable-uploads/73ec7538-32fd-47a6-9460-ecfe26f5985b.png", "/lovable-uploads/731a75cc-be2d-432e-ba08-6d2b2f601a69.png", "/lovable-uploads/006c64e3-6a85-4c9a-ac54-1d2b2f601a69.png", "/lovable-uploads/e02defc0-4e3f-46bf-9b38-ccbd8ce23531.png", "/lovable-uploads/a7da1141-d0f1-484e-af6a-d6f7704d0efb.png", "/lovable-uploads/3eb21e4e-0f4f-42db-938e-f1e7b917cc4e.png", "/lovable-uploads/7400b6f6-4a58-46c3-a434-f941fcae211a.png", "/lovable-uploads/6d6c71e9-c427-4ea3-ba95-42f30c256d9f.png"];
  
  const testimonials = [{
    name: "Pani Anna",
    text: "Pan Dariusz to porządny człowiek. Wszystko mi wytłumaczył spokojnie i bez pośpiechu. Wiedziałam, że mogę mu zaufać. Pomógł mi jak rodzinie.",
    rating: 5,
    image: "/lovable-uploads/73ec7538-32fd-47a6-9460-ecfe26f5985b.png",
    verified: true
  }, {
    name: "Pan Tomasz",
    text: "Na początku myślałem, że to będzie kolejna firma, co tylko gada. Ale Dariusz to inna liga. Konkretny gość, zero ściemy. Szacunek.",
    rating: 5,
    image: "/lovable-uploads/731a75cc-be2d-432e-ba08-6d2b2f601a69.png",
    verified: true
  }, {
    name: "Pani Maria",
    text: "Współpraca z Panem Dariuszem przebiegała bardzo profesjonalnie. Wszystko jasno przedstawione, bez zbędnych obietnic. To osoba, której naprawdę można powierzyć swoją sprawę.",
    rating: 5,
    image: "/lovable-uploads/006c64e3-6a85-4c9a-ac54-1d2b2f601a69.png",
    verified: true
  }, {
    name: "Pani Katarzyna",
    text: "Byłam załamana, nie wiedziałam, co dalej. Dariusz potraktował mnie z empatią i szacunkiem. Dał mi poczucie, że nie jestem sama. Tego się nie zapomina.",
    rating: 5,
    image: "/lovable-uploads/e02defc0-4e3f-46bf-9b38-ccbd8ce23531.png",
    verified: true
  }, {
    name: "Pan Piotr",
    text: "Chłop jak trzeba. Przyjechał, porozmawiał normalnie, bez wywyższania się. Zrobił porządek z tymi kredytami i wreszcie mogę spać spokojnie.",
    rating: 5,
    image: "/lovable-uploads/a7da1141-d0f1-484e-af6a-d6f7704d0efb.png",
    verified: true
  }, {
    name: "Pan Marek",
    text: "Zaufałem, bo widziałem, jak wielu osobom już pomógł. To ekspert z ogromnym doświadczeniem, a przy tym człowiek, który naprawdę rozumie, przez co przechodzisz.",
    rating: 5,
    image: "/lovable-uploads/3eb21e4e-0f4f-42db-938e-f1e7b917cc4e.png",
    verified: true
  }];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }, 4000); // 4 seconds interval
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  // Touch event handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTestimonial();
    }
    if (isRightSwipe) {
      prevTestimonial();
    }
  };

  const nextTestimonial = () => {
    setIsAutoPlaying(false); // Stop autoplay when user interacts
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setIsAutoPlaying(false); // Stop autoplay when user interacts
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextDesktopSet = () => {
    const maxSets = Math.ceil(testimonials.length / 3);
    setCurrentDesktopSet(prev => (prev + 1) % maxSets);
  };

  const prevDesktopSet = () => {
    const maxSets = Math.ceil(testimonials.length / 3);
    setCurrentDesktopSet(prev => (prev - 1 + maxSets) % maxSets);
  };

  const getCurrentDesktopTestimonials = () => {
    const startIndex = currentDesktopSet * 3;
    return testimonials.slice(startIndex, startIndex + 3);
  };

  return <section className="relative bg-slate-900 py-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-slate-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Oni mi
            </span>
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              {" "}zaufali
            </span>
          </h2>
          
          <p className="text-blue-200 text-xl md:text-2xl font-lato max-w-3xl mx-auto mb-12">
            Poznaj historie ludzi, którzy odzyskali kontrolę nad swoim życiem finansowym
          </p>
        </div>

        {/* Desktop Testimonials with Navigation */}
        <div className="hidden lg:block mb-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Header inside light section */}
            <div className="text-center py-12 px-8">
              <h3 className="font-montserrat text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Co mówią nasi klienci
              </h3>
              <p className="text-gray-600 text-lg font-lato">
                Prawdziwe opinie od zadowolonych klientów
              </p>
            </div>

            {/* Desktop Testimonials Grid */}
            <div className="px-8 pb-12">
              <div className="grid grid-cols-3 gap-8">
                {getCurrentDesktopTestimonials().map((testimonial, index) => (
                  <div key={`${currentDesktopSet}-${index}`} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    {/* Large profile image with navigation overlay */}
                    <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 bg-gray-100 group">
                      <OptimizedImage 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover" 
                        width={300} 
                        height={256} 
                      />
                      
                      {/* Navigation buttons overlay - only show on first and last items */}
                      {index === 0 && (
                        <button 
                          onClick={prevDesktopSet}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                      )}
                      
                      {index === getCurrentDesktopTestimonials().length - 1 && (
                        <button 
                          onClick={nextDesktopSet}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                      )}
                    </div>
                    
                    {/* Rating stars */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    {/* Testimonial text */}
                    <p className="text-gray-700 text-lg font-lato mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Client info */}
                    <div className="border-t border-gray-100 pt-4">
                      <p className="font-montserrat font-bold text-slate-900 text-lg mb-3">
                        {testimonial.name}
                      </p>
                      
                      {testimonial.verified && (
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-green-600 text-sm font-medium">Zweryfikowany klient</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center pb-8">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDesktopSet(index)}
                  className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
                    index === currentDesktopSet ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Testimonial Slider with Swipe Support */}
        <div className="block lg:hidden mb-8">
          <div className="relative">
            {/* Testimonial card with touch events */}
            <div 
              className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl mx-4 select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Large profile image with navigation overlay */}
              <div className="relative w-full h-80 bg-gray-100 rounded-t-3xl overflow-hidden">
                <OptimizedImage 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name} 
                  className="w-full h-full object-cover" 
                  width={400} 
                  height={320} 
                />
                
                {/* Navigation buttons overlay */}
                <button 
                  onClick={prevTestimonial} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                
                <button 
                  onClick={nextTestimonial} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>

                {/* Swipe hint indicator */}
                {isAutoPlaying && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                    Przesuń palcem →
                  </div>
                )}
              </div>
              
              {/* Content section */}
              <div className="p-8">
                {/* Rating stars */}
                <div className="flex mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <p className="text-white text-lg font-lato mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                {/* Client info */}
                <div className="border-t border-gray-600 pt-6">
                  <p className="font-montserrat font-bold text-white text-xl mb-4">
                    {testimonials[currentTestimonial].name}
                  </p>
                  
                  {testimonials[currentTestimonial].verified && (
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-green-400 text-sm font-medium">Zweryfikowany klient</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dots indicator with autoplay status */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTestimonial(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Autoplay control */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-white/60 hover:text-white text-sm transition-colors duration-300"
              >
                {isAutoPlaying ? 'Zatrzymaj automatyczne przewijanie' : 'Włącz automatyczne przewijanie'}
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          
        </div>
      </div>
    </section>;
};

export default TrustedClientsSection;
