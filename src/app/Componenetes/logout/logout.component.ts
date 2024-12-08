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

  get userName(): string | null {
    return this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
    alert('Você saiu da conta.');
    this.router.navigate(['/login']);
  }
}
