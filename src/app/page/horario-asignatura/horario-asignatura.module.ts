import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HorarioAsignaturaPageRoutingModule } from './horario-asignatura-routing.module';
import { HorarioAsignaturaPage } from './horario-asignatura.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioAsignaturaPageRoutingModule,
    SharedModule
  ],
  declarations: [HorarioAsignaturaPage]
})
export class HorarioAsignaturaPageModule {}
