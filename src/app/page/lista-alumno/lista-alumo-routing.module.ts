import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAlumoPage } from './lista-alumo.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAlumoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAlumoPageRoutingModule {}
