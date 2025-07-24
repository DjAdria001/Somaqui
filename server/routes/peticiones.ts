import { Router, Request, Response } from 'express';
import Peticion from '../models/Peticion';

const router = Router();

// Obtener todas las peticiones
router.get('/peticiones', async (req: Request, res: Response) => {
  try {
    const peticiones = await Peticion.find().sort({ fecha: -1 });
    res.json(peticiones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener peticiones' });
  }
});

// Crear nueva peticion
router.post('/peticiones', async (req: Request, res: Response) => {
  try {
    const { descripcion, ubicacion } = req.body;
    const nuevaPeticion = new Peticion({ descripcion, ubicacion });
    await nuevaPeticion.save();
    res.status(201).json(nuevaPeticion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear peticion' });
  }
});

export default router;
