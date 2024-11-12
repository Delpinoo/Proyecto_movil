import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorarioAsignaturaPage } from './horario-asignatura.page';

const routes: Routes = [
  {
    path: '',
    component: HorarioAsignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioAsignaturaPageRoutingModule {}
