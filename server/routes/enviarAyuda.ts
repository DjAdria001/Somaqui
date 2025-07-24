import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

const peticionSchema = new mongoose.Schema({
  correo: String,
  ubicacion: String,
  desc_ubic: String,
  descripcion: String,
  etiquetas: [String],
  otros_detalle: String,
});

const conversacionSchema = new mongoose.Schema({
  id_emergencia: mongoose.Schema.Types.ObjectId,
  correo_solicitante: String,
});

const PeticionAyuda = mongoose.model('PeticionAyuda', peticionSchema);
const Conversacion = mongoose.model('Conversacion', conversacionSchema);

router.post('/api/enviar-ayuda', async (req: Request, res: Response) => {
  try {
    const {
      correo = '',
      ubicacion = '',
      desc_ubic = '',
      descripcion = '',
      otros_detalle = '',
      tags = [],
    } = req.body;

    // Validaciones
    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return res.status(400).json({ error: 'Correo no válido.' });
    }
    if (!ubicacion) {
      return res.status(400).json({ error: 'Debes seleccionar una ubicación.' });
    }
    if (!tags.length) {
      return res.status(400).json({ error: 'Selecciona al menos una etiqueta.' });
    }
    if (tags.includes('Otros') && !otros_detalle.trim()) {
      return res.status(400).json({ error: "Describe tu emergencia en el campo 'Otros'." });
    }

    // Guardar petición
    const peticion = new PeticionAyuda({
      correo,
      ubicacion,
      desc_ubic,
      descripcion,
      etiquetas: tags,
      otros_detalle,
    });
    const savedPeticion = await peticion.save();

    // Crear conversación asociada
    const conversacion = new Conversacion({
      id_emergencia: savedPeticion._id,
      correo_solicitante: correo,
    });
    const savedConversacion = await conversacion.save();

    res.status(201).json({ id_conversacion: savedConversacion._id });
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

export default router;
