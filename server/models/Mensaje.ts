import mongoose from 'mongoose';

const MensajeSchema = new mongoose.Schema({}, { strict: false });
export default mongoose.model('Mensaje', MensajeSchema, 'mensajes');
