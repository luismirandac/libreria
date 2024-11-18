import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-accesibilidad-modal',
  templateUrl: './accesibilidad-modal.component.html',
  styleUrls: ['./accesibilidad-modal.component.scss'],
})
export class AccesibilidadModalComponent {
  textoGrande: boolean = false;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  applyAccessibilitySettings() {
    localStorage.setItem('textoGrande', this.textoGrande.toString());

    // Aplica o quita la clase del body según el toggle
    document.body.classList.toggle('texto-grande', this.textoGrande);
    
    this.dismiss();
  }

  ngOnInit() {
    const textoGrande = localStorage.getItem('textoGrande') === 'true';
    this.textoGrande = textoGrande;
  }
}
