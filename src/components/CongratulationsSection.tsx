import React from 'react';
import { Award, Star, Gift, CheckCircle } from 'lucide-react';

const CongratulationsSection = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 via-green-100 to-emerald-50 py-8 px-4 border-y-2 border-green-200">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-green-300 p-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 opacity-10">
            <Award className="w-32 h-32 text-green-600" />
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-2 mb-3">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                <h2 className="text-2xl sm:text-3xl font-bold text-green-700">
                  🎉 Gratulacje!
                </h2>
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              </div>
              
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg mb-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Gift className="w-6 h-6" />
                  <h3 className="text-xl font-bold">
                    Masz szansę na DARMOWĄ konsultację
                  </h3>
                  <Gift className="w-6 h-6" />
                </div>
                <p className="text-green-100 text-lg font-semibold">
                  o wartości 1000 zł
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <h4 className="font-bold text-blue-800 text-lg">
                    Wyjście z zadłużenia
                  </h4>
                </div>
                <p className="text-blue-700">
                  Sprawdzimy jak skutecznie uwolnić Cię od długów i odzyskać kontrolę nad finansami
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                  <h4 className="font-bold text-purple-800 text-lg">
                    Zmniejszenie rat
                  </h4>
                </div>
                <p className="text-purple-700">
                  Pokażemy jak obniżyć miesięczne raty nawet o 50% i zaoszczędzić tysiące złotych
                </p>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                💡 <strong>Skorzystaj z tej możliwości</strong> - wypełnij formularz poniżej i umów się na bezpłatną konsultację
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsSection;