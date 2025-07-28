import React, { useState, useEffect } from 'react';

interface SliderProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  compact?: boolean;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const Slider: React.FC<SliderProps> = ({ 
  images, 
  compact = false,
  autoSlide = true, 
  autoSlideInterval = 4000 
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

  // Versión compacta - gallery de tarjetas
  if (compact) {
    return (
      <div className="compact-gallery">
        <div className="gallery-header">
          <h3>Nuestra Comunidad en Acción</h3>
          <p>Momentos de solidaridad y ayuda mutua</p>
        </div>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`gallery-card ${index === currentSlide ? 'featured' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <div className="image-container">
                <img src={image.src} alt={image.alt} />
                <div className="overlay"></div>
              </div>
              <div className="card-indicator">
                <div className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-footer">
          <span className="gallery-counter">
            {currentSlide + 1} de {images.length}
          </span>
        </div>
      </div>
    );
  }

  // Versión original del slider
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
