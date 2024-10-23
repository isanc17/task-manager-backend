export interface Usuario {
    usuario_id?: number;
    nombre: string;
    usuario: string;
    contrasena: string;
    estado: boolean;
}

export interface Tarea {
    tarea_id?: number;
    usuario_asignado_id: number;
    usuario_creador_id: number;
    estado: string;
    titulo: string;
    descripcion: string;
    fecha_creacion?: string;
    fecha_vencimiento: string;
}