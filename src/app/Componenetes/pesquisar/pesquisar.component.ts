import { Component } from '@angular/core';
import { SpotifyService } from '../../servicos/spotify.service'; 
import { FormControl } from '@angular/forms';
import { AuthService } from '../../servicos/auth.service';  // Importe o AuthService

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
    if (this.query) {
      this.spotifyService.search(this.query).subscribe((response) => {
        this.results = response['tracks'].items;
      });
    }
  }


  // pegamos os detalhes de cada musica ao clicar no botao "ver detalhes" como
  // Nome, Artista, Álbum, Duração
  viewTrackDetails(trackId: string): void {
    this.spotifyService.getTrackDetails(trackId).subscribe((trackDetails) => {
      this.selectedTrack = trackDetails;
      this.track_name = trackDetails.name;
      this.rating.setValue(0);
    });
  }


  // pegamos todos os dados da musica e o id do usuario e envimaos
  // para o back em seguida para o banco
  submitReview(): void {
    if (!this.selectedTrack) return;

    const userId = this.authService.getUserId();
    const review = {
      trackId: this.selectedTrack.id,
      rating: this.rating.value,
      comment: this.comentario,
      userId: userId,
      created_at: new Date(),
      track_name: this.selectedTrack.name
    };

    // Envia a avaliação ao serviço e depois limpa ele.
    this.spotifyService.submitReview(review).subscribe({
      next: () => {
        alert('Avaliação enviada com sucesso!');
        this.comentario = '';
      },
      error: (err) => {
        console.error('Erro ao enviar avaliação:', err);
        alert('É preciso está logado para avaliar.');
      }
    });
  }

  rateTrack(trackId: string, rating: number): void {
    // console.log(`Faixa ${trackId} avaliada com ${rating} estrelas.`);
    
  }
  //pegamos o tempo da musica da api em segundos e trasnforma em min/seg para melhor entendimento.
  convertDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
}
