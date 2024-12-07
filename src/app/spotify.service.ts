import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private accessToken = 'BQClf8jMTivEur1lRQw8MUrPBCdrLb8agbQjVPP4Bt0s-eERoom7mk8t99imWHMS4y8LH5q1wiL_WWwZ8Liyhgkqx22f4BTdKA1cBkv9gVKIhd9ihbo';
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
