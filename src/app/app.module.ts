import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './Routers/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componenetes/login/login.component';
import { CadastroComponent } from './Componenetes/cadastro/cadastro.component';
import { HomeComponent } from './Componenetes/home/home.component';
import { PesquisarComponent } from './Componenetes/pesquisar/pesquisar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { SpotifyService } from './servicos/spotify.service';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { LogoutComponent } from './Componenetes/logout/logout.component';
import { HistoricoComponent } from './Componenetes/historico/historico.component';
import { AvaliacoesMusicaComponent } from './Componenetes/avaliacoes-musica/avaliacoes-musica.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PesquisarComponent,
    LogoutComponent,
    HistoricoComponent,
    AvaliacoesMusicaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxStarRatingModule,
    ReactiveFormsModule
  ],
  providers: [SpotifyService, provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
