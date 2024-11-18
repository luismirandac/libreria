import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  showId = false;
  searchTerm: string = '';
  filteredProductos: any[] = [];
  productos: any[] = [];
  selectedProduct: any | null = null;

  constructor(private dataService: DataService, private alertController: AlertController, private loadingController: LoadingController) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.dataService.getItems().subscribe(data => {
      this.productos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      });
    });
  }

  searchProductos() {
    if (this.searchTerm.trim() === '') {
      this.filteredProductos = [];
      return;
    }

    this.filteredProductos = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectProduct(producto: any) {
    this.selectedProduct = producto;
    this.filteredProductos = [];
  }

  async saveProduct() {
    const loading = await this.loadingController.create({
      message: 'Guardando cambios...',
      spinner: 'circles'
    });
    await loading.present();

    if (this.selectedProduct) {
      this.dataService.updateItem(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
        loading.dismiss();
        this.presentAlert('Producto modificado con éxito');
        this.clearFields();
      }, async error => {
        loading.dismiss();
        this.presentAlert('Error al modificar el producto');
      });
    }
  }

  async deleteProduct() {
    const loading = await this.loadingController.create({
      message: 'Eliminando producto...',
      spinner: 'circles'
    });
    await loading.present();

    if (this.selectedProduct) {
      this.dataService.deleteItem(this.selectedProduct.id).subscribe(() => {
        loading.dismiss();
        this.presentAlert('Producto eliminado con éxito');
        this.clearFields();
        this.loadProductos();
      }, async error => {
        loading.dismiss();
        this.presentAlert('Error al eliminar el producto');
      });
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  clearFields() {
    this.selectedProduct = null;
    this.searchTerm = '';
    this.filteredProductos = [];
  }

  toggleShowId() {
    this.showId = !this.showId;
  }
}
