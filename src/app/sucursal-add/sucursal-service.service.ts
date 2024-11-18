import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ClSucursal } from './model/ClSucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalServiceService {

  private sucursalCollection = this.firestore.collection<ClSucursal>('sucursal');

  constructor(private firestore: AngularFirestore) { }

  // Método para agregar un producto a Firestore
  addSucursal(sucursal: ClSucursal): Observable<any> {
    console.log("Agregando sucursal:", sucursal);

    return new Observable(observer => {
      this.sucursalCollection.add(sucursal).then(
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
