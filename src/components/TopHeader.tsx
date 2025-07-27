import React from 'react';
import OptimizedImage from './OptimizedImage';
import PolishCitizensNotice from './PolishCitizensNotice';
const TopHeader = () => {
  return (
    <div className="bg-navy-900 text-white py-2 px-4 text-center text-sm">
      <p>🔒 Bezpieczne i dyskretne doradztwo finansowe</p>
      <PolishCitizensNotice />
    </div>
  );
};
export default TopHeader;