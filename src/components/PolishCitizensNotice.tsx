import React from 'react';
const PolishCitizensNotice = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-1">
      <div className="flex">
        <div className="w-4 h-2 bg-white"></div>
        <div className="w-4 h-2 bg-red-600"></div>
      </div>
      <span className="text-xs">Oferujemy usługi tylko obywatelom RP</span>
    </div>
  );
};
export default PolishCitizensNotice;