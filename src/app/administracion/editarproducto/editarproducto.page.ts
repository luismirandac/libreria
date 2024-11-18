import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editarproducto',
  templateUrl: './editarproducto.page.html',
  styleUrls: ['./editarproducto.page.scss'],
})
export class EditarproductoPage implements OnInit {
 

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }


}
