
import React from 'react';
import OptimizedImage from './OptimizedImage';
import { Star, Users, Heart, CheckCircle } from 'lucide-react';

const TrustedClientsSection = () => {
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
      name: "Anna K.",
      text: "Dzięki Dariuszowi odzyskałam spokój",
      rating: 5
    },
    {
      name: "Tomasz M.",
      text: "Profesjonalne podejście i skuteczne rozwiązania",
      rating: 5
    },
    {
      name: "Maria W.",
      text: "Wreszcie mogę spać spokojnie",
      rating: 5
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "15,000+",
      text: "Zadowolonych klientów",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Heart,
      number: "98%",
      text: "Pozytywnych opinii",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: CheckCircle,
      number: "20",
      text: "Lat doświadczenia",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-gentle-float"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text">
              Oni mi
            </span>
            <span className="text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text">
              {" "}zaufali
            </span>
          </h2>
          
          <p className="text-warm-neutral-600 text-xl md:text-2xl font-lato max-w-3xl mx-auto mb-8">
            Poznaj historie ludzi, którzy odzyskali kontrolę nad swoim życiem finansowym
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-r ${stat.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-navy-900 mb-2 font-montserrat">
                  {stat.number}
                </div>
                <p className="text-warm-neutral-600 font-lato font-medium">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Photos Grid */}
        <div className="mb-16">
          <h3 className="text-center font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-8">
            Twarze zadowolonych klientów
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {clientImages.map((image, index) => (
              <div 
                key={index} 
                className="relative group cursor-pointer"
              >
                <div className="aspect-square relative overflow-hidden rounded-2xl shadow-lg">
                  <OptimizedImage
                    src={image}
                    alt={`Zadowolony klient ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={index < 4}
                    width={150}
                    height={150}
                  />
                  
                  {/* Colorful overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                  
                  {/* Star rating overlay */}
                  <div className="absolute bottom-2 left-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm scale-105"></div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-8 py-4 shadow-lg">
              <span className="font-bold text-lg mr-2">+</span>
              <span className="font-lato text-lg">Tysiące innych zadowolonych klientów</span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-warm-neutral-700 text-lg font-lato text-center mb-4 italic">
                "{testimonial.text}"
              </p>
              
              <div className="text-center">
                <p className="font-montserrat font-bold text-navy-900">
                  {testimonial.name}
                </p>
                <p className="text-warm-neutral-500 text-sm">
                  Zweryfikowany klient
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-white font-montserrat text-2xl md:text-3xl font-bold mb-4">
              Dołącz do grona zadowolonych klientów
            </h3>
            <p className="text-purple-100 text-lg font-lato mb-6">
              Twoja historia sukcesu może być następna
            </p>
            <button className="bg-white text-purple-600 font-bold px-8 py-4 rounded-full hover:bg-purple-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Rozpocznij swoją zmianę
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedClientsSection;
