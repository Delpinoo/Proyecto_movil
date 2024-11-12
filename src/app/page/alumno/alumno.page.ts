import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private navCtrl: NavController, private alertController: AlertController, private firestore: AngularFirestore) { }
  
  goToverification() {
    this.navCtrl.navigateForward('/verificacion')
  }

  goToRamos() {
    this.navCtrl.navigateForward('/ramos')
  }

  goTolista_alumno() {
    this.navCtrl.navigateForward('/lista-alumno')
  }

  ngOnInit(){
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
  
    const { barcodes } = await BarcodeScanner.scan();
    const barcodeData = barcodes[0]?.rawValue; // Suponiendo que el QR contiene el ramo y el ID del estudiante
  
    if (barcodeData) {
      const [ramo, studentId] = barcodeData.split('-'); // Suponiendo que el QR está formado por ramo-id
      // Aquí guardas la información de la asistencia en Firebase
      await this.firestore.collection('asistencia').add({
        ramo: ramo,
        studentId: studentId,
        date: new Date().toISOString(),
      });
    }
    }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Para usar la aplicación autorizar los permisos de cámara',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
