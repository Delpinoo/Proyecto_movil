import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qr-genrated',
  templateUrl: './qr-genrated.page.html',
  styleUrls: ['./qr-genrated.page.scss'],
})
export class QrGenratedPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  goTolista_docente(){
    this.navCtrl.navigateForward('/lista-docente')
  }

  ngOnInit() {
  }

}
