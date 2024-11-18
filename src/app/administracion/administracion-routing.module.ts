import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracionPage } from './administracion.page';

const routes: Routes = [
  {
    path: 'administracion',
    component: AdministracionPage
  },
  {
    path: 'editarproducto',
    loadChildren: () => import('./editarproducto/editarproducto.module').then( m => m.EditarproductoPageModule)
  },
  {
    path: 'editarcliente',
    loadChildren: () => import('./editarcliente/editarcliente.module').then( m => m.EditarclientePageModule)
  },
  {
    path: 'editarsucursal',
    loadChildren: () => import('./editarsucursal/editarsucursal.module').then( m => m.EditarsucursalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionPageRoutingModule {}
