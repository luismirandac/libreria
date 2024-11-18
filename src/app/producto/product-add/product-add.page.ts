import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { ClProducto } from '../model/ClProducto';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ImageModalComponent } from '../../empleado-add/image-modal/image-modal.component'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {
  productForm!: FormGroup;
  producto: ClProducto = {
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: 0,
    fecha: new Date(),
    cantidad: 0,
    imagen: ''
  };
  selectedFile: File | null = null; // Guardar el archivo seleccionado
  uploadPercent: any; // Progreso de subida
  downloadURL: any; // URL descargada de Firebase
  imagePreviewUrl: string | ArrayBuffer | null = null; // URL de vista previa de la imagen

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private restApi: ProductServiceService,
    private router: Router,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private modalController: ModalController // Inyectar ModalController
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_cate': [null, Validators.required],
      'prod_price': [null, Validators.required],
      'prod_cantidad': [null, Validators.required],
      'prod_image_url': [null]
    });
  }

  // Manejar el archivo seleccionado
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Crear una URL de vista previa
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl = reader.result; // Almacenar la URL de vista previa
      };
      reader.readAsDataURL(file);
    }
  }

  async onFormSubmit() {
    // Verificar si el usuario está autenticado
    const user = await this.afAuth.currentUser;

    if (!user) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes estar logueado para subir una imagen.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.productForm.invalid) {
      return;
    }

    this.producto.nombre = this.productForm.value.prod_name;
    this.producto.descripcion = this.productForm.value.prod_desc;
    this.producto.categoria = this.productForm.value.prod_cate;
    this.producto.precio = this.productForm.value.prod_price;
    this.producto.cantidad = this.productForm.value.prod_cantidad;

    const imageUrl = this.productForm.value.prod_image_url;

    if (imageUrl) {
      // Si se proporciona una URL, la usamos directamente
      this.producto.imagen = imageUrl;
      this.guardarProducto();
    } else if (this.selectedFile) {
      // Si se seleccionó un archivo, lo subimos a Firebase Storage
      const filePath = `libros/${new Date().getTime()}_${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);

      // Observar el progreso
      this.uploadPercent = task.percentageChanges();

      // Esperar a que se suba el archivo y obtener el URL
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.producto.imagen = url;
            this.guardarProducto(); // Guardar el producto una vez que tengamos el URL
          });
        })
      ).subscribe();
    }
  }

  async guardarProducto() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.restApi.addProduct(this.producto).subscribe({
      next: async (res) => {
        loading.dismiss();
        this.productForm.reset();
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'El producto ha sido agregado exitosamente.',
          buttons: ['OK']
        });
        await alert.present();
      },
      error: (err) => {
        console.error("Error al agregar producto", err);
        loading.dismiss();
      }
    });
  }

  // Abrir modal para ver la imagen completa
  async openImageModal() {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        imageUrl: this.imagePreviewUrl // Pasar la URL de la imagen al modal
      }
    });
    return await modal.present();
  }
}
