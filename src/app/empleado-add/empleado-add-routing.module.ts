import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoAddPage } from './empleado-add.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoAddPageRoutingModule {}
