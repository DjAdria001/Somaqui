// routes/cerrarEmergencia.ts
import { Router, Request, Response } from 'express';
import Conversacion from '../models/Conversacion';
import Mensaje from '../models/Mensaje';
import PeticionAyuda from '../models/PeticionAyuda';
import mongoose from 'mongoose';

const router = Router();

router.delete('/cerrar-emergencia/:id', async (req: Request, res: Response) => {
  const conversacionId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(conversacionId)) {
    return res.status(400).json({ error: 'ID no válido' });
  }

  try {
    // 1. Obtener la conversación y su emergencia asociada
    const conversacion = await Conversacion.findById(conversacionId);
    if (!conversacion) {
      return res.status(404).json({ error: 'No se encontró la conversación' });
    }

    const emergenciaId = conversacion.id_emergencia;

    // 2. Borrar los mensajes de la conversación
    await Mensaje.deleteMany({ conversacion_id: conversacionId });

    // 3. Borrar la conversación
    await Conversacion.findByIdAndDelete(conversacionId);

    // 4. Borrar la emergencia
    await PeticionAyuda.findByIdAndDelete(emergenciaId);

    // Respuesta exitosa
    return res.json({ message: '✅ Emergencia cerrada correctamente' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al cerrar emergencia' });
  }
});

export default router;
