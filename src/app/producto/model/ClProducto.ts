export class ClProducto {
  id?: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  fecha: Date;
  cantidad: number; // Cambiar a opcional
  imagen?: string;

  constructor(obj: any) {
    this.id = obj?.id || null;
    this.nombre = obj?.nombre || null;
    this.descripcion = obj?.descripcion || null;
    this.categoria = obj?.categoria || null;
    this.precio = obj?.precio || null;
    this.cantidad = obj.cantidad || 0; // Asignar 0 por defecto
    this.fecha = obj?.fecha || null;
    this.imagen = obj?.imagen || null;
  }
}
