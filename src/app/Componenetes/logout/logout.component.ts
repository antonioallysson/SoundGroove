import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicos/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  //pega o nome do usuario logado, os dados vem do authService
  get userName(): string | null {
    return this.authService.getUserName();
  }

  
  //chama a funcao logout com os dados que foi puxado do authService
  logout() {
    this.authService.logout();
    alert('Você saiu da conta.');
    this.router.navigate(['/login']);
  }
}
