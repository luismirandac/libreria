import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent {
  @Input() imageUrl: string | null = null; // Inicializa con null

  constructor(private modalCtrl: ModalController) {}

  dismissModal() {
    this.modalCtrl.dismiss(); // Cierra el modal
  }
}
