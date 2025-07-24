// server/utils/geocode.ts
import fetch from 'node-fetch';

export const geocodeUbicacion = async (direccion: string) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
  const response = await fetch(url);
  const data = await response.json() as Array<{ lat: string; lon: string }>;

  if (data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }

  return { lat: null, lng: null };
};
