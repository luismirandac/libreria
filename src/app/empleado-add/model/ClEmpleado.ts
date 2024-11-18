export class ClEmpleado {
    // si no Inicializo los valores, da Error
    // Por eso es el constructor por obligación
    nombre: string;
    sucursal: string;
    supervisor: string;
    cargo: string;
    sueldo: number;
    imagen: string;
  
    // si no Inicializo los valores, da Error
      constructor(obj: any){
          this.nombre = obj && obj.nombre || null
          this.sucursal = obj && obj.sucursal || null
          this.supervisor = obj && obj.supervisor || null
          this.cargo = obj && obj.cargo || null
          this.sueldo = obj && obj.sueldo || null
          this.imagen = obj && obj.imagen || null
      }
  }