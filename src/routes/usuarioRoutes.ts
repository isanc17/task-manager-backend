import { Router } from 'express';
import {
    getUsuariosAct,
    getUsuarios 
} from '../controllers/usuarioController';

const router = Router();

router.get('/activos', getUsuariosAct);   
router.get('/', getUsuarios);    

export default router;
