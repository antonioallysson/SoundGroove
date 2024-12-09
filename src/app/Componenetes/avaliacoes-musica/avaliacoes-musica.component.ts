import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../servicos/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avaliacoes-musica',
  templateUrl: './avaliacoes-musica.component.html',
  styleUrls: ['./avaliacoes-musica.component.css']
})
export class AvaliacoesMusicaComponent implements OnInit {
  // Recebe o ID da música como entrada
  @Input() trackId!: string; 
  // Armazena as avaliações para a música
  reviews: any[] = []; 


  constructor(private reviewService: ReviewService, private router: Router) {}
  // Popula a lista de avaliações

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    this.reviewService.getReviewsByTrack(this.trackId).subscribe(
      (data: any) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Erro ao buscar avaliações:', error);
      }
    );
  }

  onNewReviewSubmitted(): void {
    // Recarrega a rota atual
    this.router.navigateByUrl('/busca', { skipLocationChange: true }).then(() => {
      this.fetchReviews(); // Recarrega as avaliações
    });
  }
}
