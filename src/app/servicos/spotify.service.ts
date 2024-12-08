import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { SpotifyAuthService } from './spotify-auth.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private baseUrl = 'http://localhost:5000'; //link do BD
  
  constructor(
    private http: HttpClient,
    private spotifyAuthService: SpotifyAuthService  // Injete o SpotifyAuthService
  ) {}

  // Pesquisa de músicas
  search(query: string): Observable<any> {
    return this.spotifyAuthService.getAccessToken().pipe(
      switchMap((response) => {
        const accessToken = response.access_token;  // Pega o token da resposta
        this.spotifyAuthService.setAccessToken(accessToken);  // Armazena o token
        const url = `${this.apiUrl}/search?q=${query}&type=track&limit=5`;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.get(url, { headers });
      })
    );
  }

  // Método para obter os detalhes de uma faixa
  getTrackDetails(trackId: string): Observable<any> {
    const accessToken = this.spotifyAuthService.getAccessTokenValue();  // Obtém o token armazenado
    const url = `${this.apiUrl}/tracks/${trackId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(url, { headers });
  }

  // Novo método para enviar avaliações
  submitReview(review: { trackId: string; rating: number; comment: string; created_at : Date }) {
    return this.http.post(`${this.baseUrl}/review`, review);
  }
}
