import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Carrito2PageRoutingModule } from './carrito2-routing.module';

import { Carrito2Page } from './carrito2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Carrito2PageRoutingModule
  ],
  declarations: [Carrito2Page]
})
export class Carrito2PageModule {}
