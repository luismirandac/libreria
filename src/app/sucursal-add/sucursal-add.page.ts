import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SucursalServiceService } from '../sucursal-add/sucursal-service.service';
import { ClSucursal } from '../sucursal-add/model/ClSucursal';

@Component({
  selector: 'app-sucursal-add',
  templateUrl: './sucursal-add.page.html',
  styleUrls: ['./sucursal-add.page.scss'],
})
export class SucursalAddPage implements OnInit {
  sucursalForm!: FormGroup;
  sucursal: ClSucursal = {
    nombre: '',
    direccion: '',
    encargado: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private restApi: SucursalServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sucursalForm = this.formBuilder.group({
      "suc_name": [null, Validators.required],
      'suc_direc': [null, Validators.required],
      'suc_encargado': [null, Validators.required],
    });
  }

  async onFormSubmit() {
    if (this.sucursalForm.invalid) {
      return; // No continuar si el formulario es inválido
    }

    this.sucursal.nombre = this.sucursalForm.value.suc_name;
    this.sucursal.direccion = this.sucursalForm.value.suc_direc;
    this.sucursal.encargado = this.sucursalForm.value.suc_encargado;

    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.restApi.addSucursal(this.sucursal).subscribe({
      next: async (res) => {
        console.log("Producto agregado con éxito", res);
        loading.dismiss();

        // Limpiar el formulario
        this.sucursalForm.reset();

        // Mostrar mensaje de éxito
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'El sucursal ha sido agregado exitosamente.',
          buttons: ['OK']
        });
        await alert.present();
      },
      error: (err) => {
        console.error("Error al agregar sucursal", err);
        loading.dismiss();
      }
    });
  }
}
