// models/PeticionAyuda.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPeticionAyuda extends Document {
  // campos de emergencia...
}

const PeticionAyudaSchema = new Schema({
  // campos...
});

export default mongoose.model<IPeticionAyuda>('PeticionAyuda', PeticionAyudaSchema);
