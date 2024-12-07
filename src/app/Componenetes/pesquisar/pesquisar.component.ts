import { Component } from '@angular/core';
import { SpotifyService } from '../../spotify.service';
import { FormControl } from '@angular/forms';

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

  constructor(private spotifyService: SpotifyService) {
    // Monitora mudanças no valor da avaliação
    this.rating.valueChanges.subscribe((newRating) => {
      if (this.selectedTrack) {
        this.rateTrack(this.selectedTrack.id, newRating);
      }
    });
  }

  onSearch(): void {
    if (this.query) {
      this.spotifyService.search(this.query).subscribe((response) => {
        this.results = response['tracks'].items;
      });
    }
  }

  viewTrackDetails(trackId: string): void {
    this.spotifyService.getTrackDetails(trackId).subscribe((trackDetails) => {
      this.selectedTrack = trackDetails;
      this.rating.setValue(0);
    });
  }

  submitReview(): void {
    if (!this.selectedTrack) return;

    const review = {
      trackId: this.selectedTrack.id,
      rating: this.rating.value,
      comment: this.comentario,
      timestamp: new Date()
    };

    console.log('Enviando avaliação:', review);
    // Envia a avaliação ao serviço
    this.spotifyService.submitReview(review).subscribe({
      next: () => {
        alert('Avaliação enviada com sucesso!');
        this.comentario = '';
      },
      error: (err) => {
        console.error('Erro ao enviar avaliação:', err);
        alert('Ocorreu um erro ao enviar sua avaliação.');
      }
    });
  }

  rateTrack(trackId: string, rating: number): void {
    console.log(`Faixa ${trackId} avaliada com ${rating} estrelas.`);
    // Aqui você pode enviar a avaliação para o backend ou salvar localmente
  }

  convertDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
}
