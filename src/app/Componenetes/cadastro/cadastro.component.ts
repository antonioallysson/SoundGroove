import { Component } from '@angular/core';
import { ApiService } from '../../servicos/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = ''; // Adicionando a variável para confirmação de senha

  constructor(private apiService: ApiService) {}

  onSubmit() {
    if (this.password === this.confirmPassword) {  // Verifica se as senhas coincidem
      const userData = { username: this.name, email: this.email, password: this.password };

      this.apiService.register(userData).subscribe(
        (response) => {
          console.log('Resposta do servidor:', response);
          alert(`Usuário ${this.name} cadastrado com sucesso!`);
        },
        (error) => {
          alert('Erro ao cadastrar usuário.');
          console.error('Erro do backend:', error);
        }
      );
    } else {
      alert('As senhas não coincidem!');
    }
  }
}
