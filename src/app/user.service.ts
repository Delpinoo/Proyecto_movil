import { Injectable } from '@angular/core';
import { User } from './shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersKey = 'users'


  constructor() {}

  addUser(user: User): boolean {
    const users: User[] = this.getUsers();
    

    const existingUser = users.find(u => u.correo === user.correo);
    if (existingUser) {
      console.log('El correo ya está registrado');
      return false; 
    }

    users.push(user); 
    localStorage.setItem(this.usersKey, JSON.stringify(users)); 
    console.log('Usuarios registrados:', users);
    return true; 
  }

  getUsers(): User[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : []; 
  }

  getUserCount(): number {
    return this.getUsers().length; 
  }
  
  login(correo: string, contrasena: string): boolean {
    const users: User[] = this.getUsers();
    const user = users.find(u => u.correo === correo && u.contrasena === contrasena);
    return user !== undefined; // Retorna true si se encuentra el usuario
  }

  logout() {
    localStorage.removeItem(this.usersKey);
    console.log('Sesión cerrada');
  }

}