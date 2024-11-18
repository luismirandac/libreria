import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Importar Firebase Storage
import { Observable } from 'rxjs';
import { ClProducto } from './model/ClProducto';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private productosCollection = this.firestore.collection<ClProducto>('libros');

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  // Método para buscar productos por nombre
  searchProductByName(nombre: string): Observable<any> {
    return this.firestore
      .collection('libros', (ref) => ref.where('nombre', '>=', nombre).where('nombre', '<=', nombre + '\uf8ff'))
      .snapshotChanges();
  }

  // Método para agregar un producto a Firestore
  addProduct(producto: ClProducto, file?: File): Observable<any> {
    return new Observable(observer => {
      if (file) {
        // Si se seleccionó un archivo, lo subimos a Firebase Storage
        const filePath = `libros/${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, file);

        // Después de que el archivo se haya subido
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              producto.imagen = url; // Guardar URL de la imagen
              this.saveProductToFirestore(producto, observer);
            });
          })
        ).subscribe();
      } else {
        // Si no se seleccionó archivo, guardar producto directamente
        this.saveProductToFirestore(producto, observer);
      }
    });
  }

  // Método para guardar el producto en Firestore
  private saveProductToFirestore(producto: ClProducto, observer: any) {
    this.productosCollection.add(producto).then(
      res => {
        observer.next(res);
        observer.complete();
      },
      err => {
        observer.error(err);
      }
    );
  }

  // Método para obtener un producto por su ID
  getProduct(id: string): Observable<any> {
    return this.firestore.collection('libros').doc(id).snapshotChanges();
  }

  // Método para actualizar un producto existente
  updateProduct(id: string, producto: ClProducto, file?: File): Observable<any> {
    return new Observable(observer => {
      if (file) {
        // Subir nueva imagen si se proporciona un archivo
        const filePath = `libros/${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, file);

        // Después de que el archivo se haya subido
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              producto.imagen = url; // Guardar URL de la nueva imagen
              this.updateProductInFirestore(id, producto, observer);
            });
          })
        ).subscribe();
      } else {
        // Actualizar el producto sin cambiar la imagen
        this.updateProductInFirestore(id, producto, observer);
      }
    });
  }

  // Método para actualizar el producto en Firestore
  private updateProductInFirestore(id: string, producto: ClProducto, observer: any) {
    this.firestore.collection('libros').doc(id).update(producto).then(
      res => {
        observer.next(res);
        observer.complete();
      },
      err => {
        observer.error(err);
      }
    );
  }

  // Método para manejar errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error en ${operation}:`, error);
      return new Observable<T>();
    };
  }
}
