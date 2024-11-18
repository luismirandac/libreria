import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ClProducto } from '../producto/model/ClProducto';
import { ClResena } from '../detalle-producto/model/ClResena'; 
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { AlertController } from '@ionic/angular'; 
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  libroId: string | null = null; 
  libro: ClProducto | null = null; 
  resenas: ClResena[] = [];
  nuevaResena: ClResena = new ClResena({ comentario: '', calificacion: 0 });
  modalOpen: boolean = false;
  isAuthenticated: boolean = false;
  codigoQR: string | null = null;
  imageFlipped: boolean = false; // Estado para el giro de la imagen

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private afAuth: AngularFireAuth,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.libroId = this.route.snapshot.paramMap.get('id');
    
    this.afAuth.authState.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    if (this.libroId) {
      this.getLibroDetails(this.libroId);
      this.getReviews(this.libroId);
    } else {
      // Se eliminó el console.error
    }
  }

  getLibroDetails(id: string) {
    this.dataService.getLibroById(id).subscribe((data: any) => {
      this.libro = new ClProducto(data);
      this.generarCodigoQR();  // Generar QR cuando se cargan los detalles del libro
    }, error => {
      // Se eliminó el console.error
    });
  }

  getReviews(libroId: string) {
    this.dataService.getReviewsByLibroId(libroId).subscribe(
      (resenas: any[]) => {
        this.resenas = resenas.map(resenaData => new ClResena(resenaData));
        this.resenas.forEach(resena => resena.editando = false);
      },
      (error) => {
        // Se eliminó el console.error
      }
    );
  }

  abrirModal() {
    this.modalOpen = true;
  }

  cerrarModal() {
    this.modalOpen = false;
    this.nuevaResena = new ClResena({ comentario: '', calificacion: 0 });
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: 'Para dejar una reseña debes iniciar sesión.',
      buttons: ['OK']
    });

    await alert.present();
  }

  agregarResena() {
    if (!this.isAuthenticated) {
      this.mostrarAlerta();
      return;
    }

    if (this.libroId) {
      const libroIdStr: string = this.libroId;
      const nuevaResenaData = {
        comentario: this.nuevaResena.comentario,
        calificacion: this.nuevaResena.calificacion
      };

      this.dataService.addReview(libroIdStr, nuevaResenaData).subscribe(
        () => {
          this.cerrarModal();
          this.getReviews(libroIdStr);
        },
        (error) => {
          // Se eliminó el console.error
        }
      );
    } else {
      // Se eliminó el console.error
    }
  }

  editarResena(resena: ClResena) {
    resena.editando = true;
  }

  actualizarResena(resena: ClResena) {
    if (!resena.id) {
      // Se eliminó el console.error
      return;
    }

    const calificacion = resena.calificacion !== undefined ? resena.calificacion : 0;
    this.dataService.updateReview(this.libroId!, resena.id, { 
      comentario: resena.comentario, 
      calificacion: calificacion 
    }).subscribe(
      () => {
        resena.editando = false;
        this.getReviews(this.libroId!);
      },
      (error) => {
        // Se eliminó el console.error
      }
    );
  }

  async generarCodigoQR() {
    if (this.libro) {
      try {
        const url = `https://aplicacionmovil-210e0.web.app/detalle-producto/${this.libroId}`;
        this.codigoQR = await QRCode.toDataURL(url);
      } catch (error) {
        // Se eliminó el console.error
      }
    }
  }

  cancelarEdicion(resena: ClResena) {
    resena.editando = false;
    this.getReviews(this.libroId!);
  }

  borrarResena(id: string | undefined) {
    if (!id) {
      // Se eliminó el console.error
      return;
    }

    this.dataService.deleteReview(this.libroId!, id).subscribe(() => {
      this.getReviews(this.libroId!);
    }, (error) => {
      // Se eliminó el console.error
    });
  }

  promedioCalificacion(): number {
    if (this.resenas.length === 0) return 0;
    const total = this.resenas.reduce((sum, resena) => sum + resena.calificacion, 0);
    return total / this.resenas.length;
  }

  calificar(star: number) {
    this.nuevaResena.calificacion = star;
  }

  toggleImage() {
    this.imageFlipped = !this.imageFlipped;  // Cambia el estado de la imagen al hacer clic
    this.generarCodigoQR();  // Regenera el código QR cada vez que la imagen se gira
  }
}
