import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-code-verifi',
  templateUrl: './code-verifi.page.html',
  styleUrls: ['./code-verifi.page.scss'],
})
export class CodeVerifiPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goTonuevacontrasena() {
    this.navCtrl.navigateForward('/nueva-contrasena')
  }

}
