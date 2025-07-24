import mongoose, { Schema, Document } from 'mongoose';

export interface IPeticion extends Document {
  descripcion: string;
  ubicacion: string;
  fecha: Date;
}

const PeticionSchema: Schema = new Schema({
  descripcion: { type: String, required: true },
  ubicacion: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model<IPeticion>('Peticion', PeticionSchema);
