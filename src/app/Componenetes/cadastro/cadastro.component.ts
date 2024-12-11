import { Component } from '@angular/core';
import { ApiService } from '../../servicos/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false; // Controle da visibilidade da senha
  showConfirmPassword: boolean = false; // Controle da visibilidade da confirmação

  constructor(private apiService: ApiService, private router: Router,) {}

  // Verifica se as duas senhas são iguais, se for, o usuário é cadastrado no sistema.
  onSubmit() {
    if (this.password === this.confirmPassword) {
      const userData = { username: this.name, email: this.email, password: this.password };

      this.apiService.register(userData).subscribe(
        (response) => {
          alert(`Usuário ${this.name} cadastrado com sucesso!`);
        },
        (error) => {
          alert('Erro ao cadastrar usuário.');
          // console.error('Erro do backend:', error);
        }
      );
      this.router.navigate(['/login']);
    } else {
      alert('As senhas não coincidem!');
    }
  }

  // Alterna a visibilidade das senhas
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
