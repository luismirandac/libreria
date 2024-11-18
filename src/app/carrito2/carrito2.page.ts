import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ClProducto } from '../producto/model/ClProducto';
import { LoadingController, AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-carrito2',
  templateUrl: './carrito2.page.html',
  styleUrls: ['./carrito2.page.scss'],
})
export class Carrito2Page implements OnInit {
  carritoItems!: Observable<ClProducto[]>; // Observable que almacena los productos en el carrito
  total = 0; // Variable para calcular el total de la compra
  isModalOpen = false; // Controla si el modal está abierto o cerrado

  // Variables para el formulario de compra
  nombrePersona: string = '';
  rutPersona: string = '';
  numeroTarjeta: string = '';
  sucursalEntrega: string = '';
  sucursales: any[] = []; // Lista de sucursales disponibles

  constructor(
    private dataService: DataService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  /**
   * ngOnInit se ejecuta cuando se inicializa el componente. 
   * Se obtienen los productos del carrito, se calcula el total y se cargan las sucursales disponibles.
   */
  ngOnInit() {
    this.carritoItems = this.dataService.getCartItems(); // Obtener los productos en el carrito
    this.calculateTotal(); // Calcular el total de la compra
    this.loadSucursales(); // Cargar las sucursales disponibles
  }

  /**
   * Calcula el total de la compra sumando el precio por la cantidad de cada producto en el carrito.
   */
  calculateTotal() {
    this.carritoItems.subscribe(items => {
      this.total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0); // Sumar el total
    });
  }

  /**
   * Carga las sucursales desde el servicio `dataService` y las asigna a la variable `sucursales`.
   */
  loadSucursales() {
    this.dataService.getSucursales().subscribe(snapshot => {
      this.sucursales = snapshot.map(snap => {
        const data = snap.payload.doc.data() as { nombre: string }; // Obtener los datos de cada sucursal
        const id = snap.payload.doc.id; // Obtener el id de la sucursal
        return { id, ...data }; // Retorna el id y el nombre de la sucursal
      });
    });
  }

  /**
   * Muestra un indicador de carga mientras se realiza el proceso de compra.
   * @returns El objeto de carga que se muestra en pantalla.
   */
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Realizando compra...', // Mensaje que se muestra en el indicador de carga
      duration: 250 // Duración del indicador de carga
    });
    await loading.present(); // Presenta el indicador de carga
    return loading; // Retorna el objeto de carga
  }

  /**
   * Muestra una alerta con un mensaje específico.
   * @param message El mensaje que se mostrará en la alerta.
   */
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      message: message, // Mensaje de la alerta
      buttons: [{ text: 'OK', handler: () => location.reload() }] // Botón OK para recargar la página
    });
    await alert.present(); // Presenta la alerta
  }

  /**
   * Abre el modal para completar la compra.
   */
  openModal() {
    this.isModalOpen = true; // Abre el modal
  }

  /**
   * Cierra el modal para completar la compra.
   */
  closeModal() {
    this.isModalOpen = false; // Cierra el modal
  }

  /**
   * Procesa la compra de los productos en el carrito.
   * 1. Valida que todos los campos de la compra estén completos.
   * 2. Verifica que haya productos en el carrito.
   * 3. Realiza la compra y guarda los detalles de la transacción.
   * 4. Limpia el carrito después de la compra.
   */
  async comprar() {
    const loading = await this.presentLoading(); // Muestra el indicador de carga

    try {
      // Verificar si todos los campos de compra están llenos
      if (!this.nombrePersona || !this.rutPersona || !this.numeroTarjeta || !this.sucursalEntrega) {
        await loading.dismiss();
        await this.presentAlert('Por favor completa todos los datos de compra.');
        return; // Si faltan datos, se detiene la compra
      }

      // Obtener los productos en el carrito
      const items = await this.carritoItems.pipe(take(1)).toPromise();
      if (!items || items.length === 0) {
        await loading.dismiss();
        await this.presentAlert('No tienes productos en el carrito.');
        return; // Si el carrito está vacío, se detiene la compra
      }

      // Preparar los detalles de la compra
      const purchaseDetails = {
        items: items.map(item => ({ nombre: item.nombre, cantidad: item.cantidad, precio: item.precio })), // Productos de la compra
        total: this.total, // Total de la compra
        nombrePersona: this.nombrePersona, // Nombre de la persona
        rutPersona: this.rutPersona, // RUT de la persona
        numeroTarjeta: this.numeroTarjeta, // Número de tarjeta
        sucursalEntrega: this.sucursalEntrega // Sucursal de entrega
      };

      // Realizar la compra
      await this.dataService.buyItems(items).toPromise();
      await this.dataService.addPurchase(purchaseDetails); // Guardar la compra en la base de datos
      await this.presentAlert('Tu compra se ha realizado con éxito.');

      // Limpiar el carrito después de la compra
      await this.dataService.clearCart().toPromise();
      this.nombrePersona = '';
      this.rutPersona = '';
      this.numeroTarjeta = '';
      this.sucursalEntrega = '';
    } catch (error) {
      console.error('Error al realizar la compra', error);
      await this.presentAlert('Error al realizar la compra. Intenta nuevamente.');
    } finally {
      await loading.dismiss(); // Ocultar el indicador de carga
    }
  }
}
