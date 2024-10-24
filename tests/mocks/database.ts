export const connectToDatabase = async () => ({
    run: jest.fn().mockResolvedValue({ lastID: 1, changes: 1 }),
    all: jest.fn().mockResolvedValue([
      { tarea_id: 1, titulo: 'Tarea 1', estado: 'pendiente' },
    ]),
    prepare: jest.fn().mockResolvedValue({
      run: jest.fn().mockResolvedValue({ changes: 1 }),
      finalize: jest.fn().mockResolvedValue(undefined),
    }),
    close: jest.fn().mockResolvedValue(undefined),
  });