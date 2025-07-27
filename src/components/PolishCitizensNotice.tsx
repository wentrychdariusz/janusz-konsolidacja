import React from 'react';
const PolishCitizensNotice = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-1">
      <div className="flex flex-col w-4 h-3 border border-gray-300">
        <div className="w-full h-1/2 bg-white"></div>
        <div className="w-full h-1/2 bg-red-600"></div>
      </div>
      <span className="text-sm">Oferujemy usługi tylko obywatelom RP</span>
    </div>
  );
};
export default PolishCitizensNotice;