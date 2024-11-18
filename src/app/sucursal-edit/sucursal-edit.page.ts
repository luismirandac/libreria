import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sucursal-edit',
  templateUrl: './sucursal-edit.page.html',
  styleUrls: ['./sucursal-edit.page.scss'],
})
export class SucursalEditPage implements OnInit {
  searchTerm: string = '';
  filteredSucursales: any[] = [];
  sucursales: any[] = [];
  selectedSucursal: any | null = null;
  showId = false;

  constructor(private dataService: DataService, private alertController: AlertController, private loadingController: LoadingController) {}

  ngOnInit() {
    this.loadSucursales();
  }

  loadSucursales() {
    this.dataService.getSucursales().subscribe(data => {
      this.sucursales = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      });
    });
  }

  searchSucursales() {
    if (this.searchTerm.trim() === '') {
      this.filteredSucursales = [];
      return;
    }

    this.filteredSucursales = this.sucursales.filter(sucursal =>
      sucursal.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectSucursal(sucursal: any) {
    this.selectedSucursal = sucursal;
    this.filteredSucursales = [];
  }

  async saveSucursal() {
    const loading = await this.loadingController.create({
      message: 'Guardando cambios...',
      spinner: 'circles'
    });
    await loading.present();

    if (this.selectedSucursal) {
      this.dataService.updateSucursal(this.selectedSucursal.id, this.selectedSucursal).subscribe(() => {
        loading.dismiss();
        this.presentAlert('Sucursal modificada con éxito');
        this.clearFields();
      }, async error => {
        loading.dismiss();
        this.presentAlert('Error al modificar la sucursal');
      });
    }
  }

  async deleteSucursal() {
    const loading = await this.loadingController.create({
      message: 'Eliminando sucursal...',
      spinner: 'circles'
    });
    await loading.present();

    if (this.selectedSucursal) {
      this.dataService.deleteSucursal(this.selectedSucursal.id).subscribe(() => {
        loading.dismiss();
        this.presentAlert('Sucursal eliminada con éxito');
        this.clearFields();
        this.loadSucursales();
      }, async error => {
        loading.dismiss();
        this.presentAlert('Error al eliminar la sucursal');
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
    this.selectedSucursal = null;
    this.searchTerm = '';
    this.filteredSucursales = [];
  }

  toggleShowId() {
    this.showId = !this.showId;
  }
}
