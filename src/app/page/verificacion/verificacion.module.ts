import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { VerificacionPageRoutingModule } from './verificacion-routing.module';

import { VerificacionPage } from './verificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificacionPageRoutingModule,
    SharedModule
  ],
  declarations: [VerificacionPage]
})
export class VerificacionPageModule {}