import React, { useEffect, useRef } from 'react';

interface SimpleMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLocation?: { lat: number; lng: number };
  height?: string;
}

interface SimpleMapRef {
  updateLocation: (lat: number, lng: number) => void;
}

const SimpleMapComponent = React.forwardRef<SimpleMapRef, SimpleMapProps>(({ 
  onLocationSelect, 
  initialLocation = { lat: 41.3851, lng: 2.1734 },
  height = '400px' 
}, ref) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const currentLocationRef = useRef(initialLocation);

  useEffect(() => {
    // Llamar inmediatamente con la ubicación inicial
    onLocationSelect(initialLocation.lat, initialLocation.lng);
  }, []);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Simular coordenadas basadas en el clic (esto es una simulación simple)
    const lat = initialLocation.lat + (0.5 - y / rect.height) * 0.1;
    const lng = initialLocation.lng + (x / rect.width - 0.5) * 0.1;
    
    currentLocationRef.current = { lat, lng };
    onLocationSelect(lat, lng);
    console.log('🗺️ Ubicación seleccionada en mapa simple:', { lat, lng });
  };

  const updateLocation = (lat: number, lng: number) => {
    currentLocationRef.current = { lat, lng };
    console.log('🗺️ Ubicación actualizada en mapa simple:', { lat, lng });
  };

  React.useImperativeHandle(ref, () => ({
    updateLocation,
  }));

  return (
    <div 
      ref={mapContainerRef}
      onClick={handleMapClick}
      style={{ 
        height, 
        width: '100%', 
        border: '2px solid #39e4c9', 
        borderRadius: '8px',
        background: 'linear-gradient(45deg, #e6f7ff 25%, transparent 25%), linear-gradient(-45deg, #e6f7ff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e6f7ff 75%), linear-gradient(-45deg, transparent 75%, #e6f7ff 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        cursor: 'crosshair',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Indicador de ubicación */}
      <div style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        background: '#ff4444',
        borderRadius: '50%',
        border: '3px solid white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        zIndex: 10,
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%'
      }}>
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          whiteSpace: 'nowrap'
        }}>
          📍 {currentLocationRef.current.lat.toFixed(4)}, {currentLocationRef.current.lng.toFixed(4)}
        </div>
      </div>
      
      {/* Instrucciones */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'rgba(255,255,255,0.9)',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#666',
        border: '1px solid #ddd'
      }}>
        🖱️ Haz clic para seleccionar ubicación
      </div>

      {/* Simulación de mapa */}
      <div style={{
        fontSize: '48px',
        color: '#39e4c9',
        opacity: 0.3
      }}>
        🗺️
      </div>
    </div>
  );
});

SimpleMapComponent.displayName = 'SimpleMapComponent';

export default SimpleMapComponent;
