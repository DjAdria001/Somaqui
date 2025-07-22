import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cerrarEmergencia from './routes/cerrarEmergencia';
import peticiones from './routes/peticiones';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use(cerrarEmergencia);
app.use(peticiones);

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any)
.then(() => {
  console.log('✅ Conectado a MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err);
});
