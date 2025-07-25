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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, currentSlide]);

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
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      </button>
      <button className="next" onClick={nextSlide} aria-label="Siguiente imagen">
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </button>

      {/* Indicadores */}
      <div className="slider-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
