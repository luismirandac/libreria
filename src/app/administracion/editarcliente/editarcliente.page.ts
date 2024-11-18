import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/productos.service';

@Component({
  selector: 'app-editarcliente',
  templateUrl: './editarcliente.page.html',
  styleUrls: ['./editarcliente.page.scss'],
})
export class EditarclientePage implements OnInit {
  constructor(public xx:ProductosService) { }



  ngOnInit() {
    this.dameCliente()
  }
  dameCliente(){
    this.cliente = this.xx.getCliente[0]
  }
  cliente :any= null
  damePersona():any{
    // return ListarService.dame_persona()
    return[]
  }

  get dameRegistro():any{
    // return ListarService.dame_persona()
    // return[]
    return this.xx.dameCliente
  }

}
