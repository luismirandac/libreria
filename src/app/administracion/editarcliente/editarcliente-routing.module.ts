import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarclientePage } from './editarcliente.page';

const routes: Routes = [
  {
    path: 'editarclientes',
    component: EditarclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarclientePageRoutingModule {}
