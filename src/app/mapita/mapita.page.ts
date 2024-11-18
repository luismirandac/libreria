import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-mapita',
  templateUrl: './mapita.page.html',
  styleUrls: ['./mapita.page.scss'],
})
export class MapitaPage implements OnInit {
  map: any;
  geocoder: any;

  constructor() {}

  ngOnInit() {
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    if (typeof google === 'undefined' || !google.maps) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAZjRmiU-OF4YiKIAOIEpi8_-KzEaAtj0M';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.loadMap();
      };
      document.body.appendChild(script);
    } else {
      this.loadMap();
    }
  }

  loadMap() {
    // Inicializa el geocoder
    this.geocoder = new google.maps.Geocoder();

    // Coordenadas del centro del mapa
    const mapOptions = {
      center: { lat: -34.397, lng: 150.644 }, // Cambia estas coordenadas si lo deseas
      zoom: 10,
    };

    // Referencia al div donde cargará el mapa
    const mapElement = document.getElementById('map');

    // Inicializar el mapa
    this.map = new google.maps.Map(mapElement, mapOptions);

    // Agregar marcadores con direcciones
    this.addMarkers([
      { address: 'Camilo Henriquez 1105 El Bosque', title: 'Ubicación 1' },
      { address: 'Huérfanos 670, Santiago, Región Metropolitana', title: 'Ubicación 2' },
      { address: 'Moneda 1073, 8320296 Santiago, Región Metropolitana', title: 'Ubicación 3' },
    ]);
  }

  addMarkers(locations: { address: string, title: string }[]) {
    locations.forEach(location => {
      this.geocodeAddress(location);
    });
  }

  geocodeAddress(location: { address: string, title: string }) {
    this.geocoder.geocode({ address: location.address }, (results: { geometry: { location: any; }; }[], status: string) => {
      if (status === 'OK') {
        new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location,
          title: location.title,
        });
        this.map.setCenter(results[0].geometry.location); // Opcional: centrar el mapa en el primer marcador
      } else {
        console.error('Geocode no tuvo éxito por la siguiente razón: ' + status);
      }
    });
  }
}
