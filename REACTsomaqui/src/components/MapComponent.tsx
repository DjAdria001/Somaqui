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
  onAddressChange?: (address: string) => void;
  initialLocation?: { lat: number; lng: number };
  height?: string;
}

interface MapRef {
  updateLocation: (lat: number, lng: number) => void;
}

const MapComponent = React.forwardRef<MapRef, MapProps>(({ 
  onLocationSelect, 
  onAddressChange,
  initialLocation = { lat: 41.3851, lng: 2.1734 }, // Barcelona por defecto
  height = '400px' 
}, ref) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener la dirección desde coordenadas
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=es`
      );
      const data = await response.json();
      
      console.log('🔍 Datos completos de la API Nominatim:', data);
      console.log('🔍 Address object:', data.address);
      
      if (data && data.address) {
        const address = data.address;
        console.log('🏠 house_number:', address.house_number);
        console.log('🛣️ road:', address.road);
        console.log('🏘️ suburb:', address.suburb);
        console.log('🏙️ city/town:', address.city || address.town || address.village);
        
        const displayAddress = formatAddress(address, data.display_name);
        console.log('📍 Dirección formateada:', displayAddress);
        if (onAddressChange) {
          onAddressChange(displayAddress);
        }
        return displayAddress;
      }
    } catch (error) {
      console.error('Error getting address:', error);
    }
    return null;
  };

  // Función para formatear la dirección y filtrar "Eixample de Llevant"
  const formatAddress = (address: any, displayName?: string) => {
    console.log('🔧 Formateando dirección con datos:', address);
    console.log('🔧 Display name:', displayName);
    const parts = [];
    
    // Buscar el nombre de la calle en varios campos posibles
    const streetName = address.road || address.pedestrian || address.cycleway || address.footway || address.path || address.highway;
    
    // Buscar el número en varios campos posibles
    let houseNumber = address.house_number || address.street_number || address.addr_housenumber;
    
    // Si no encontramos el número, intentar extraerlo del display_name
    if (!houseNumber && displayName && streetName) {
      const displayParts = displayName.split(',');
      const firstPart = displayParts[0].trim();
      
      // Buscar patrón de número al final de la primera parte
      const numberMatch = firstPart.match(/(\d+)\s*$/);
      if (numberMatch) {
        houseNumber = numberMatch[1];
        console.log('🔍 Número extraído del display_name:', houseNumber);
      }
      
      // Otra estrategia: buscar patrón "calle, número"
      const streetNumberMatch = firstPart.match(/^(.+),\s*(\d+)$/);
      if (streetNumberMatch && !houseNumber) {
        houseNumber = streetNumberMatch[2];
        console.log('🔍 Número extraído del patrón calle,número:', houseNumber);
      }
    }
    
    console.log('🏗️ Street name found:', streetName);
    console.log('🔢 House number found:', houseNumber);
    
    // Agregar nombre de la calle y número
    if (streetName && houseNumber) {
      parts.push(`${streetName}, ${houseNumber}`);
      console.log('✅ Added street with number:', `${streetName}, ${houseNumber}`);
    } else if (streetName) {
      parts.push(streetName);
      console.log('✅ Added street without number:', streetName);
    }
    
    // Agregar barrio si no es "Eixample de Llevant" y no está ya incluido
    const neighborhood = address.suburb || address.neighbourhood || address.quarter;
    if (neighborhood && 
        neighborhood.toLowerCase() !== 'eixample de llevant' &&
        neighborhood.toLowerCase() !== "l'eixample" &&
        !parts.some(part => part.toLowerCase().includes(neighborhood.toLowerCase()))) {
      parts.push(neighborhood);
      console.log('✅ Added neighborhood:', neighborhood);
    }
    
    // Agregar ciudad/municipio
    const city = address.city || address.town || address.village || address.municipality || address.hamlet;
    if (city) {
      parts.push(city);
      console.log('✅ Added city:', city);
    }
    
    // Agregar provincia/estado
    const province = address.state || address.province || address.region;
    if (province) {
      parts.push(province);
      console.log('✅ Added province:', province);
    }
    
    const result = parts.length > 0 ? parts.join(', ') : 'Dirección no disponible';
    console.log('🎯 Resultado final de formatAddress:', result);
    return result;
  };

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

      // Añadir popup al marcador (pero no lo abrimos automáticamente)
      marker.bindPopup('📍 Tu ubicación<br><small>Arrastra para cambiar o haz clic en el mapa</small>');

      // Eventos del marcador
      marker.on('dragend', async () => {
        const pos = marker!.getLatLng();
        console.log('Marker dragged to:', pos);
        onLocationSelect(pos.lat, pos.lng);
        await getAddressFromCoordinates(pos.lat, pos.lng);
        marker!.setPopupContent(`📍 Ubicación: ${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`);
      });

      // Eventos del mapa
      map.on('click', async (e) => {
        const { lat, lng } = e.latlng;
        console.log('Map clicked at:', { lat, lng });
        marker!.setLatLng([lat, lng]);
        onLocationSelect(lat, lng);
        await getAddressFromCoordinates(lat, lng);
        marker!.setPopupContent(`📍 Ubicación: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
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
      
      // Obtener la dirección inicial
      getAddressFromCoordinates(initialLocation.lat, initialLocation.lng);

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

  const updateMarkerPosition = async (lat: number, lng: number) => {
    console.log('Updating marker position to:', { lat, lng });
    
    if (!markerRef.current || !mapRef.current) {
      console.error('Map or marker not ready for update');
      return;
    }

    try {
      markerRef.current.setLatLng([lat, lng]);
      mapRef.current.setView([lat, lng], 15, { animate: true });
      await getAddressFromCoordinates(lat, lng);
      markerRef.current.setPopupContent(`📍 Ubicación detectada: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      
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
