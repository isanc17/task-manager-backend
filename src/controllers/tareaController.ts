import { Request, Response } from "express";
import { connectToDatabase } from "../db/database";
import { sendResponse } from "../utils/response";
import { Tarea } from "../models/models";
import { validationResult } from "express-validator";
import { delTarea, insTarea, updTarea } from "../utils/const";

export const createTarea = async (
  req: Request,
  res: Response
): Promise<void> => {

  const {
    usuario_asignado_id,
    usuario_creador_id,
    estado,
    titulo,
    descripcion,
    fecha_vencimiento,
  } = req.body;

  try {
    const db = await connectToDatabase();
    const result = await db.run(insTarea
      ,
      [
        usuario_asignado_id,
        usuario_creador_id,
        estado,
        titulo,
        descripcion,
        fecha_vencimiento,
      ]
    );

    await db.close();

    const newTarea: Tarea = {
      tarea_id: result.lastID,
      usuario_asignado_id,
      usuario_creador_id,
      estado,
      titulo,
      descripcion,
      fecha_vencimiento,
    };

    sendResponse(res, 201, "success", "Tarea creada exitosamente.", newTarea);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    sendResponse(res, 500, "error", "Error interno al crear la tarea.");
  }
};

export const getTareas = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const db = await connectToDatabase();

    const tareas = await db.all(`SELECT * FROM tareas`);

    await db.close();

    sendResponse(res, 200, "success", "Tareas obtenidas exitosamente.", tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    sendResponse(res, 500, "error", "Error interno al obtener las tareas.");
  }
};

export const updateTarea = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    usuario_asignado_id,
    estado,
    titulo,
    descripcion,
    fecha_vencimiento,
  } = req.body;

  try {
    const db = await connectToDatabase();

    const stmt = await db.prepare(updTarea);

    const result = await stmt.run([
      usuario_asignado_id,
      estado,
      titulo,
      descripcion,
      fecha_vencimiento,
      id,
    ]);

    await stmt.finalize();
    await db.close();

    if (result.changes === 0) {
      return sendResponse(res, 404, "error", "Tarea no encontrada.");
    }

    sendResponse(res, 200, "success", "Tarea actualizada exitosamente.");
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    sendResponse(res, 500, "error", "Error interno al actualizar la tarea.");
  }
};

export const deleteTarea = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const db = await connectToDatabase();
    const stmt = await db.prepare(delTarea);
    const result = await stmt.run([req.params.id]);
    await stmt.finalize();
    await db.close();

    if (result.changes === 0) {
      return sendResponse(res, 404, "error", "Tarea no encontrada.");
    }

    sendResponse(res, 200, "success", "Tarea eliminada exitosamente.");
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    sendResponse(res, 500, "error", "Error interno al eliminar la tarea.");
  }
};

function throwError(mensaje: string) {
  throw new Error(mensaje);
}
