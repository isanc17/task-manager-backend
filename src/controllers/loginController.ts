import { Request, Response } from 'express';
import { sendResponse } from '../utils/response';
import { connectToDatabase } from '../db/database';

export const login = async (req: Request, res: Response) => {
  const { usuario, contrasena } = req.body;

  try {
    const db = await connectToDatabase();

    // Consulta SQL con TRIM para eliminar espacios en blanco
    const user = await db.get(
      `SELECT * 
       FROM usuario 
       WHERE TRIM(usuario) = TRIM(?) AND TRIM(contrasena) = TRIM(?)`,
      [usuario, contrasena]
    );

    await db.close();

    if (!user) {
      return sendResponse(res, 401, 'error', 'Credenciales inválidas.');
    }

    // Generar token concatenando nombre y usuario
    const token = `${user.nombre}:${user.usuario}`;

    sendResponse(res, 200, 'success', 'Inicio de sesión exitoso.', { token });
  } catch (error) {
    console.error('Error en el login:', error);
    sendResponse(res, 500, 'error', 'Error interno en el servidor.');
  }
};
