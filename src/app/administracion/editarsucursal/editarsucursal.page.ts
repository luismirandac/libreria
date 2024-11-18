import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/productos.service';

@Component({
  selector: 'app-editarsucursal',
  templateUrl: './editarsucursal.page.html',
  styleUrls: ['./editarsucursal.page.scss'],
})
export class EditarsucursalPage implements OnInit {
  constructor(public xx:ProductosService) { }


  ngOnInit() {
    this.dameSucursal()
  }
  dameVenta(){
    this.sucursal = this.xx.getSucursal[0]
  }
  sucursal :any= this.dameSucursal
  dameSucursal():any{
    // return ListarService.dame_persona()
    return[]
  }

  get dameRegistro():any{
    // return ListarService.dame_persona()
    // return[]
    return this.xx.dameSucursal
  }


}
