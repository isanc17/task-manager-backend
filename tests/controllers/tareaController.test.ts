import request from 'supertest';
import express, { Application } from 'express';
import { createTarea, getTareas, updateTarea, deleteTarea } from '../../src/controllers/tareaController';
import { connectToDatabase } from '../../src/db/database';

jest.mock('../../test/mocks/database'); 

const app: Application = express();
app.use(express.json());

app.post('/tareas', createTarea);
app.get('/tareas', getTareas);
app.put('/tareas/:id', updateTarea);
app.delete('/tareas/:id', deleteTarea);

describe('TareaController', () => {
  it('debería crear una tarea exitosamente', async () => {
    const response = await request(app).post('/tareas').send({
      usuario_asignado_id: 1,
      usuario_creador_id: 1,
      estado: 'pendiente',
      titulo: 'Nueva Tarea',
      descripcion: 'Descripción de la tarea',
      fecha_vencimiento: '2024-12-31',
    });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Tarea creada exitosamente.');
    expect(response.body.data.tarea_id).toBe(1);
  });

  it('debería obtener todas las tareas', async () => {
    const response = await request(app).get('/tareas');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].titulo).toBe('Tarea 1');
  });

  it('debería actualizar una tarea exitosamente', async () => {
    const response = await request(app).put('/tareas/1').send({
      usuario_asignado_id: 1,
      estado: 'en progreso',
      titulo: 'Tarea Actualizada',
      descripcion: 'Descripción actualizada',
      fecha_vencimiento: '2024-11-30',
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Tarea actualizada exitosamente.');
  });

  it('debería eliminar una tarea exitosamente', async () => {
    const response = await request(app).delete('/tareas/1');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Tarea eliminada exitosamente.');
  });

  it('debería devolver un error 404 si la tarea no existe al actualizar', async () => {
    const mockDb = await connectToDatabase();
    mockDb.prepare.mockResolvedValue({
      run: jest.fn().mockResolvedValue({ changes: 0 }),
      finalize: jest.fn().mockResolvedValue(undefined),
    });

    const response = await request(app).put('/tareas/99').send({
      usuario_asignado_id: 1,
      estado: 'en progreso',
      titulo: 'Tarea No Existente',
    });

    expect(response.status).toBe(404);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Tarea no encontrada.');
  });
});
