import React, { useState, useEffect, useRef } from 'react';
import OptimizedImage from './OptimizedImage';
import { Star, ChevronLeft, ChevronRight, Users, Heart, CheckCircle, Quote, ArrowLeftRight } from 'lucide-react';

const TrustedClientsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentDesktopSet, setCurrentDesktopSet] = useState(0);
  const [currentMiniTestimonial, setCurrentMiniTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);
  const miniAutoPlayInterval = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      name: "Pan Rafał",
      text: "Pan Dariusz to konkret. Wszystko spokojnie wytłumaczył, bez lania wody. Od razu wiedziałem, że mogę mu zaufać. Dzięki niemu wyszedłem na prostą.",
      rating: 5,
      image: "/lovable-uploads/9985157b-e0d2-4841-98fc-efcce96afa49.png",
      verified: true
    },
    {
      name: "Pan Andrzej",
      text: "Profesjonalny i uczciwy człowiek. Pomógł mi przejść przez cały proces bez stresu. Czułem się zaopiekowany od początku do końca.",
      rating: 5,
      image: "/lovable-uploads/330d84ab-e471-4a60-a2ba-b131b0db582d.png",
      verified: true
    },
    {
      name: "Pani Katarzyna",
      text: "Spokojny, życzliwy, cierpliwy. Pan Dariusz pomógł mi w bardzo trudnym momencie. Nie ocenia, tylko szuka rozwiązania. Tacy ludzie to skarb.",
      rating: 5,
      image: "/lovable-uploads/eb7b2854-6ce9-4318-8cb5-7f866eb59ef8.png",
      verified: true
    },
    {
      name: "Pan Adrian",
      text: "Miałem dużo długów, nie widziałem wyjścia. Pan Dariusz pomógł mi to ogarnąć. Teraz mam jedną ratę i śpię spokojnie. Dziękuję.",
      rating: 5,
      image: "/lovable-uploads/ede296ea-4893-4f38-8d8f-587e97b8d5fb.png",
      verified: true
    },
    {
      name: "Pan Rafał",
      text: "Dariusz zna się na rzeczy. Konsolidacja przebiegła sprawnie, bez zbędnych formalności. Po prostu porządny człowiek, który wie, jak pomóc.",
      rating: 5,
      image: "/lovable-uploads/d83e3ae6-61ae-43fb-8f2a-639720f8af68.png",
      verified: true
    },
    {
      name: "Pani Hanna",
      text: "Byłam w ciężkiej sytuacji. Pan Dariusz wszystko wytłumaczył, zajął się formalnościami. Uczciwy i cierpliwy. Pomógł mi stanąć na nogi.",
      rating: 5,
      image: "/lovable-uploads/27d11bb3-7edd-4f2a-b2d5-24d1db72940d.png",
      verified: true
    }
  ];

  const miniTestimonials = [
    {
      name: "Pan Marian",
      text: "Spokojny, kompetentny, godny zaufania.",
      image: "/lovable-uploads/2d738ba1-2073-46e7-8756-b5c6adad4638.png"
    },
    {
      name: "Pani Agnieszka",
      text: "Życzliwy, cierpliwy, nie ocenia.",
      image: "/lovable-uploads/1c4d6794-37c2-40ad-874e-39424cab8376.png"
    },
    {
      name: "Pan Krzysztof",
      text: "Skuteczny, ludzki, potrafi czynić cuda.",
      image: "/lovable-uploads/45c6e51f-e867-4285-8a55-98087f2d6314.png"
    }
  ];

  // Auto-play functionality for main testimonials
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }, 4000);
    }
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  // Auto-play functionality for mini testimonials
  useEffect(() => {
    miniAutoPlayInterval.current = setInterval(() => {
      setCurrentMiniTestimonial(prev => (prev + 1) % miniTestimonials.length);
    }, 2500);
    
    return () => {
      if (miniAutoPlayInterval.current) {
        clearInterval(miniAutoPlayInterval.current);
      }
    };
  }, [miniTestimonials.length]);

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

  return (
    <section className="relative bg-slate-900 py-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-slate-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Header with enhanced messaging */}
        <div className="text-center mb-8">
          {/* Trust Badge Section */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
              <Heart className="w-5 h-5 mr-2 text-red-300" />
              <span className="font-bold text-lg">Mamy największe zaufanie klientów w Polsce</span>
            </div>
            
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
              KLIENCI NAS KOCHAJĄ!
            </h3>

            {/* Compact Rating Section with Mini Testimonials */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto shadow-xl">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Rating Section */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-2">
                    <div className="text-5xl font-black text-slate-900 mr-3">4.9</div>
                    <div className="flex flex-col">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-slate-600 font-medium text-sm">(383 OPINII)</span>
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium">
                    Zweryfikowane opinie Google i Oferteo
                  </p>
                </div>

                {/* Mini Testimonial with Auto-rotate */}
                <div className="relative">
                  <div className="bg-slate-50 rounded-xl p-4 shadow-inner">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <OptimizedImage
                          src={miniTestimonials[currentMiniTestimonial].image}
                          alt={miniTestimonials[currentMiniTestimonial].name}
                          className="w-full h-full object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-slate-900 font-semibold text-sm">
                          {miniTestimonials[currentMiniTestimonial].name}
                        </p>
                        <p className="text-slate-600 text-sm italic">
                          "{miniTestimonials[currentMiniTestimonial].text}"
                        </p>
                      </div>
                    </div>
                    
                    {/* Mini dots indicator */}
                    <div className="flex justify-center space-x-1 mt-3">
                      {miniTestimonials.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                            index === currentMiniTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Oni mi
            </span>
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              {" "}zaufali
            </span>
          </h2>
          
          <p className="text-blue-200 text-xl md:text-2xl font-lato max-w-4xl mx-auto mb-8">
            Dołącz do grona zadowolonych klientów, którzy odzyskali kontrolę nad swoim życiem finansowym
          </p>
        </div>

        {/* Desktop Testimonials with Navigation */}
        <div className="hidden lg:block mb-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Header inside light section */}
            <div className="text-center py-12 px-8">
              <h3 className="font-montserrat text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Prawdziwe opinie od zadowolonych klientów
              </h3>
              <p className="text-gray-600 text-lg font-lato">
                Prawdziwe historie, prawdziwe rezultaty
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
    </section>
  );
};

export default TrustedClientsSection;
