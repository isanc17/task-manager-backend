import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';

export const autenticarToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, 401, 'error', 'Token de autenticación requerido.');
  }

  const token = authHeader.split(' ')[1];


  if (!token.includes(':')) {
    return sendResponse(res, 401, 'error', 'Token inválido.');
  }

  next(); 
};
