import { Component } from '@angular/core';
import { ApiService } from '../../servicos/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../servicos/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false; // Controle da visibilidade da senha

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };

    this.apiService.login(credentials).subscribe(
      (response) => {
        alert('Login bem-sucedido!');

        // Salva o nome e o userId no AuthService
        const firstName = response.name.split(' ')[0];
        this.authService.setUserName(firstName);
        this.authService.setUserId(response.userId); // Armazena o userId

        // Redireciona o usuário para a página inicial
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Crie uma conta ou verifique foi digitado corretamente!');
        // console.error('Erro do backend:', error);
      }
    );
  }

  // Alterna a visibilidade da senha
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
