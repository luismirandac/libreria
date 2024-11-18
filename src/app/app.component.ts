import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'; // Asegúrate de que la ruta sea correcta
import { AlertController } from '@ionic/angular'; // Importa AlertController

interface AppPage {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages: AppPage[] = [
    { title: 'Catalogo', url: '/catalogo2/catalogo2', icon: 'bag' },
    { title: 'Administracion', url: '/administracion/administracion', icon: 'lock-closed' },
    { title: 'Categoria', url: '/categoria/categoria', icon: 'book' },
    { title: 'Mapa', url: '/mapita/mapita', icon: 'locate' },
  ];

  public filteredAppPages: AppPage[] = [];
  public userName: string = ''; // Variable para almacenar el nombre del usuario
  public isLoggedIn: boolean = false; // Variable para controlar el estado de inicio de sesión

  constructor(
    private authService: AuthService,
    private alertController: AlertController // Inyecta AlertController
  ) {}

  ngOnInit() {
    this.filterAppPages();
    this.loadAccessibilitySettings(); // Cargar ajustes de accesibilidad al iniciar
    this.authService.getAuthState().subscribe(user => {
      if (user) {
        this.isLoggedIn = true; // El usuario está logueado
        this.userName = user.displayName || 'Usuario'; // Obtener el nombre del usuario
      } else {
        this.isLoggedIn = false; // El usuario no está logueado
      }
    });
  }

  filterAppPages() {
    this.authService.getAuthState().subscribe(user => {
      if (user) {
        this.authService.getUserRole(user.uid).then(role => {
          if (role === 'admin') {
            this.filteredAppPages = this.appPages;
          } else {
            this.filteredAppPages = this.appPages.filter(page => page.title !== 'Administracion');
          }
        });
      } else {
        this.filteredAppPages = this.appPages.filter(page => page.title !== 'Administracion');
      }
    });
  }

  async logout() {
    await this.authService.logout();  // Cierra sesión
    this.showLogoutAlert();           // Muestra la alerta
  }

  // Método para cargar ajustes de accesibilidad desde localStorage
  loadAccessibilitySettings() {
    const textoGrande = localStorage.getItem('textoGrande') === 'true';

    if (textoGrande) {
      document.body.classList.add('texto-grande');
    }
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
}
