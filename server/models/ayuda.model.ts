import { Schema, model } from 'mongoose';

const ayudaSchema = new Schema({
  ubicacion: { type: String, required: true }, // formato "lat,lng"
  desc_ubic: { type: String, default: '' },
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, default: '' },
  personales: { type: String, default: '' },
  tiempo: { type: String, required: true },
  tags: { type: [String], required: true },
  otros_detalle: { type: String, default: '' },
  descripcion: { type: String, default: '' },
  fecha_envio: { type: Date, default: Date.now },
});

export default model('Ayuda', ayudaSchema);
