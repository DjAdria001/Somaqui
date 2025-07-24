// server/models/ayuda.model.ts
import mongoose from 'mongoose';

const AyudaSchema = new mongoose.Schema({
  id: String,
  ubicacion: String,
  desc_ubic: String,
  descripcion: String,
  etiquetas: String,
  otros_detalle: String,
  fecha_envio: String,
  correo: String,
  estado: String,
  coords: {
    lat: Number,
    lng: Number
  }
});

export default mongoose.model('Ayuda', AyudaSchema);
