import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController // Inyecta AlertController
  ) {}

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async googleSignIn() {
    try {
      await this.authService.googleSignIn();
    } catch (error) {
      console.error('Error en el inicio de sesión con Google:', error);
    }
  }

  async register() {
    // Verifica los requisitos
    if (this.password.length < 6) {
      await this.presentAlert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Verifica que el correo electrónico tenga el formato correcto de Gmail o Hotmail
    if (!this.email.endsWith('@gmail.com') && !this.email.endsWith('@hotmail.com')) {
      await this.presentAlert('El correo electrónico debe ser una dirección de Gmail o Hotmail (ejemplo@gmail.com o ejemplo@hotmail.com).');
      return;
    }

    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/catalogo2/catalogo2/']);
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = 'Error en el registro: ' + error.message;
      } else {
        this.errorMessage = 'Error desconocido en el registro.';
      }
      console.error('Error en el registro:', error);
      await this.presentAlert(this.errorMessage); // Mostrar alerta con el mensaje de error
    }
  }
}
