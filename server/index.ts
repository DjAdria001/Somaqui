import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db';
import peticionesRouter from './routes/peticiones';
import cerrarEmergenciaRouter from './routes/cerrarEmergencia';
import enviarAyudaRouter from './routes/enviarAyuda';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware básico
app.use(express.json());
app.use('/api', cerrarEmergenciaRouter);
// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});
// después de app.use(express.json());
app.use(enviarAyudaRouter);
app.use('/api', peticionesRouter);
// Iniciar conexión y servidor
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ Servidor iniciado en http://localhost:${port}`);
  });
});
