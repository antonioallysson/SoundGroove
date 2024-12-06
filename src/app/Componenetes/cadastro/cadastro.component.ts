import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    // Aqui você pode salvar os dados em um backend ou local storage
    alert(`Usuário ${this.name} cadastrado com sucesso!`);
    console.log('Dados do usuário:', {
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }
}
