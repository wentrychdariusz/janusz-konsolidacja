
import React from 'react';

const PolishCitizensNotice = () => {
  return (
    <div className="block md:hidden bg-gradient-to-r from-red-600 via-white to-red-600 border-2 border-red-600 rounded-lg p-3 mx-4 my-4 shadow-lg">
      <div className="flex items-center justify-center space-x-3">
        {/* Polish Flag */}
        <div className="flex flex-col w-8 h-6 border border-gray-300 rounded overflow-hidden shadow-sm">
          <div className="w-full h-1/2 bg-white"></div>
          <div className="w-full h-1/2 bg-red-600"></div>
        </div>
        
        {/* Notice Text */}
        <p className="text-navy-900 text-sm font-bold text-center font-lato leading-tight">
          Możemy pomóc tylko obywatelom Rzeczpospolitej Polskiej
        </p>
      </div>
    </div>
  );
};

export default PolishCitizensNotice;
