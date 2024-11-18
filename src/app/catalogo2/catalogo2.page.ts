import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { ClProducto } from '../producto/model/ClProducto';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-catalogo2',
  templateUrl: './catalogo2.page.html',
  styleUrls: ['./catalogo2.page.scss'],
})
export class Catalogo2Page implements OnInit {
  libros!: Observable<ClProducto[]>;
  carritoItems!: Observable<ClProducto[]>; 
  itemsEnCarrito: number = 0; // Nueva propiedad para contar los artículos en el carrito

  constructor(
    private dataService: DataService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.libros = this.dataService.getItems().pipe(
      map(actions => actions
        .map(a => {
          const data = a.payload.doc.data() as ClProducto;
          const id = a.payload.doc.id;
          return new ClProducto({ ...data, id });
        })
        .filter(libro => libro.cantidad > 0) // Solo se muestran libros disponibles
      )
    );

    // Inicializa carritoItems y actualiza itemsEnCarrito
    this.carritoItems = this.dataService.getCartItems();
    this.carritoItems.subscribe(items => {
      this.itemsEnCarrito = items.length; // Contar artículos en el carrito
    });
  }

  // Método para navegar a la página de login
  goToLogin() {
    this.navCtrl.navigateRoot('/login/login');
  }

  // Método para ir al carrito
  async goToCart() {
    const user = await this.afAuth.currentUser;

    if (!user) {
      const alert = await this.alertController.create({
        header: 'Acción no permitida',
        message: 'Por favor, inicie sesión para acceder al carrito.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      // Si el usuario está autenticado, navega al carrito
      this.navCtrl.navigateForward('/carrito2/carrito2');
    }
  }

  // Método para mostrar un mensaje de éxito
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  // Método para agregar un libro al carrito
  async agregarAlCarrito(libro: ClProducto) {
    const user = await this.afAuth.currentUser;

    if (!user) {
      const alert = await this.alertController.create({
        header: 'Acción no permitida',
        message: 'Para agregar libros al carrito, necesita iniciar sesión.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    await this.dataService.addToCart(libro);
    this.itemsEnCarrito++; // Incrementar el contador manualmente
  }
}
