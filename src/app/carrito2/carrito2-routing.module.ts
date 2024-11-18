import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Carrito2Page } from './carrito2.page';

const routes: Routes = [
  {
    path: 'carrito2',
    component: Carrito2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Carrito2PageRoutingModule {}
