import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-crear-ramo',
  templateUrl: './crear-ramo.page.html',
  styleUrls: ['./crear-ramo.page.scss'],
})
export class CrearRamoPage implements OnInit {
  nombre: string ='';
  apellido: string = '';
  correo: string = '';
  contrasena: string ='';
  confirmarContrasena: string = '';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

}
