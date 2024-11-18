import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SucursalEditPage } from './sucursal-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SucursalEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SucursalEditPageRoutingModule {}
