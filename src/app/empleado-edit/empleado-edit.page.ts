import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-empleado-edit',
  templateUrl: './empleado-edit.page.html',
  styleUrls: ['./empleado-edit.page.scss'],
})
export class EmpleadoEditPage implements OnInit {
  searchTerm: string = '';
  filteredEmpleados: any[] = [];
  empleados: any[] = [];
  selectedEmpleado: any | null = null;
  showId = false;

  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadEmpleados();
  }

  loadEmpleados() {
    this.dataService.getEmpleados().subscribe(data => {
      this.empleados = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      });
    });
  }

  searchEmpleados() {
    if (this.searchTerm.trim() === '') {
      this.filteredEmpleados = [];
      return;
    }

    this.filteredEmpleados = this.empleados.filter(empleado =>
      empleado.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectEmpleado(empleado: any) {
    this.selectedEmpleado = empleado;
    this.filteredEmpleados = [];
    console.log('Empleado seleccionado:', this.selectedEmpleado);
  }

  async saveEmpleado() {
    const loading = await this.loadingController.create({
      message: 'Guardando cambios...',
      spinner: 'circles'
    });
    await loading.present();

    if (this.selectedEmpleado) {
      this.dataService.updateEmpleado(this.selectedEmpleado.id, this.selectedEmpleado).subscribe(() => {
        loading.dismiss();
        this.presentAlert('Empleado modificado con éxito');
        this.clearFields();
      }, async error => {
        loading.dismiss();
        this.presentAlert('Error al modificar el empleado');
      });
    }
  }

  async deleteEmpleado() {
    const loading = await this.loadingController.create({
      message: 'Eliminando empleado...',
      spinner: 'circles'
    });
    await loading.present();

    if (this.selectedEmpleado) {
      this.dataService.deleteEmpleado(this.selectedEmpleado.id).subscribe(() => {
        loading.dismiss();
        this.presentAlert('Empleado eliminado con éxito');
        this.clearFields();
        this.loadEmpleados();
      }, async error => {
        loading.dismiss();
        this.presentAlert('Error al eliminar el empleado');
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
    this.selectedEmpleado = null;
    this.searchTerm = '';
    this.filteredEmpleados = [];
  }

  toggleShowId() {
    this.showId = !this.showId;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedEmpleado.imagen = e.target.result; // Asigna la imagen seleccionada a la propiedad del empleado
      };
      reader.readAsDataURL(file); // Convierte la imagen a base64
    }
  }
}
