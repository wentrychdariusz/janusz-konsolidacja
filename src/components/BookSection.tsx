
import React from 'react';
import OptimizedImage from './OptimizedImage';
import { Book, Heart, Users, Play } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const BookSection = () => {
  const bookImages = [
    "/lovable-uploads/7c2c43a8-7d25-42ea-90c0-66c86e978e81.png",
    // Dodaj więcej zdjęć książki tutaj gdy będą dostępne
  ];

  const handleAudioPlay = () => {
    // Tutaj będzie logika odtwarzania audio
    console.log("Odtwarzanie fragmentu książki...");
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Header Question */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            Jeszcze się zastanawiasz, czy postawić na 
            <span className="text-prestige-gold-600"> profesjonalistów</span>, 
            czy ryzykować z firmami, którym trudno zaufać?
          </h2>
        </div>

        {/* Single Book Image */}
        <div className="flex justify-center mb-8">
          <div className="relative transition-transform duration-300 hover:scale-105">
            <OptimizedImage
              src="/lovable-uploads/7c2c43a8-7d25-42ea-90c0-66c86e978e81.png"
              alt="Książka 'Nowe życie bez długów' - 500 egzemplarzy rozdanych klientom"
              className="w-80 h-96 md:w-96 md:h-[28rem] object-cover rounded-2xl shadow-2xl"
              width={384}
              height={448}
            />
          </div>
        </div>

        {/* Audio Player */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleAudioPlay}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-montserrat font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-3"
          >
            <Play className="w-6 h-6" />
            <span>Posłuchaj fragmentu mojej książki</span>
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
              <div className="w-full max-w-2xl mx-auto mt-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {bookImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="flex justify-center">
                          <OptimizedImage
                            src={image}
                            alt={`Książka 'Nowe życie bez długów' - zdjęcie ${index + 1}`}
                            className="w-full max-w-md h-80 md:h-96 object-cover rounded-2xl shadow-2xl"
                            width={400}
                            height={384}
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
