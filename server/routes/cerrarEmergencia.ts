import express from 'express';
import Mensaje from '../models/Mensaje';
import Conversacion from '../models/Conversacion';
import Peticion from '../models/Peticion';

const router = express.Router();

router.delete('/api/cerrar-emergencia/:id', async (req, res) => {
  const conversacionId = req.params.id;

  if (!conversacionId.match(/^[a-fA-F0-9]{24}$/)) {
    return res.status(400).json({ error: 'ID no válido' });
  }

  try {
    const conversacion = await Conversacion.findById(conversacionId);
    if (!conversacion) return res.status(404).json({ error: 'Conversación no encontrada' });

    const emergenciaId = conversacion.get('id_emergencia');

    await Mensaje.deleteMany({ conversacion_id: conversacionId });
    await Conversacion.deleteOne({ _id: conversacionId });
    await Peticion.deleteOne({ _id: emergenciaId });

    res.json({ success: true, message: 'Emergencia cerrada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cerrar emergencia' });
  }
});

export default router;
