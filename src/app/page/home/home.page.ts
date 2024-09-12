import { Component } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listItems:MenuItem[]=[
    {
      ruta:'/login',
      icono: 'briefcase-outline',
      etiqueta: 'Docente'
    },
    {
      ruta:'/alumno',
      icono: 'school-outline',
      etiqueta: 'Alumno'
    }
  ]

  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back();
  }

  goTodocente() {
    this.navCtrl.navigateForward('/docente')
  }
  goToalumno() {
    this.navCtrl.navigateForward('/alumno')
  }
}