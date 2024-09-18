import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaAlumoPageRoutingModule } from './lista-alumo-routing.module';
import { ListaAlumoPage } from './lista-alumo.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAlumoPageRoutingModule,
    SharedModule
  ],
  declarations: [ListaAlumoPage]
})
export class ListaAlumoPageModule {}
