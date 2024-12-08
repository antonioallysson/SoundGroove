import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private clientId = '0fe4640f22dc48a4ac20416c67c2b97d';  // Substitua com seu Client ID
  private clientSecret = '584808aaaee1458b89f4cc7233e1a0c7';  // Substitua com seu Client Secret
  private authUrl = 'https://accounts.spotify.com/api/token';
  private accessToken: string = '';
  
  constructor(private http: HttpClient) {}

  // Método para obter um novo token
  getAccessToken(): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret))
      .set('Content-Type', 'application/x-www-form-urlencoded');  // Corrige o Content-Type

    return this.http.post(this.authUrl, body.toString(), { headers });
  }

  // Método para armazenar o token de acesso
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  // Método para obter o token de acesso
  getAccessTokenValue(): string {
    return this.accessToken;
  }
}