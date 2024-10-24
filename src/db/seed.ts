import { connectToDatabase } from './database';

const usuarios = [
    { nombre: 'Admin', usuario: 'admin', contrasena: 'admin', estado: 1 },
    { nombre: 'Juan Pérez', usuario: 'jperez', contrasena: 'admin', estado: 1 },
    { nombre: 'Ana Gómez', usuario: 'agomez', contrasena: 'admin', estado: 1 },
    { nombre: 'Carlos Martínez', usuario: 'cmartinez', contrasena: 'admin', estado: 0 }
  ];

export async function seed() {
  const db = await connectToDatabase();

  console.log('Verificando si existen usuarios...');

  const existingUsers = await db.get(`SELECT COUNT(*) as count FROM usuario`);
  if (existingUsers.count > 0) {
    console.log('Usuarios ya existentes. No se necesita seeding.');
    return;
  }

  console.log('Cargando usuario inicial...');

  const insertQuery = `
  INSERT INTO usuario (nombre, usuario, contrasena, estado)
  VALUES (?, ?, ?, ?)`;

  await Promise.all(
    usuarios.map(usuario =>
      db.run(insertQuery, [
        usuario.nombre,
        usuario.usuario,
        usuario.contrasena,
        usuario.estado
      ])
    )
  );

  console.log('Usuario inicial cargado.');
  await db.close();
}

seed().catch((error) => {
  console.error('Seeding no encuentra la bd');
});