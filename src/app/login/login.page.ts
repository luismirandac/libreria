import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, ModalController } from '@ionic/angular'; // Importa ModalController
import { AccesibilidadModalComponent } from './accesibilidad-modal/accesibilidad-modal.component'; // Importa el modal

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  isAuthenticated: boolean = false; // Asegúrate de tener esto para mostrar el mensaje de seguridad

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private modalController: ModalController // Inyecta ModalController
  ) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación para obtener los datos del usuario
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true; // Usuario logueado
        this.email = user.email || ''; // Completa el campo de correo
        this.password = ''; // Dejar el campo de contraseña vacío por razones de seguridad
      } else {
        this.isAuthenticated = false; // Usuario no logueado
        this.clearFields(); // Limpia los campos si no hay usuario logueado
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
      })
      .catch(error => {
        console.error('Error al iniciar sesión', error);
      });
  }

  // Método para iniciar sesión con Google
  googleSignIn() {
    this.authService.googleSignIn()
      .then(() => {
        console.log('Inicio de sesión con Google exitoso');
      })
      .catch(error => {
        console.error('Error en el inicio de sesión con Google', error);
      });
  }

  // Método para cerrar sesión
  async logout() {
    this.authService.logout()
      .then(async () => {
        console.log('Sesión cerrada');
        this.clearFields(); // Limpia los campos al cerrar sesión
        await this.showLogoutAlert(); // Muestra la alerta de cierre de sesión
      })
      .catch(error => {
        console.error('Error al cerrar sesión', error);
      });
  }

  // Método para limpiar los campos de correo y contraseña
  clearFields() {
    this.email = '';
    this.password = '';
  }

  // Método para mostrar la alerta de cierre de sesión
  async showLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Sesión cerrada',
      message: 'Sesión cerrada con éxito',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método para abrir el modal de accesibilidad
  async openAccessibilityModal() {
    const modal = await this.modalController.create({
      component: AccesibilidadModalComponent
    });
    await modal.present();
  }
}
