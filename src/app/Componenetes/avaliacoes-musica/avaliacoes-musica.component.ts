import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../servicos/review.service';

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

  constructor(private reviewService: ReviewService) {}
  
  // Popula a lista de avaliações
  ngOnInit(): void {
    if (this.trackId) {
      this.reviewService.getReviewsByTrack(this.trackId).subscribe({
        next: (reviews) => {
          this.reviews = reviews; 
        },
        error: (err) => {
          console.error('Erro ao buscar avaliações:', err);
        }
      });
    }
  }
}
