import { Component, OnInit } from '@angular/core';
import { ItemList } from 'src/app/interfaces/itemlist';

@Component({
  selector: 'app-asignatura-qr',
  templateUrl: './asignatura-qr.page.html',
  styleUrls: ['./asignatura-qr.page.scss'],
})
export class AsignaturaQrPage implements OnInit {

  vinculos: ItemList[] = [
    {
      ruta: '/qr',
      titulo: 'Inglés',
      icono: 'walk-outline'
    },
    {
      ruta: '/qr',
      titulo: 'Matemáticas',
      icono: 'school-outline'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
