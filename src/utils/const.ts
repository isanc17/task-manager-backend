export const updTarea = `UPDATE tareas SET usuario_asignado_id = ?, estado = ?, titulo = ?, descripcion = ?, fecha_vencimiento = ? WHERE tarea_id = ?`;
export const delTarea = `DELETE FROM tareas WHERE tarea_id = ?`;
export const insTarea = `INSERT INTO tareas (usuario_asignado_id, usuario_creador_id, estado, titulo, descripcion, fecha_vencimiento) VALUES (?, ?, ?, ?, ?, ?)`;
export const getUsrAct = `SELECT usuario_id, nombre, usuario, estado FROM usuario WHERE estado = 1`;
export const getUsr = `SELECT usuario_id, nombre, usuario, estado FROM usuario`;

