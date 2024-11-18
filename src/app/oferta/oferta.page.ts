import { Component } from '@angular/core';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage {
  // Define la propiedad 'ofertas' como un array de objetos con una propiedad 'imagenUrl'.
  ofertas = [
    { imagenUrl: 'https://statics.cdn1.buscalibre.com/portada-minibanner-cl-dias-zigzagspet-mini7-png' },
    { imagenUrl: 'https://statics.cdn1.buscalibre.com/portada-minibanner-cl-dias-zigzagspet-mini6-png' }
    // Agrega más objetos según sea necesario.
  ];

  constructor() {}
}