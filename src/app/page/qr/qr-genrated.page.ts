import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qr-genrated',
  templateUrl: './qr-genrated.page.html',
  styleUrls: ['./qr-genrated.page.scss'],
})
export class QrGenratedPage implements OnInit {
  hola: string = 'lol';
  intervalId: any;

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {

  }


  goTolista_docente() {
    this.navCtrl.navigateForward('/lista-docente');
  }
}