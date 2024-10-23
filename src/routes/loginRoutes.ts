import { Router } from 'express';
import { login } from '../controllers/loginController';

const router = Router();

// Ruta de login
router.post('/login', login);

export default router;
