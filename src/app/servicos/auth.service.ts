import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userName: string | null = null;
  private userId: number | null = null; // Alterado para aceitar null inicialmente

  setUserId(userId: number) {
    this.userId = userId;
    localStorage.setItem('userId', userId.toString()); // Armazena o userId no localStorage
  }

  getUserId(): number | null {
  if (this.userId === null) {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null; // Recupera o userId do localStorage
  }
  return this.userId;
}
  
  setUserName(name: string) {
    this.userName = name;
    localStorage.setItem('userName', name);
  }

  getUserName(): string | null {
    if (!this.userName) {
      this.userName = localStorage.getItem('userName');
    }
    return this.userName;
  }
  

  logout() {
    this.userName = null;
    this.userId = null; // Limpa o userId
    localStorage.removeItem('userName');
    localStorage.removeItem('userId'); // Remove também o userId do localStorage
  }
}
