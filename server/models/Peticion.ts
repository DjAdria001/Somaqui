import mongoose from 'mongoose';

const PeticionSchema = new mongoose.Schema({}, { strict: false });
export default mongoose.model('Peticion', PeticionSchema, 'peticiones_ayuda');
