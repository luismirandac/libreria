// export class ClProducto {
//   id: number;
//   nombre: string;
//   descripcion: string;
//   precio: number;
//   cantidad: number;
//   fecha: Date;
//     constructor(values: Object= {}){
//         Object.assign(this, values);
//     }
// }
export class ClSucursal {
    // si no Inicializo los valores, da Error
    // Por eso es el constructor por obligación
    nombre: string;
    direccion: string;
    encargado: string;
  
    // si no Inicializo los valores, da Error
      constructor(obj: any){
          this.nombre = obj && obj.nombre || null
          this.direccion = obj && obj.direccion || null
          this.encargado = obj && obj.encargado || null
      }
  }