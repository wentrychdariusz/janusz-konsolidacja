
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  mobileFormat?: 'jpg' | 'webp';
  mobileQuality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
  width,
  height,
  mobileFormat = 'jpg',
  mobileQuality = 75
}) => {
  // Function to convert PNG to JPG for mobile optimization
  const getOptimizedSrc = (originalSrc: string) => {
    // For mobile devices, convert PNG to JPG for better compression
    if (window.innerWidth <= 768 && originalSrc.includes('.png')) {
      return originalSrc.replace('.png', '.jpg');
    }
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(src);

  return (
    <picture>
      {/* Mobile version - JPG for better compression */}
      <source 
        media="(max-width: 768px)" 
        srcSet={optimizedSrc}
        type="image/jpeg"
      />
      
      {/* Desktop version - original format */}
      <source 
        media="(min-width: 769px)" 
        srcSet={src}
        type={src.includes('.png') ? 'image/png' : 'image/jpeg'}
      />
      
      <img
        src={optimizedSrc}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        width={width}
        height={height}
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
    </picture>
  );
};

export default OptimizedImage;
