import mongoose from 'mongoose';

const ConversacionSchema = new mongoose.Schema({}, { strict: false });
export default mongoose.model('Conversacion', ConversacionSchema, 'conversaciones');
