import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmpleadoAddPageRoutingModule } from './empleado-add-routing.module';
import { ImageModalComponent } from './image-modal/image-modal.component'; // Asegúrate de importar el componente modal
import { EmpleadoAddPage } from './empleado-add.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EmpleadoAddPageRoutingModule
  ],
  declarations: [
    EmpleadoAddPage,
    ImageModalComponent // Agrega el componente modal aquí
  ]
})
export class EmpleadoAddPageModule {}
