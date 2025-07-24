import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLocation?: { lat: number; lng: number };
  height?: string;
}

interface MapRef {
  updateLocation: (lat: number, lng: number) => void;
}

const MapComponent = React.forwardRef<MapRef, MapProps>(({ 
  onLocationSelect, 
  initialLocation = { lat: 41.3851, lng: 2.1734 }, // Barcelona por defecto
  height = '400px' 
}, ref) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) {
      console.error('Map container ref is null');
      return;
    }

    if (mapRef.current) {
      console.log('Map already exists, skipping initialization');
      return;
    }

    console.log('Initializing map...');

    let map: L.Map | null = null;
    let marker: L.Marker | null = null;

    try {
      // Limpiar cualquier mapa existente
      if (mapContainerRef.current.innerHTML) {
        mapContainerRef.current.innerHTML = '';
      }

      // Crear el mapa
      map = L.map(mapContainerRef.current, {
        center: [initialLocation.lat, initialLocation.lng],
        zoom: 13,
        zoomControl: true,
        attributionControl: true,
        preferCanvas: false
      });

      console.log('Map created successfully');

      // Añadir las tiles de OpenStreetMap
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 1
      });

      tileLayer.addTo(map);
      console.log('Tile layer added');

      // Crear marcador
      marker = L.marker([initialLocation.lat, initialLocation.lng], {
        draggable: true,
        title: 'Arrastra para cambiar la ubicación'
      });

      marker.addTo(map);
      console.log('Marker added');

      // Añadir popup al marcador
      marker.bindPopup('📍 Tu ubicación<br><small>Arrastra para cambiar o haz clic en el mapa</small>');
      marker.openPopup();

      // Eventos del marcador
      marker.on('dragend', () => {
        const pos = marker!.getLatLng();
        console.log('Marker dragged to:', pos);
        onLocationSelect(pos.lat, pos.lng);
        marker!.setPopupContent(`📍 Ubicación: ${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`);
      });

      // Eventos del mapa
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        console.log('Map clicked at:', { lat, lng });
        marker!.setLatLng([lat, lng]);
        onLocationSelect(lat, lng);
        marker!.setPopupContent(`📍 Ubicación: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        marker!.openPopup();
      });

      // Cuando el mapa esté listo
      map.whenReady(() => {
        console.log('Map is ready');
        setIsMapLoaded(true);
        setError(null);
        
        // Forzar redimensionamiento
        setTimeout(() => {
          if (map) {
            map.invalidateSize();
            console.log('Map size invalidated');
          }
        }, 100);
      });

      // Asignar referencias
      mapRef.current = map;
      markerRef.current = marker;

      // Llamar inmediatamente a onLocationSelect con la ubicación inicial
      onLocationSelect(initialLocation.lat, initialLocation.lng);

    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
      setError('Error al cargar el mapa');
      setIsMapLoaded(false);
    }

    // Cleanup
    return () => {
      console.log('Cleaning up map...');
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          console.error('Error removing map:', e);
        }
        mapRef.current = null;
        markerRef.current = null;
        setIsMapLoaded(false);
      }
    };
  }, []); // Eliminar dependencias para evitar re-renders

  const updateMarkerPosition = (lat: number, lng: number) => {
    console.log('Updating marker position to:', { lat, lng });
    
    if (!markerRef.current || !mapRef.current) {
      console.error('Map or marker not ready for update');
      return;
    }

    try {
      markerRef.current.setLatLng([lat, lng]);
      mapRef.current.setView([lat, lng], 15, { animate: true });
      markerRef.current.setPopupContent(`📍 Ubicación detectada: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      markerRef.current.openPopup();
      
      // Forzar redimensionamiento
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 200);
      
      console.log('Marker position updated successfully');
    } catch (error) {
      console.error('Error al actualizar la posición del marcador:', error);
    }
  };

  // Exponer métodos del componente
  React.useImperativeHandle(ref, () => ({
    updateLocation: updateMarkerPosition,
  }));

  if (error) {
    return (
      <div 
        style={{ 
          height, 
          width: '100%', 
          border: '2px solid #ff6b6b', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff5f5',
          color: '#c53030'
        }}
      >
        ❌ {error}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={mapContainerRef} 
        style={{ 
          height, 
          width: '100%', 
          border: '2px solid #39e4c9', 
          borderRadius: '8px',
          zIndex: 1
        }} 
      />
      {!isMapLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '15px 20px',
          borderRadius: '8px',
          zIndex: 1000,
          border: '1px solid #ddd',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          fontSize: '16px'
        }}>
          🗺️ Cargando mapa...
        </div>
      )}
    </div>
  );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;
