// server/routes/ayuda.routes.ts
import { Router } from 'express';
import { crearAyuda } from '../controllers/ayuda.controller';

const router = Router();

router.post('/ayuda', crearAyuda);

export default router;
