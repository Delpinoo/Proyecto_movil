import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; // Importar para usar serverTimestamp // Asegúrate de instalar qrcode
import QRCode from 'qrcode';
@Component({
  selector: 'app-qr-genrated',
  templateUrl: './qr-genrated.page.html',
  styleUrls: ['./qr-genrated.page.scss'],
})
export class QrGenratedPage implements OnInit {
  hola: string = 'lol';
  intervalId: any;
  ramo: string = '';
  qrCode: string = ''; // Variable para guardar el QR generado

  constructor(private navCtrl: NavController, private http: HttpClient, private route: ActivatedRoute, private router: Router, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ramo = params['ramo'];
      this.hola = `QR para ${this.ramo}`;

      // Aquí generamos el código QR para el alumno
      this.generateQRCode(this.ramo, '12345');  // Asegúrate de reemplazar '12345' por el studentId real
    });
  }

  generateQRCode(ramo: string, studentId: string) {
    // Generamos el código QR que contiene ramo y studentId en el formato adecuado
    const qrData = `${ramo}-${studentId}`;
    console.log("Datos QR generados:", qrData);
    QRCode.toDataURL(qrData, (err: Error | null, url: string) => {  // Especificamos el tipo de 'url' como string
      if (err) {
        console.error('Error generando QR:', err);
      } else {
        this.qrCode = url;  // Guardamos la URL de la imagen QR
      }
    });
  }

  scanQrCode(ramo: string, studentId: string) {
    // Crear un nuevo documento en la colección 'asistencia' con 'date' como null
    this.firestore.collection('asistencia').add({
      ramo: ramo,
      studentId: studentId,
      date: null // Inicialmente lo dejas en null
    }).then((docRef) => {
      console.log('Documento creado, ID:', docRef.id);

      // Después de crear el documento, puedes actualizar el campo 'date'
      this.updateDate(docRef.id); // Llama a la función para actualizar la fecha
    }).catch((error) => {
      console.error('Error al registrar la asistencia:', error);
    });
  }

  updateDate(docId: string) {
    // Actualizar el campo 'date' con la fecha y hora actual
    this.firestore.collection('asistencia').doc(docId).update({
      date: firebase.firestore.FieldValue.serverTimestamp() // Usamos el timestamp de servidor de Firebase
    }).then(() => {
      console.log('Fecha de asistencia actualizada correctamente');
    }).catch((error) => {
      console.error('Error al actualizar la fecha:', error);
    });
  }

  goTolista_docente() {
    this.navCtrl.navigateForward('/lista-docente');
  }
}
