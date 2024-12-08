import { Component } from '@angular/core';
import { ApiService } from '../../servicos/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService) {} // Injeta o serviço

  onSubmit() {
    const userData = { username: this.name, email: this.email, password: this.password };
  
    this.apiService.register(userData).subscribe(
      (response) => {
        console.log('Resposta do servidor:', response); // Verifique a resposta no console
        alert(`Usuário ${this.name} cadastrado com sucesso!`);
      },
      (error) => {
        alert('Erro ao cadastrar usuário.');
        console.error('Erro do backend:', error);
      }
    );
  }
}
