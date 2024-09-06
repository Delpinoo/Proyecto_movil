import { Component } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listItems:MenuItem[]=[
    {
      ruta:'/docente',
      icono: 'briefcase-outline',
      etiqueta: 'Docente'
    },
    {
      ruta:'/alumno',
      icono: 'school-outline',
      etiqueta: 'Alumno'
    }
  ]

  constructor() {}
}