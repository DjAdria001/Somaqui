// models/Conversacion.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IConversacion extends Document {
  id_emergencia: mongoose.Types.ObjectId;
  // otros campos...
}

const ConversacionSchema = new Schema({
  id_emergencia: { type: Schema.Types.ObjectId, ref: 'PeticionAyuda', required: true },
  // otros campos...
});

export default mongoose.model<IConversacion>('Conversacion', ConversacionSchema);
