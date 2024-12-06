import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './Routers/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componenetes/login/login.component';
import { CadastroComponent } from './Componenetes/cadastro/cadastro.component';
import { HomeComponent } from './Componenetes/home/home.component';
import { PesquisarComponent } from './Componenetes/pesquisar/pesquisar.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { SpotifyService } from './spotify.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PesquisarComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [SpotifyService, provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
