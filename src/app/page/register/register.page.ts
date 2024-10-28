import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }
  async Register() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Se registró correctamente',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/home']);
          },
          cssClass: 'alert-button-white',
        },
      ],
    });

    alert.cssClass = 'custom-alert';
    
    await alert.present();
  }
}
