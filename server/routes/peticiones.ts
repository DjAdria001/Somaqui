import express from 'express';
import Peticion from '../models/Peticion';

const router = express.Router();

router.get('/api/peticiones', async (req, res) => {
  try {
    const peticiones = await Peticion.find().sort({ fecha_envio: -1 }).limit(100);
    res.json(peticiones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener peticiones' });
  }
});

export default router;
