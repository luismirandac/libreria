import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { Catalogo2PageRoutingModule } from './catalogo2-routing.module';

import { Catalogo2Page } from './catalogo2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Catalogo2PageRoutingModule
  ],
  declarations: [Catalogo2Page]
})
export class Catalogo2PageModule {}
