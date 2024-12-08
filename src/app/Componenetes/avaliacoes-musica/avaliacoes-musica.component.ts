import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../servicos/review.service';

@Component({
  selector: 'app-avaliacoes-musica',
  templateUrl: './avaliacoes-musica.component.html',
  styleUrls: ['./avaliacoes-musica.component.css']
})
export class AvaliacoesMusicaComponent implements OnInit {
  @Input() trackId!: string; // Recebe o ID da música como entrada
  reviews: any[] = []; // Armazena as avaliações para a música

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    if (this.trackId) {
      this.reviewService.getReviewsByTrack(this.trackId).subscribe({
        next: (reviews) => {
          this.reviews = reviews; // Popula a lista de avaliações
        },
        error: (err) => {
          console.error('Erro ao buscar avaliações:', err);
        }
      });
    }
  }
}
