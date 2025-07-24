// server/controllers/ayuda.controller.ts
import { Request, Response } from 'express';
import Ayuda from '../models/ayuda.model';
import { geocodeUbicacion } from '../utils/geocode';

export const crearAyuda = async (req: Request, res: Response) => {
  try {
    const datos = req.body;

    const coords = await geocodeUbicacion(datos.ubicacion);
    const nuevaAyuda = new Ayuda({
      ...datos,
      coords,
    });

    const guardada = await nuevaAyuda.save();
    res.status(201).json(guardada);
  } catch (error) {
    console.error('❌ Error al crear ayuda:', error);
    res.status(500).json({ mensaje: 'Error al guardar la ayuda' });
  }
};
