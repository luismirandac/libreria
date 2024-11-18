import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SucursalEditPageRoutingModule } from './sucursal-edit-routing.module';

import { SucursalEditPage } from './sucursal-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SucursalEditPageRoutingModule
  ],
  declarations: [SucursalEditPage]
})
export class SucursalEditPageModule {}
