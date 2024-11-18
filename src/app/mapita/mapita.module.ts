import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapitaPageRoutingModule } from './mapita-routing.module';

import { MapitaPage } from './mapita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapitaPageRoutingModule
  ],
  declarations: [MapitaPage]
})
export class MapitaPageModule {}
