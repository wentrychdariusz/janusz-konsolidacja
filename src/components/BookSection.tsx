import React, { useState, useRef } from 'react';
import OptimizedImage from './OptimizedImage';
import { Book, Heart, Users, Play, Pause } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const BookSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const bookImages = [
    "/lovable-uploads/cc2d25e5-05d2-41e1-a933-15662005a373.png",
    "/lovable-uploads/61455e95-43aa-416c-aa0c-fe2c22acb9bc.png",
    "/lovable-uploads/e3bdd03e-03a7-423a-9799-55e4a6d4e39a.png"
  ];

  const handleAudioToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Tutaj dodaj właściwy URL do pliku audio
        // audioRef.current.src = "/path-to-your-audio-file.mp3";
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Audio element for playback */}
        <audio
          ref={audioRef}
          onEnded={handleAudioEnded}
          preload="none"
        />

        {/* Header Question */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            Jeszcze się zastanawiasz, czy postawić na 
            <span className="text-prestige-gold-600"> profesjonalistów</span>, 
            czy ryzykować z firmami, którym trudno zaufać?
          </h2>
        </div>

        {/* Book Image with Audio Player Overlay */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <OptimizedImage
              src="/lovable-uploads/7c2c43a8-7d25-42ea-90c0-66c86e978e81.png"
              alt="Książka 'Nowe życie bez długów' - 500 egzemplarzy rozdanych klientom"
              className="w-80 h-96 md:w-96 md:h-[28rem] object-cover rounded-2xl shadow-2xl"
              width={384}
              height={448}
            />
            
            {/* Audio Player Overlay on Book Image */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleAudioToggle}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-6 py-4 font-montserrat font-bold text-sm md:text-base shadow-xl transition-colors duration-300 flex items-center space-x-3 border-2 border-blue-200 hover:border-blue-300 min-w-[200px] md:min-w-[240px]"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Play className="w-4 h-4 text-blue-600 ml-0.5" />
                  )}
                </div>
                <span className="text-center">Posłuchaj fragmentu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Audio Player - Less Rounded and Wider with Increased Height */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleAudioToggle}
            className="w-96 md:w-[32rem] h-24 md:h-28 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-montserrat font-bold text-base md:text-xl shadow-xl transition-colors duration-300 flex items-center justify-center space-x-4 md:space-x-6 border-4 border-blue-200 hover:border-blue-300 px-6"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              {isPlaying ? (
                <Pause className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              ) : (
                <Play className="w-6 h-6 md:w-8 md:h-8 text-blue-600 ml-1" />
              )}
            </div>
            <span className="text-center leading-tight">
              {isPlaying ? 'Zatrzymaj fragment' : 'Posłuchaj fragmentu mojej książki'}
            </span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-1 gap-8 lg:gap-12">
          
          {/* Content */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-prestige-gold-500 to-yellow-400 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-center mb-4">
                PRZECZYTAJ MOJĄ KSIĄŻKĘ
              </h3>
              <p className="text-center text-lg font-semibold">
                ABY ZOBACZYĆ OGROMNĄ RÓŻNICĘ
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-prestige-gold-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-montserrat text-xl font-bold text-slate-900 mb-2">
                    Kto rozdaje swoim klientom 500 książek o oddłużaniu?
                  </h4>
                  <p className="text-slate-700 font-lato text-lg">
                    Zrobiliśmy to, bo wiemy, jak ważne jest realne wsparcie. Nie tylko formalne, ale też ludzkie.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-700 font-lato text-lg">
                    Rozdaliśmy <span className="font-bold text-prestige-gold-600">500 egzemplarzy książki „Nowe życie bez długów"</span>, 
                    aby trafiły do tych, którzy naprawdę potrzebują pomocnej dłoni.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-700 font-lato text-lg">
                    Chcieliśmy, by nasi klienci mogli przekazać ją dalej.<br />
                    <span className="font-semibold">Bliskim, rodzinie, przyjaciołom.</span><br />
                    Każdemu, kto też walczy z długami i potrzebuje nadziei.
                  </p>
                </div>
              </div>

              {/* Book Images Slider - After the text about clients */}
              <div className="w-full max-w-4xl mx-auto mt-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {bookImages.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="flex justify-center p-2">
                          <OptimizedImage
                            src={image}
                            alt={`Książka 'Nowe życie bez długów' - zdjęcie ${index + 1}`}
                            className="w-full max-w-sm h-64 md:h-80 object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                            width={320}
                            height={320}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
