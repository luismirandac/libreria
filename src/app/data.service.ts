import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EMPTY, Observable, from, map, mergeMap, switchMap, take } from 'rxjs';
import { ClProducto } from './producto/model/ClProducto';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loTablas = 'libros';
  loSucursal = 'sucursal';
  loEmpleado = 'empleado';
  loCarrito = 'carrito';

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  // Método para obtener los detalles de un libro por ID
  getLibroById(id: string): Observable<any> {
    return this.firestore.collection(this.loTablas).doc(id).valueChanges();
  }

  // Obtener todos los items
  getItems() {
    return this.firestore.collection(this.loTablas).snapshotChanges();
  }

  // Agregar un nuevo item
  addItem(item: any) {
    return this.firestore.collection(this.loTablas).add(item);
  }

  // Actualizar un item existente
  updateItem(id: string, item: any): Observable<void> {
    return from(this.firestore.collection(this.loTablas).doc(id).update(item));
  }

  // Eliminar un item
  deleteItem(id: string): Observable<void> {
    return from(this.firestore.collection(this.loTablas).doc(id).delete());
  }

  // Obtener todos los items
  getSucursales() {
    return this.firestore.collection(this.loSucursal).snapshotChanges();
  }

  // Agregar un nuevo item
  addSucursal(item: any) {
    return this.firestore.collection(this.loSucursal).add(item);
  }

  // Actualizar un item existente
  updateSucursal(id: string, item: any): Observable<void> {
    return from(this.firestore.collection(this.loSucursal).doc(id).update(item));
  }

  // Eliminar un item
  deleteSucursal(id: string): Observable<void> {
    return from(this.firestore.collection(this.loSucursal).doc(id).delete());
  }

  // Obtener todos los items
  getEmpleados() {
    return this.firestore.collection(this.loEmpleado).snapshotChanges();
  }

  // Agregar un nuevo item
  addEmpleado(item: any) {
    return this.firestore.collection(this.loEmpleado).add(item);
  }

  // Actualizar un item existente
  updateEmpleado(id: string, item: any): Observable<void> {
    return from(this.firestore.collection(this.loEmpleado).doc(id).update(item));
  }

  // Eliminar un item
  deleteEmpleado(id: string): Observable<void> {
    return from(this.firestore.collection(this.loEmpleado).doc(id).delete());
  }

  // Método para agregar un libro al carrito o actualizar la cantidad si ya existe
  addToCart(libro: ClProducto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.pipe(take(1)).subscribe(user => {
        if (user) {
          const carritoRef = this.firestore.collection(this.loCarrito, ref =>
            ref.where('id', '==', libro.id).where('uid', '==', user.uid)
          );
  
          carritoRef.snapshotChanges().pipe(take(1)).subscribe(snapshot => {
            if (snapshot.length === 0) {
              // Si no existe, se agrega con cantidad 1
              this.firestore.collection(this.loCarrito).add({ ...libro, cantidad: 1, uid: user.uid })
                .then(() => resolve())
                .catch(reject);
            } else {
              // Si existe, se actualiza la cantidad
              const docId = snapshot[0].payload.doc.id; // Obtiene el ID del documento existente
              const existingItem = snapshot[0].payload.doc.data() as ClProducto; // Hacer casting a ClProducto
              const nuevaCantidad = (existingItem.cantidad || 0) + 1; // Usa 0 como valor predeterminado
  
              this.firestore.collection(this.loCarrito).doc(docId).update({ cantidad: nuevaCantidad })
                .then(() => resolve())
                .catch(reject);
            }
          }, reject);
        } else {
          reject(new Error('No hay usuario autenticado'));
        }
      }, reject);
    });
  }
  
  

  // Método para obtener los libros en el carrito
  getCartItems(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection(this.loCarrito, ref => ref.where('uid', '==', user.uid)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as any;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
        } else {
          return EMPTY; // Retorna un observable vacío si no hay usuario autenticado
        }
      })
    );
  }

    // Método para obtener el número de artículos únicos en el carrito
    getCartItemCount(): Observable<number> {
      return this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.firestore.collection(this.loCarrito, ref => ref.where('uid', '==', user.uid)).snapshotChanges().pipe(
              map(actions => actions.length)  // Número de libros únicos en el carrito
            );
          } else {
            return EMPTY; // Retorna un observable vacío si no hay usuario autenticado
          }
        })
      );
    }

  // Método para comprar libros y descontar de la colección de libros
  buyItems(cartItems: ClProducto[]): Observable<any[]> {
    const updatePromises = cartItems.map(item => {
      // Descontar la cantidad del libro en la colección "libros"
      return this.firestore.collection(this.loTablas).doc(item.id).update({
        cantidad: firebase.firestore.FieldValue.increment(-item.cantidad) // Descontar la cantidad
      });
    });

    // Espera que todas las promesas se resuelvan
    return from(Promise.all(updatePromises));
  }

  // Método para vaciar el carrito
  clearCart(): Observable<void> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const carritoRef = this.firestore.collection(this.loCarrito, ref => ref.where('uid', '==', user.uid));
          
          return carritoRef.get().pipe(
            mergeMap(snapshot => {
              if (snapshot.empty) {
                return EMPTY; // Si el carrito está vacío, retornar EMPTY
              }
              const deletePromises = snapshot.docs.map(doc => {
                return carritoRef.doc(doc.id).delete(); // Elimina cada documento
              });
              return from(Promise.all(deletePromises)).pipe(
                mergeMap(() => {
                  return EMPTY; // Retornar EMPTY para indicar que se completó sin emitir valores
                })
              );
            })
          );
        } else {
          return EMPTY; // Retorna un observable vacío si no hay usuario autenticado
        }
      })
    );
  }

  // Método para agregar una reseña a un libro específico
  addReview(libroId: string, review: { comentario: string; calificacion: number }): Observable<void> {
    const resenaData = {
      comentario: review.comentario,
      calificacion: review.calificacion
    };

    return from(this.firestore.collection(`libros/${libroId}/resenas`).add(resenaData)).pipe(
      map(() => void 0)
    );
  }

  // Método para obtener las reseñas de un libro específico
  getReviewsByLibroId(libroId: string): Observable<any[]> {
    return this.firestore.collection(`libros/${libroId}/resenas`).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Método para actualizar una reseña
  updateReview(libroId: string, id: string, data: any): Observable<void> {
    return from(this.firestore.collection(`libros/${libroId}/resenas`).doc(id).update(data)).pipe(
      map(() => void 0)
    );
  }

  // Método para eliminar una reseña
  deleteReview(libroId: string, id: string): Observable<void> {
    return from(this.firestore.collection(`libros/${libroId}/resenas`).doc(id).delete()).pipe(
      map(() => void 0)
    );
  }

    // Método para registrar una compra en Firestore
  addPurchase(purchaseDetails: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.pipe(take(1)).subscribe(user => {
        if (user) {
          const purchaseData = {
            ...purchaseDetails,
            uid: user.uid, // Asociar la compra al usuario autenticado
            fechaCompra: firebase.firestore.FieldValue.serverTimestamp() // Registrar la fecha de la compra
          };
          
          // Agregar la compra a la colección 'compras'
          this.firestore.collection('compras').add(purchaseData)
            .then(() => resolve())
            .catch(reject);
        } else {
          reject(new Error('No hay usuario autenticado'));
        }
      });
    });
  }

  async getMonthlyPurchases(month: number): Promise<any[]> {
    // Obtiene el primer día del mes seleccionado
    const startOfMonth = new Date();
    startOfMonth.setFullYear(startOfMonth.getFullYear(), month, 1);
    
    // Obtiene el último día del mes seleccionado
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(month + 1);
    endOfMonth.setDate(0); // Último día del mes
  
    const purchasesRef = this.firestore.collection('compras', ref =>
      ref.where('fechaCompra', '>=', startOfMonth)
         .where('fechaCompra', '<=', endOfMonth)
    );
  
    try {
      const snapshot = await purchasesRef.get().toPromise();
  
      // Verifica que snapshot exista y tenga documentos
      if (!snapshot || snapshot.empty) {
        return []; // Retorna un array vacío si no hay documentos
      }
  
      // Mapea los documentos obtenidos y verifica los datos
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...(data && typeof data === 'object' ? data : {}) // Verifica que data sea un objeto antes de usar el spread
        };
      });
    } catch (error) {
      console.error('Error al obtener las compras del mes:', error);
      return [];
    }
  }


}
