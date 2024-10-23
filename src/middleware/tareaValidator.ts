import { body, ValidationChain } from 'express-validator';

// Reglas comunes para crear y actualizar tareas
const tareaValidation: ValidationChain[] = [
  body('usuario_asignado_id')
    .isInt({ gt: 0 })
    .withMessage('El ID del usuario asignado debe ser un número entero positivo.'),
  body('estado')
    .isIn(['pendiente', 'en progreso', 'completada'])
    .withMessage('El estado debe ser uno de los siguientes: pendiente, en progreso, completada.'),
  body('titulo')
    .isString()
    .notEmpty()
    .withMessage('El título es obligatorio y debe ser una cadena de texto.'),
  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción, si se proporciona, debe ser una cadena de texto.'),
  body('fecha_vencimiento')
    .optional()
    .isISO8601()
    .withMessage('La fecha de vencimiento, si se proporciona, debe ser una fecha válida en formato ISO8601.'),
];

// Validación específica para la creación de tareas
export const tareaCreateValidator = [
  ...tareaValidation,
  body('usuario_creador_id')
    .isInt({ gt: 0 })
    .withMessage('El ID del usuario creador debe ser un número entero positivo.'),
];

// Validación específica para la actualización de tareas
export const tareaUpdateValidator = [...tareaValidation];