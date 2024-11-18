import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarclientePageRoutingModule } from './editarcliente-routing.module';

import { EditarclientePage } from './editarcliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarclientePageRoutingModule
  ],
  declarations: [EditarclientePage]
})
export class EditarclientePageModule {}
