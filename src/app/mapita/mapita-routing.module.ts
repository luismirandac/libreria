import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapitaPage } from './mapita.page';

const routes: Routes = [
  {
    path: 'mapita',
    component: MapitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapitaPageRoutingModule {}
