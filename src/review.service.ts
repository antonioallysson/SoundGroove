import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:5000'; // URL da sua API

  constructor(private http: HttpClient) {}

  // Método para pegar as avaliações de um usuário
  getUserReviews(userId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/review/${userId}`);
  }
}
