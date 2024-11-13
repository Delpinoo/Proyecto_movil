import { Component, OnInit } from '@angular/core';
import { ItemList } from 'src/app/interfaces/itemlist';


@Component({
  selector: 'app-asignatura-qr',
  templateUrl: './asignatura-qr.page.html',
  styleUrls: ['./asignatura-qr.page.scss'],
})
export class AsignaturaQrPage implements OnInit {

  vinculos: ItemList[] = [
    { ruta: '/qr', titulo: 'Inglés', id: 'INU201', icono: 'walk-outline' },
    { ruta: '/qr', titulo: 'Matemáticas', id: 'MATH101', icono: 'school-outline' },
    { ruta: '/qr', titulo: 'Programación', id: 'PGY301', icono: 'laptop-outline' },
    { ruta: '/qr', titulo: 'Base de Datos', id: 'BDD401', icono: 'server-outline' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
