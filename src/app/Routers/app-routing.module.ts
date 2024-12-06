import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../Componenetes/home/home.component';
import { LoginComponent } from '../Componenetes/login/login.component';
import { CadastroComponent } from '../Componenetes/cadastro/cadastro.component';
import { PesquisarComponent } from '../Componenetes/pesquisar/pesquisar.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'busca', component: PesquisarComponent },
    { path: '**', redirectTo: '' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
