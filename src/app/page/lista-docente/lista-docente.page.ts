import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-lista-docente',
  templateUrl: './lista-docente.page.html',
  styleUrls: ['./lista-docente.page.scss'],
})
export class ListaDocentePage implements OnInit {
  alertButtons = ['Aceptar'];
  selectedRamo: string = '';
  items: string[] = [];
  ramos: string[] = ['Inglés', 'Matemáticas', 'Programación', 'Base de Datos'];
  asistenciaPorRamo: any[] = [];
  constructor(private alertController: AlertController, private router: Router, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.generateItems();
    
  }
  loadAsistencia() {
    if (this.selectedRamo) {
      // Lógica para obtener la asistencia filtrada por ramo
      this.firestore.collection('asistencia', ref => 
        ref.where('ramo', '==', this.selectedRamo)
      ).get().subscribe(snapshot => {
        // Asignar los resultados a la propiedad asistenciaPorRamo
        this.asistenciaPorRamo = snapshot.docs.map(doc => doc.data());
      });
    }
    }
  private generateItems() {
    const count = this.items.length + 1;
    for (let i = count; i < Math.min(count + 50, 30); i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  getAsistenciaByRamo(ramo: string) {
    // Realizar la consulta con 'where' para filtrar por el campo 'ramo'
    const asistenciaRef = this.firestore.collection('asistencia', ref => ref.where('ramo', '==', ramo));
  
    asistenciaRef.get().subscribe(snapshot => {
      // Verificar si snapshot existe y tiene documentos
      if (snapshot && snapshot.docs.length > 0) {
        const asistencia = snapshot.docs.map(doc => doc.data());
        console.log(asistencia);
      } else {
        console.log('No se encontraron documentos');
      }
    }, (error) => {
      console.error('Error al obtener los documentos', error);
    });
  }

  async guardar_list() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'La lista se guardó correctamente.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/docente']);
          },
          cssClass: 'alert-button-white',
        },
      ],
    });

    alert.cssClass = 'custom-alert';
    
    await alert.present();
  }
}
