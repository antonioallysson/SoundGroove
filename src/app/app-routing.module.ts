import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { PesquisarComponent } from './componentes/pesquisar/pesquisar.component';


const routes: Routes = [
    { path: '', component: HomeComponent },       // Rota inicial
    { path: 'login', component: LoginComponent }, // Rota de login
    { path: 'cadastro', component: CadastroComponent }, // Rota de cadastro
    { path: 'busca', component: PesquisarComponent }, // Rota de pesquisa
    { path: '**', redirectTo: '' },
    { path: 'music-detail/:id', component: PesquisarComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
