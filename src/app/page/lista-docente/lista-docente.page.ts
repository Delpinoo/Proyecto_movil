import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/user.service';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { Subscription } from 'rxjs';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-lista-docente',
  templateUrl: './lista-docente.page.html',
  styleUrls: ['./lista-docente.page.scss'],
})
export class ListaDocentePage implements OnInit, OnDestroy {
  alertButtons = ['Aceptar'];
  selectedRamo: string = '';
  asistenciaPorRamo: any[] = [];
  private asistenciaSubscription!: Subscription;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadAsistenciaPorRamo();
  }

  loadAsistenciaPorRamo() {
    if (this.selectedRamo) {
      console.log('Ramo seleccionado:', this.selectedRamo);
      this.firestore.collection('asistencia', ref =>
        ref.where('ramo', '==', this.selectedRamo)
      ).get().subscribe(snapshot => {
        this.asistenciaPorRamo = [];  // Limpiar lista de asistencias
        snapshot.docs.forEach((doc) => {
          const data = doc.data() as Asistencia;
          console.log('Datos de asistencia:', data);
  
          if (data && data.studentId) {
            // Validar y convertir la fecha de asistencia
            let asistenciaDate = this.convertToDate(data.date);
  
            // Log para verificar el valor de asistenciaDate
            console.log('Asistencia Date:', asistenciaDate);
  
            // Llama a UserService para obtener el nombre del estudiante
            this.userService.getUserById(data.studentId).subscribe(userData => {
              this.asistenciaPorRamo.push({
                date: asistenciaDate,
                studentId: data.studentId,
                studentName: userData?.name || 'Nombre no encontrado'
              });
            }, error => {
              console.error('Error al obtener datos del usuario', error);
              this.asistenciaPorRamo.push({
                date: asistenciaDate,
                studentId: data.studentId,
                studentName: 'Error al cargar nombre'
              });
            });
          }
        });
      }, error => {
        console.error('Error al cargar la asistencia:', error);
      });
    }
  }

  convertToDate(date: any): Date | null {
    if (!date) return null;  // Retorna null si `date` es null o undefined
    if (date instanceof Timestamp) return date.toDate();
    if (date instanceof Date) return date;
    if (typeof date === 'string') return new Date(date);
    return null;
  }

  onRamoChange(event: any) {
    this.selectedRamo = event.target.value;
    this.loadAsistenciaPorRamo();
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
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

  ngOnDestroy() {
    if (this.asistenciaSubscription) {
      this.asistenciaSubscription.unsubscribe();
    }
  }
}
