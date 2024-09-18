import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-alumo',
  templateUrl: './lista-alumo.page.html',
  styleUrls: ['./lista-alumo.page.scss'],
})
export class ListaAlumoPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

}
