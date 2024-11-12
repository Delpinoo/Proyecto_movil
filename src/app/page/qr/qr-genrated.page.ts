import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-qr-genrated',
  templateUrl: './qr-genrated.page.html',
  styleUrls: ['./qr-genrated.page.scss'],
})
export class QrGenratedPage implements OnInit {
  hola: string = 'lol';
  intervalId: any;
  ramo: string = '';

  constructor(private navCtrl: NavController, private http: HttpClient, private route: ActivatedRoute, private router: Router, private firestore: AngularFirestore) { }
  generateQr(ramo: string) {
    this.router.navigate([`/qr-generated/${ramo}`]);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ramo = params['ramo'];
      this.hola = `QR para ${this.ramo}`;
    });
  }
  scanQrCode(ramo: string, studentId: string) {
    // Agregar la asistencia a Firebase
    this.firestore.collection('asistencia').add({
      ramo: ramo,
      studentId: studentId,   // ID del estudiante que se obtiene del QR
      date: new Date()         // Fecha y hora en que se escanea el QR
    }).then(() => {
      console.log('Asistencia registrada con éxito');
    }).catch((error) => {
      console.error('Error al registrar la asistencia: ', error);
    });
  }


  goTolista_docente() {
    this.navCtrl.navigateForward('/lista-docente');
  }
}