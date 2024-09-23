import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lista-docente',
  templateUrl: './lista-docente.page.html',
  styleUrls: ['./lista-docente.page.scss'],
})
export class ListaDocentePage implements OnInit {
  alertButtons = ['Aceptar'];

  constructor() { }

  ngOnInit() {
  }
}
