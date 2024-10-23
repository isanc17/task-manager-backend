import { connectToDatabase } from './database';
import { seed } from './seed';

async function initializeDatabase() {
  const db = await connectToDatabase();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuario (
      usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre CHAR(50) NOT NULL,
      usuario CHAR(10) NOT NULL,
      contrasena CHAR(20) NOT NULL,
      estado BOOLEAN NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tareas (
      tarea_id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_asignado_id INTEGER NOT NULL,
      usuario_creador_id INTEGER NOT NULL,
      estado CHAR(10) NOT NULL,
      titulo CHAR(70) NOT NULL,
      descripcion TEXT,
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      fecha_vencimiento DATE,
      FOREIGN KEY (usuario_asignado_id) REFERENCES usuario(usuario_id),
      FOREIGN KEY (usuario_creador_id) REFERENCES usuario(usuario_id)
    );
  `);

  await seed(); 

  console.log('Base de datos inicializada correctamente.');
  await db.close();
}

initializeDatabase().catch((error) => {
  console.error('Error al inicializar la base de datos:', error);
});