import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicos/auth.service';
import { ReviewService } from '../../servicos/review.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {
  // guarda as avaliações do usuário.
  userReviews: any[] = []; 
  
  constructor(
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {

    // Pega o userId do AuthService do usuario que está logado.
    const userId = this.authService.getUserId(); 

    if (userId !== null) {
      this.reviewService.getUserReviews(userId).subscribe({
        next: (reviews) => {
           // Armazena as avaliações retornadas pelo backend
          this.userReviews = reviews;
        },
        //se o userID nao foi encontrado, ele nao vai apresentar o historico do usuario.
        error: (err) => {
          console.error('Erro ao carregar histórico de avaliações:', err);
        }
      });
    }
  }
}

