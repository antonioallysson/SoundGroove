import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };

    this.apiService.login(credentials).subscribe(
      (response) => {
        alert('Login bem-sucedido!');
        console.log('Resposta do servidor:', response);
        // Redireciona o usuário após login bem-sucedido
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Credenciais inválidas!');
        console.error('Erro do backend:', error);
      }
    );
  }
}
