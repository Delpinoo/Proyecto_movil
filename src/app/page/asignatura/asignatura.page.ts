import { Component, OnInit } from '@angular/core';
import { ItemList } from 'src/app/interfaces/itemlist';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {

  vinculos: ItemList[] = [
    {
      ruta: '/horario-asignatura',
      titulo: 'Inglés',
      icono: 'walk-outline'
    },
    {
      ruta: '/horario-asignatura',
      titulo: 'Matemáticas',
      icono: 'school-outline'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
