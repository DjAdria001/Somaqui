// models/Mensaje.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMensaje extends Document {
  conversacion_id: mongoose.Types.ObjectId;
  // otros campos...
}

const MensajeSchema = new Schema({
  conversacion_id: { type: Schema.Types.ObjectId, ref: 'Conversacion', required: true },
  // otros campos...
});

export default mongoose.model<IMensaje>('Mensaje', MensajeSchema);
