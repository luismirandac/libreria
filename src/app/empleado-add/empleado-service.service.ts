import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ClEmpleado } from './model/ClEmpleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {

  private empleadoCollection = this.firestore.collection<ClEmpleado>('empleado');

  constructor(private firestore: AngularFirestore) { }

  // Método para agregar un producto a Firestore
  addEmpleado(empleado: ClEmpleado): Observable<any> {
    console.log("Agregando empleado:", empleado);
    return new Observable(observer => {
      this.empleadoCollection.add(empleado).then(
        res => {
          observer.next(res);
          observer.complete();
        },
        err => {
          observer.error(err);
        }
      );
    });
  }

  // Método para manejar errores, en este caso podría no ser necesario
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error en ${operation}:`, error);
      return new Observable<T>();
    };
  }
}
