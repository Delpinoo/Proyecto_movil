import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root',
})
export class AsistenciaService {

    constructor(private firestore: AngularFirestore) {}

  // Método para agregar un alumno a la colección 'lista'
    addToLista(studentId: string, ramo: string, date: string) {
    return this.firestore.collection('lista').add({
        studentId,
        ramo,
        date
        });
    }

  // Método para obtener todos los estudiantes registrados en la lista
    getLista() {
        return this.firestore.collection('lista').snapshotChanges();
    }
}
