import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    // Simular validação
    if (this.email === 'admin@example.com' && this.password === '123456') {
      alert('Login bem-sucedido!');
    } else {
      alert('Email ou senha inválidos!');
    }
  }
}
