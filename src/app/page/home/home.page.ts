import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../../user.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  correo: string = '';
  contrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private alertController: AlertController
  ) {}

  async login() {
    const isLoggedIn = this.userService.login(this.correo, this.contrasena);
    
    if (isLoggedIn) {
      // Verifica el dominio del correo y navega a la página correspondiente
      if (this.correo.endsWith('@profesor.duoc.cl')) {
        this.navCtrl.navigateForward('docente'); // Cambia esta ruta a la página correspondiente para docentes
      } else if (this.correo.endsWith('@duocuc.cl')) {
        this.navCtrl.navigateForward('/alumno'); // Cambia esta ruta a la página correspondiente para alumnos
      } else {
        // Manejar el caso en que el correo no sea válido
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Dominio de correo no permitido.',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Credenciales incorrectas.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }

  goTodocente() {
    this.navCtrl.navigateForward('/docente');
  }

  goToalumno() {
    this.navCtrl.navigateForward('/alumno');
  }

  goToperfil() {
    this.navCtrl.navigateForward('/perfil');
  }

  goTorecover_password() {
    this.navCtrl.navigateForward('/code-verifi');
  }
}
