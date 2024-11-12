import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Método para registro de usuario en Firebase
  async registerUser(nombre: string, apellido: string, correo: string, contrasena: string) {
    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await this.auth.createUserWithEmailAndPassword(correo, contrasena);
      const user = userCredential.user;

      // Si el usuario fue creado, actualizar el perfil y guardar en Firestore
      if (user) {
        await user.updateProfile({ displayName: nombre });
        
        // Guardar datos adicionales en Firestore
        await this.firestore.collection('users').doc(user.uid).set({
          nombre: nombre,
          apellido: apellido,
          correo: correo,
        });
      }

      return userCredential;
    } catch (error) {
      throw error;  // Lanzar error para manejarlo en el componente
    }
  }

  // Método para enviar correo de recuperación de contraseña
  async sendPasswordResetEmail(correo: string): Promise<void> {
    try {
      await this.auth.sendPasswordResetEmail(correo);
      console.log('Correo de recuperación enviado');
    } catch (error) {
      console.error('Error al enviar el correo de recuperación', error);
      throw error;
    }
  }

  // Método para inicio de sesión
  async login(correo: string, contrasena: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(correo, contrasena);
      console.log('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error en el inicio de sesión', error);
      throw error;
    }
  }
  async loginWithEmail(correo: string, contrasena: string): Promise<any> {
    return await this.auth.signInWithEmailAndPassword(correo, contrasena);
  }

  // Método para cerrar sesión
  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
