import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular'; // Agrega ModalController
import { Router } from '@angular/router';
import { EmpleadoServiceService } from '../empleado-add/empleado-service.service';
import { ClEmpleado } from '../empleado-add/model/ClEmpleado';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageModalComponent } from './image-modal/image-modal.component';

@Component({
  selector: 'app-empleado-add',
  templateUrl: './empleado-add.page.html',
  styleUrls: ['./empleado-add.page.scss'],
})
export class EmpleadoAddPage implements OnInit {
  empleadoForm!: FormGroup;
  empleado: ClEmpleado = {
    nombre: '',
    sucursal: '',
    supervisor: '',
    cargo: '',
    sueldo: 0,
    imagen: '',
  };
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null; // Propiedad para la vista previa de la imagen

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private restApi: EmpleadoServiceService,
    private storage: AngularFireStorage,
    private router: Router,
    private modalCtrl: ModalController // ModalController para manejar el modal
  ) { }

  ngOnInit() {
    this.empleadoForm = this.formBuilder.group({
      emp_nombre: [null, Validators.required],
      emp_sucursal: [null, Validators.required],
      emp_supervisor: [null, Validators.required],
      emp_cargo: [null, Validators.required],
      emp_sueldo: [null, Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("Archivo seleccionado:", this.selectedFile); // Verifica si se selecciona un archivo

    // Crear una URL de vista previa de la imagen
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl = e.target?.result as string; // Almacena la URL de la vista previa
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async openImageModal() {
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent, // Usa el componente para la imagen ampliada
      componentProps: {
        imageUrl: this.imagePreviewUrl // Pasa la URL de la imagen al modal
      }
    });
    return await modal.present();
  }

  async onFormSubmit() {
    if (this.empleadoForm.invalid) {
      return; // No continuar si el formulario es inválido
    }

    this.empleado.nombre = this.empleadoForm.value.emp_nombre;
    this.empleado.sucursal = this.empleadoForm.value.emp_sucursal;
    this.empleado.supervisor = this.empleadoForm.value.emp_supervisor;
    this.empleado.cargo = this.empleadoForm.value.emp_cargo;
    this.empleado.sueldo = this.empleadoForm.value.emp_sueldo;

    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    // Aquí puedes subir la imagen a Firebase Storage y obtener la URL
    if (this.selectedFile) {
      const filePath = `empleados/${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      await fileRef.put(this.selectedFile);
      const downloadURL = await fileRef.getDownloadURL().toPromise();
      this.empleado.imagen = downloadURL; // Guarda la URL de la imagen en el objeto empleado
    }

    this.restApi.addEmpleado(this.empleado).subscribe({
      next: async (res) => {
        console.log("Empleado agregado con éxito", res);
        loading.dismiss();

        // Limpiar el formulario
        this.empleadoForm.reset();
        this.imagePreviewUrl = null; // Limpiar la vista previa

        // Mostrar mensaje de éxito
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'El empleado ha sido agregado exitosamente.',
          buttons: ['OK']
        });
        await alert.present();
      },
      error: (err) => {
        console.error("Error al agregar empleado", err);
        loading.dismiss();
      }
    });
  }
}
