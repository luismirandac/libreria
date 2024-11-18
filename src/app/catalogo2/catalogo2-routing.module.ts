import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Catalogo2Page } from './catalogo2.page';

const routes: Routes = [
  {
    path: 'catalogo2',
    component: Catalogo2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Catalogo2PageRoutingModule {}
