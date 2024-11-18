import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarsucursalPage } from './editarsucursal.page';

const routes: Routes = [
  {
    path: 'editarsucursales',
    component: EditarsucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarsucursalPageRoutingModule {}
