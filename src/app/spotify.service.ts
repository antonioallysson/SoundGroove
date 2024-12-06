import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private accessToken = 'BQC20PwUe1ur2A76zbcVhat7Uq7fDc-n7O6GEzaoSCj3KnqRbHH2-2Epbzbcm3-dJozu6hEZDVbDZvw3yIuFyxeTTlMKix-qSl3xW8tc8kPp5tiGq5s';

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
}
