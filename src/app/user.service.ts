import { Injectable } from '@angular/core';
import { User } from './shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

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
    this.setCurrentUser(user); // Asegúrate de que esto se ejecute después de registrar
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

    if (user) {
        this.setCurrentUser(user); // Almacena el usuario actual
        return true;
    }

    return false;
}

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user)); 
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null; // Retorna el usuario o null
}

  clearCurrentUser(): void {
    localStorage.removeItem(this.currentUserKey); 
  }
}
