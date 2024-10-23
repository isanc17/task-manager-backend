import { Router } from 'express';
import { createTarea, updateTarea, getTareas, deleteTarea } from '../controllers/tareaController';
import { tareaCreateValidator, tareaUpdateValidator } from '../middleware/tareaValidator';
import { handleValidationErrors } from '../middleware/validationHandler';

const router = Router();

router.post('/', tareaCreateValidator, handleValidationErrors, createTarea);
router.put('/:id', tareaUpdateValidator, handleValidationErrors, updateTarea);
router.get('/', getTareas);
router.delete('/:id', deleteTarea);

export default router;
