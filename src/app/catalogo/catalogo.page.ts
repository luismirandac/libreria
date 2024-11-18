import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  lProductos = [
    { 
        id: "1-1", 
        nombre: "El Plagio", 
        editorial: "Pepitas de Calabaza", 
        anio: "2022",
        precio: "15151", 
        isEditing: true, 
        Image: "https://imagessl6.casadellibro.com/a/l/s5/06/9788417386306.webp" 
    },
    {
        id: "1-2", 
        nombre: "Las Cenizas de Ángela", 
        editorial: "Maeva", 
        anio: "2011", 
        precio: "43243",
        isEditing: true, 
        Image: "https://imagessl6.casadellibro.com/a/l/s5/76/9788492695676.webp"  
    },
    {
        id: "1-3", 
        nombre: "DIARIO DE ANNA FRANK", 
        editorial: "Debolsillo", 
        anio: "2021", 
        precio: "43243",
        isEditing: true, 
        Image: "https://imagessl5.casadellibro.com/a/l/s5/35/9788466359535.webp"  
      },
      {
        id: "1-4", 
        nombre: "Sangre Real", 
        editorial: "VRYA", 
        anio: "2024", 
        precio: "43243",
        isEditing: true, 
        Image: "https://images.cdn3.buscalibre.com/fit-in/360x360/17/b1/17b1a707f4370d7ed8d826eb3818f00d.jpg" 
      },
      {
        id: "1-5", 
        nombre: "Cronicas de la Mente", 
        editorial: "Editorial USACH", 
        anio: "2022", 
        precio: "43243",
        isEditing: true, 
        Image: "https://cdnx.jumpseller.com/tienda-editorial-usach/image/26958202/Cro_nicas_de_la_mente_-_Consuelo_Olguin_Aguilera.jpg?1662674922" 
      },
      {
        id: "1-6", 
        nombre: "Eso no Estaba en mi Libro de Historia de la Casa Real Española", 
        editorial: "Almuzara", 
        anio: "2022", 
        precio: "43243",
        isEditing: true, 
        Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIl4uZW6d_M0ZyEU1pP0OK2MQj0JdAMkx-2w&s" 
      },
      {
        id: "1-7", 
        nombre: "Esto no Está Pasando", 
        editorial: "Planeta", 
        anio: "2024", 
        precio: "43243",
        isEditing: true, 
        Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7dMMvZXmi2B5Ip16voDyMSK21Asy8NHY29Q&s" 
      },
      {
        id: "1-8", 
        nombre: "Isabel Allende", 
        editorial: "Debolsillo", 
        anio: "2006", 
        precio: "43243",
        isEditing: true, 
        Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJHpO8C22HkXwx1rlCOt6An6FZMCB1DOLfZA&s" 
      },
      {
        id: "1-9", 
        nombre: "Comentarios Reales", 
        editorial: "Ediciones Cátedra", 
        anio: "2001", 
        precio: "43243",
        isEditing: true, 
        Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ava1jOKEry-az4gxVQXfbiZDdvR5-II_1A&s" 
      },
      {
        id: "1-10", 
        nombre: "Al Servicio de su Majestad", 
        editorial: "Lectulandia", 
        anio: "2011", 
        precio: "43243",
        isEditing: true, 
        Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiEmio1d4A_8FTlkbElD8yvGqIG2igmthFwA&s" 
      }
];
  constructor(private navCtrl: NavController) {}
    ngOnInit(): void {
        //throw new Error('Method not implemented.');
    }
    goToLogin() {
      this.navCtrl.navigateRoot('/login/login');
    }

}

//lazy load carga perezosa cargar de a poco las pestañas. 