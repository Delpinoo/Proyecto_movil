import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Asegúrate de que Timestamp esté importado
import { UserService } from 'src/app/user.service';  // Importa el servicio UserService
import { User } from 'src/app/shared/models/user.model';  // Modelo User
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  studentName: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private userService: UserService  // Inyectamos el UserService
  ) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  goToVerification() {
    this.navCtrl.navigateForward('/verificacion');
  }

  goToRamos() {
    this.navCtrl.navigateForward('/ramos');
  }

  goToListaAlumno() {
    this.navCtrl.navigateForward('/lista-alumno');
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
  
    const { barcodes } = await BarcodeScanner.scan();
    console.log('Datos escaneados:', barcodes);  // Verifica los datos escaneados
  
    const barcodeData = barcodes[0]?.rawValue?.trim();  // Eliminar espacios extra
    console.log("QR data:", barcodeData);  // Verifica lo que contiene el QR
  
    if (barcodeData) {
      const parts = barcodeData.split('-');  // Divide la cadena usando el guion como separador
      console.log('Parts:', parts);
  
      if (parts.length === 2) {
        const ramo = parts[0];
        const studentId = parts[1];
        console.log('Ramo:', ramo, 'StudentId:', studentId);
  
        // Guardar la información en Firebase
        if (ramo && studentId) {
          try {
            await this.firestore.collection('asistencia').add({
              ramo: ramo,
              studentId: studentId,
              date: Timestamp.now(),  // Usar Timestamp en lugar de new Date()
            });
  
            console.log('Asistencia registrada correctamente');
            await this.presentSuccessAlert();  // Mostrar alerta de éxito
  
          } catch (error) {
            console.error('Error al registrar la asistencia:', error);
            await this.presentErrorAlert('Hubo un problema al registrar la asistencia');
          }
        } else {
          console.log('Error: El QR no contiene ramo o studentId válidos');
          await this.presentErrorAlert('El QR escaneado no tiene el formato esperado');
        }
      } else {
        console.log('Error: El QR no tiene el formato esperado');
        await this.presentErrorAlert('El QR escaneado no tiene el formato esperado');
      }
    } else {
      console.log('Error: No se encontró ningún dato en el QR');
      await this.presentErrorAlert('No se encontró ningún dato en el QR');
    }
  }

  async presentAlertasistencia(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Asistencia registrada',
      message: 'Tu asistencia ha sido registrada correctamente.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(header: string = 'Permiso denegado', message: string = 'Para usar la aplicación autorizar los permisos de cámara'): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    })
    await alert.present();
  }

  async presentSuccessAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Asistencia registrada',
      message: 'La asistencia del estudiante ha sido registrada con éxito.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
