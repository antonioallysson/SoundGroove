import { Component, ViewChild } from '@angular/core';
import { SpotifyService } from '../../servicos/spotify.service'; 
import { FormControl } from '@angular/forms';
import { AuthService } from '../../servicos/auth.service';
import { AvaliacoesMusicaComponent } from '../avaliacoes-musica/avaliacoes-musica.component';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent {
  query: string = '';
  results: any[] = [];
  selectedTrack: any = null;
  rating = new FormControl();
  comentario: string = '';
  track_name: string = '';

  @ViewChild(AvaliacoesMusicaComponent) avaliacoesMusicaComponent!: AvaliacoesMusicaComponent;

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService
  ) {
    // Monitora mudanças no valor da avaliação
    this.rating.valueChanges.subscribe((newRating) => {
      if (this.selectedTrack) {
        this.rateTrack(this.selectedTrack.id, newRating);
      }
    });
  }

  onSearch(): void {
    if (!this.query.trim()) {
      alert('Por favor, digite algo para pesquisar.');
      return;

    }

    this.spotifyService.search(this.query).subscribe((response) => {
      this.results = response['tracks'].items;
    });
  }

  // Visualiza detalhes de uma faixa
  viewTrackDetails(trackId: string): void {
    this.spotifyService.getTrackDetails(trackId).subscribe((trackDetails) => {
      this.selectedTrack = trackDetails;
      this.track_name = trackDetails.name;
      this.rating.setValue(0);
    });
  }

  // Submete uma avaliação
  submitReview(): void {
    if (!this.selectedTrack) return;
  
    const userId = this.authService.getUserId();
    const review = {
      trackId: this.selectedTrack.id,
      rating: this.rating.value,
      comment: this.comentario,
      userId: userId,
      created_at: new Date(),
      track_name: this.selectedTrack.name,
    };
  
    this.spotifyService.submitReview(review).subscribe({
      next: () => {
        alert(`Avaliação enviada com sucesso! Obrigado por avaliar a música "${this.selectedTrack.name}".`);
        this.comentario = '';
  
        // Atualiza as avaliações no componente avaliacoes-musica
        if (this.avaliacoesMusicaComponent) {
          this.avaliacoesMusicaComponent.onNewReviewSubmitted();
        }
      },
      error: (err) => {
        // console.error('Erro ao enviar avaliação:', err);
        alert('Selecione uma quantidade de estrelas e escreva um comentário para avaliar.');
      },
    });
  }
  

  rateTrack(trackId: string, rating: number): void {
    // console.log(`Faixa ${trackId} avaliada com ${rating} estrelas.`);
  }

  // Converte duração de milissegundos para minutos/segundos
  convertDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
}
