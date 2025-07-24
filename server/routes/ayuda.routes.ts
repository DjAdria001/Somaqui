import { Router, Request, Response } from 'express';
import Ayuda from '../models/ayuda.model';

const router = Router();

router.post('/ayuda', async (req: Request, res: Response) => {
  try {
    const {
      ubicacion,
      desc_ubic,
      nombre,
      correo,
      telefono,
      personales,
      tiempo,
      tags,
      otros_detalle,
      descripcion,
    } = req.body;

    if (!ubicacion || !nombre || !correo || !tiempo || !tags || tags.length === 0) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevaAyuda = new Ayuda({
      ubicacion,
      desc_ubic,
      nombre,
      correo,
      telefono,
      personales,
      tiempo,
      tags,
      otros_detalle,
      descripcion,
    });

    await nuevaAyuda.save();

    res.status(201).json({ message: 'Solicitud recibida correctamente' });
  } catch (error) {
    console.error('Error guardando ayuda:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
