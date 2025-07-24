import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

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
  initialLocation = { lat: 41.3851, lng: 2.1734 }, 
  height = '400px' 
}, ref) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Inicializar el mapa
    const map = L.map(mapContainerRef.current).setView(
      [initialLocation.lat, initialLocation.lng], 
      13
    );

    // Añadir las tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Crear marcador arrastrable
    const marker = L.marker([initialLocation.lat, initialLocation.lng], {
      draggable: true
    }).addTo(map);

    // Configurar icono personalizado para el marcador
    const customIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    marker.setIcon(customIcon);

    // Evento cuando se arrastra el marcador
    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      onLocationSelect(pos.lat, pos.lng);
    });

    // Evento cuando se hace clic en el mapa
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      onLocationSelect(lat, lng);
    });

    mapRef.current = map;
    markerRef.current = marker;

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [initialLocation.lat, initialLocation.lng, onLocationSelect]);

  const updateMarkerPosition = (lat: number, lng: number) => {
    if (markerRef.current && mapRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      mapRef.current.setView([lat, lng], 15);
    }
  };

  // Exponer métodos del componente
  React.useImperativeHandle(ref, () => ({
    updateLocation: updateMarkerPosition,
  }));

  return (
    <div 
      ref={mapContainerRef} 
      style={{ 
        height, 
        width: '100%', 
        border: '2px solid #39e4c9', 
        borderRadius: '8px' 
      }} 
    />
  );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;
