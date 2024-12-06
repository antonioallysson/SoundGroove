import { Component } from '@angular/core';
import { SpotifyService } from '../../spotify.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent {
  query: string = '';
  results: any[] = [];
  selectedTrack: any = null;  // Variável para armazenar a música selecionada

  constructor(private spotifyService: SpotifyService) {}

  onSearch(): void {
    if (this.query) {
      this.spotifyService.search(this.query).subscribe((response) => {
        this.results = response['tracks'].items;
      });
    }
  }
  
  viewTrackDetails(trackId: string): void {
    // Chama o método getTrackDetails para obter os detalhes da faixa
    this.spotifyService.getTrackDetails(trackId).subscribe((trackDetails) => {
      this.selectedTrack = trackDetails;  // Armazena os detalhes da música na variável selectedTrack
    });
  }
  convertDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
}
