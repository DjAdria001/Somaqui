import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // ← Esto carga el archivo .env

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any)
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((err) => console.error("❌ Error de conexión:", err));
