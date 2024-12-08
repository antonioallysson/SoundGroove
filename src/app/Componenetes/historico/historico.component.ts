import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicos/auth.service';
import { ReviewService } from '../../servicos/review.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {
  userReviews: any[] = []; // Aqui você armazenará as avaliações do usuário
  
  constructor(
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId(); // Pega o userId do AuthService

    if (userId !== null) {
      this.reviewService.getUserReviews(userId).subscribe({
        next: (reviews) => {
          this.userReviews = reviews; // Armazena as avaliações retornadas pelo backend
        },
        error: (err) => {
          console.error('Erro ao carregar histórico de avaliações:', err);
        }
      });
    }
  }
}

