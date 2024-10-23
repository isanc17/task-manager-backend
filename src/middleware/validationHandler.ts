import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendResponse } from '../utils/response';


export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, 'error', 'Datos inválidos.', errors.array());
  }
  next();
};