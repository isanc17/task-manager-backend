import { connectToDatabase } from "./database";
import { seed } from "./seed";

async function createTables(db: any): Promise<void> {
  try {
    console.log('Creando tabla "usuario"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS usuario (
        usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre CHAR(50) NOT NULL,
        usuario CHAR(10) NOT NULL,
        contrasena CHAR(20) NOT NULL,
        estado BOOLEAN NOT NULL
      );
    `);
    console.log('Tabla "usuario" creada.');

    console.log('Creando tabla "tareas"...');
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
    console.log('Tabla "tareas" creada.');
  } catch (error) {
    console.error("Error al crear las tablas:", error);
    throw error;
  }
}

async function initializeDatabase() {
  try {
    const db = await connectToDatabase();
    await createTables(db).then(async () => {
      console.log("Iniciando seeding...");
      await seed();
      console.log("Seeding completado.");
    });

    await db.close();
    console.log("Base de datos cerrada correctamente.");
  } catch (error) {
    console.error("Error durante la inicialización:", error);
  }
}

initializeDatabase().catch((error) => {
  console.error("Error fatal:", error);
});
