import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../servicos/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit() {
    const credentials = { email: this.email, password: this.password };

    this.apiService.login(credentials).subscribe(
      (response) => {
        alert('Login bem-sucedido!');
        console.log('Resposta do servidor:', response);

        // Salva o nome e o userId no AuthService
        const firstName = response.name.split(' ')[0];
        this.authService.setUserName(firstName);
        this.authService.setUserId(response.userId); // Armazena o userId

        // Redireciona o usuário para a página inicial
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Credenciais inválidas!');
        console.error('Erro do backend:', error);
      }
    );
  }
}
