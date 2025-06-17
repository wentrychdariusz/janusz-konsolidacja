
import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  quality?: number;
  mobileOptimized?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
  width,
  height,
  quality = 75,
  mobileOptimized = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generuj responsywne rozmiary dla obrazów mobilnych
  const generateResponsiveSrc = (originalSrc: string) => {
    if (!mobileOptimized) return originalSrc;
    
    // Dla małych obrazów (avatary, mozaika) używaj mniejszych rozmiarów
    const params = new URLSearchParams();
    params.set('w', width ? Math.min(width, 200).toString() : '200');
    params.set('h', height ? Math.min(height, 200).toString() : '200');
    params.set('fit', 'crop');
    params.set('auto', 'format,compress');
    params.set('q', quality.toString());
    
    return `${originalSrc}?${params.toString()}`;
  };

  const generateSrcSet = (originalSrc: string) => {
    if (!mobileOptimized) return undefined;
    
    const baseParams = {
      fit: 'crop',
      auto: 'format,compress',
      q: quality.toString()
    };
    
    const sizes = [
      { w: 100, h: 100 },
      { w: 150, h: 150 },
      { w: 200, h: 200 }
    ];
    
    return sizes.map(size => {
      const params = new URLSearchParams({
        ...baseParams,
        w: size.w.toString(),
        h: size.h.toString()
      });
      return `${originalSrc}?${params.toString()} ${size.w}w`;
    }).join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-xs">Błąd ładowania</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      <img
        src={generateResponsiveSrc(src)}
        srcSet={generateSrcSet(src)}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes || (mobileOptimized ? "(max-width: 768px) 100px, 150px" : undefined)}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
    </div>
  );
};

export default OptimizedImage;
