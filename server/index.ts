// server/index.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import ayudaRoutes from './routes/ayuda.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', ayudaRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(3000, () => {
      console.log('✅ Servidor iniciado en http://localhost:3000');
    });
  })
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));
