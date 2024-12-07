import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private accessToken = 'BQDxqb_kwGUmAl61Lq-W_rv83shpIK5UQ9kzrRo4yDBwQkBWWFBtByHuQT0BINDA2WLI5r3W0WS-MDnVSE65Ae9pHQ4s5U2XRc3m4n4NgXkNBlWDS28';
  private baseUrl = 'https://seu-backend.com/api'; // URL do backend

  
  constructor(private http: HttpClient) {}

  // Pesquisa de músicas
  search(query: string): Observable<any> {
    const url = `${this.apiUrl}/search?q=${query}&type=track&limit=5`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get(url, { headers });
  }
  // Fim da Pesquisa


  // Método para obter os detalhes de uma faixa
  getTrackDetails(trackId: string): Observable<any> {
    const url = `${this.apiUrl}/tracks/${trackId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get(url, { headers });
  }
  // Fim dos Detalhes

  // Novo método para enviar avaliações
  submitReview(review: { trackId: string; rating: number; comment: string; timestamp: Date }) {
    return this.http.post(`${this.baseUrl}/reviews`, review);
  }
}
