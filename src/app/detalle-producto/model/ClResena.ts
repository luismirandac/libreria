export class ClResena {
    id?: string; // Si el id es opcional
    comentario: string;
    calificacion: number;
    editando: boolean; // Nueva propiedad para controlar el estado de edición
  
    constructor(data: { comentario: string; calificacion: number; id?: string; editando?: boolean }) {
      this.id = data.id;
      this.comentario = data.comentario;
      this.calificacion = data.calificacion;
      this.editando = data.editando || false; // Inicializa como false si no se proporciona
    }
  }
  