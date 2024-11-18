import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarsucursalPageRoutingModule } from './editarsucursal-routing.module';

import { EditarsucursalPage } from './editarsucursal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarsucursalPageRoutingModule
  ],
  declarations: [EditarsucursalPage]
})
export class EditarsucursalPageModule {}
