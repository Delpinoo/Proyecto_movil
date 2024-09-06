import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EncabezadoComponent } from './encabezado/encabezado.component';

@NgModule({
    imports: [
    CommonModule,
    IonicModule
    ],
  declarations: [EncabezadoComponent], // Aquí puedes declarar tus componentes
  exports: [EncabezadoComponent] // Aquí puedes exportar tus componentes
})
export class ComponentsModule { }