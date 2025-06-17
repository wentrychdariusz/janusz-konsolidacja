
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
  return (
    <img
      src={src}
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
      // Dodatkowe optymalizacje dla mobile
      fetchPriority={priority ? "high" : "low"}
    />
  );
};

export default OptimizedImage;
