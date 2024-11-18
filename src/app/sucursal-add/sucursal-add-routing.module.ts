import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SucursalAddPage } from './sucursal-add.page';

const routes: Routes = [
  {
    path: 'sucursal',
    component: SucursalAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SucursalAddPageRoutingModule {}
