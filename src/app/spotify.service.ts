import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private accessToken = 'BQB-1lBYZIrc5rkcRtTCsKFDkikAapDpzG0UbHJfDFh9AWK4TEJPBd5qiM99YDMQx8-9TiIqdPsgjLMGsNKyAwstcNFAmxPMqqABnADOL6bcDDjyusw';
  private baseUrl = 'http://localhost:5000'; //link do BD
  
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
  submitReview(review: { trackId: string; rating: number; comment: string; created_at : Date }) {
    return this.http.post(`${this.baseUrl}/review`, review);
  }
}
