import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';  // Asegúrate de tener este import para las operaciones de Firebase
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importar AngularFirestore

interface User {
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) {}

  async createUser(userData: any) {
    return this.firestore.collection('users').add(userData);
  }

  // Método para registrar un nuevo usuario
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (result.user) {
        // Asignar el rol "usuario" al nuevo usuario
        await this.firestore.collection('users').doc(result.user.uid).set({
          role: 'usuario'  // Almacenar el rol aquí
        });
        console.log('Usuario registrado con éxito:', result);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  }

  // Método para autenticación con Google
  async googleSignIn() {
    try {
      const result = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
      if (result.user) {
        // Verificar si el usuario ya existe en Firestore
        const userDoc = await this.firestore.collection('users').doc(result.user.uid).get().toPromise();
        if (userDoc && userDoc.exists) {
          console.log('Usuario existente:', userDoc.data());
        } else {
          // Asignar el rol "usuario" al nuevo usuario
          await this.firestore.collection('users').doc(result.user.uid).set({
            role: 'usuario'  // Almacenar el rol aquí
          });
        }
        console.log('Inicio de sesión con Google exitoso:', result);
        this.router.navigate(['/catalogo2/catalogo2/']);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión con Google:', error);
    }
  }

  // Método para iniciar sesión
    async login(email: string, password: string) {
      try {
        const result = await this.afAuth.signInWithEmailAndPassword(email, password);
        if (result.user) {
          console.log('Inicio de sesión exitoso', result);
          this.router.navigate(['/catalogo2/catalogo2/']); // Redirigir después de iniciar sesión
        }
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        throw error; // Lanzar el error para manejarlo en el componente
      }
    }

  // Método para cerrar sesión
  async logout() {
    await this.afAuth.signOut();
    console.log('Sesión cerrada');
    this.router.navigate(['/login']); // Redirigir después de cerrar sesión
  }

  // Método para obtener el estado de autenticación
  getAuthState() {
    return this.afAuth.authState;
  }

  // Método para obtener el rol del usuario
  async getUserRole(uid: string) {
    const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
    if (userDoc && userDoc.exists) {
      const userData = userDoc.data() as User;  // Especificar el tipo
      return userData.role;  // Retorna el rol si existe
    }
    return null; // Retorna null si no existe
  }
}
