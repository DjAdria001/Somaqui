import React, { useState, useEffect } from 'react';

interface SliderProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const Slider: React.FC<SliderProps> = ({ 
  images, 
  autoSlide = true, 
  autoSlideInterval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>
      
      <button className="prev" onClick={prevSlide} aria-label="Imagen anterior">
        &#10094;
      </button>
      <button className="next" onClick={nextSlide} aria-label="Siguiente imagen">
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
