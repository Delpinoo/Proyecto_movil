import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-alumno',
  templateUrl: './lista-alumno.page.html',
  styleUrls: ['./lista-alumno.page.scss'],
})
export class ListaAlumnoPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  goTolista_alumno() {
    this.navCtrl.navigateForward('/lista-alumno')
  }

  ngOnInit() {
  }

}
