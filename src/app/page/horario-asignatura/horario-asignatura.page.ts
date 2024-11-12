import { Component, OnInit } from '@angular/core';
import { ItemList } from 'src/app/interfaces/itemlist';

@Component({
  selector: 'app-horario-asignatura',
  templateUrl: './horario-asignatura.page.html',
  styleUrls: ['./horario-asignatura.page.scss'],
})
export class HorarioAsignaturaPage implements OnInit {


  vinculos:ItemList[]=[{
    ruta:'/lista-docente',
    titulo:'2024-01-02',
    icono:''
  },
    {
      ruta:'/lista-docente',
      titulo:'2024-01-03',
      icono:''

  },
  {
    ruta:'/lista-docente',
    titulo:'2024-01-04',
    icono:''

},

  ];
  constructor() { }

  ngOnInit() {
  }

}
