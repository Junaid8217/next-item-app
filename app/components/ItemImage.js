'use client';

export default function ItemImage({ src, alt, className, fallbackSrc = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop' }) {
  const handleError = (e) => {
    e.target.src = fallbackSrc;
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}