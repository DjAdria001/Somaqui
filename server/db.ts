import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (!uri) throw new Error("MONGO_URI no definido en .env");
    await mongoose.connect(uri);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
  }
};
