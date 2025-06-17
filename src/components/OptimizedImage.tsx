
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
  width,
  height
}) => {
  // Function to convert PNG to JPG on mobile devices
  const getOptimizedSrc = (originalSrc: string) => {
    // Check if it's a PNG file and if we're on mobile
    if (originalSrc.includes('.png')) {
      // Use CSS media query approach - browser will choose appropriate format
      const jpgSrc = originalSrc.replace('.png', '.jpg');
      return jpgSrc;
    }
    return originalSrc;
  };

  // Create srcSet for responsive images
  const createSrcSet = (originalSrc: string) => {
    if (originalSrc.includes('.png')) {
      const jpgSrc = originalSrc.replace('.png', '.jpg');
      // Mobile: use JPG, Desktop: use PNG
      return `${jpgSrc} 768w, ${originalSrc} 1024w`;
    }
    return undefined;
  };

  const optimizedSrc = getOptimizedSrc(src);
  const srcSet = createSrcSet(src);

  return (
    <picture>
      {/* Mobile: JPG with good compression */}
      {src.includes('.png') && (
        <source 
          media="(max-width: 768px)" 
          srcSet={src.replace('.png', '.jpg')}
          type="image/jpeg"
        />
      )}
      {/* Desktop: Original PNG */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
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
