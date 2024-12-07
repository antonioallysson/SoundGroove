import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private accessToken = 'BQCBAx0T7IZIJPJ2zIyknSfJ-Iet0qzTcQw0zcOHxcr7BWPtDctBWU1gKj_3QeRYChEkRyfGaAToFIW69N4NUYbCJSMDPqTVn08e3Jydi4XLZ_k2An8';
  private baseUrl = ''; //link do backend ???
  
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
