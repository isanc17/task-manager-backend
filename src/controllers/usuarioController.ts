import { Request, Response } from 'express';
import { connectToDatabase } from '../db/database';
import { sendResponse } from '../utils/response';
import { getUsr, getUsrAct } from '../utils/const';


export const getUsuariosAct = async (_req: Request, res: Response): Promise<void> => {
  try {
    const db = await connectToDatabase();

    const usuarios = await db.all(getUsrAct);
    
    await db.close();

    sendResponse(res, 200, 'success', 'Usuarios activos obtenidos exitosamente.', usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    sendResponse(res, 500, 'error', 'Error interno al obtener los usuarios.');
  }
};

export const getUsuarios = async (_req: Request, res: Response): Promise<void> => {
    try {
      const db = await connectToDatabase();
  
      const usuarios = await db.all(getUsr);
      
      await db.close();
  
      sendResponse(res, 200, 'success', 'Usuarios obtenidos exitosamente.', usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      sendResponse(res, 500, 'error', 'Error interno al obtener los usuarios.');
    }
};


