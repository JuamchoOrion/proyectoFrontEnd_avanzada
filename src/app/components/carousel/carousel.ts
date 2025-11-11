import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.services'; // opcional

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css'],
})
export class CarouselComponent implements OnInit {
  @Input() images: string[] | null = null; // imágenes recibidas directamente
  @Input() accommodationId?: number; // si las carga dinámicamente
  @Input() showMode: 'single' | 'all' = 'all'; // 🔥 nuevo: controla cuántas mostrar

  dynamicImages: string[] = [];
  loading = true;

  constructor(private imageService: ImageService) {}

  async ngOnInit() {
    try {
      if (this.accommodationId) {
        this.dynamicImages = await this.imageService.getImagesByAccommodationId(
          this.accommodationId
        );
      }
    } catch (e) {
      console.error('Error cargando imágenes del alojamiento', e);
    } finally {
      this.loading = false;
    }
  }

  get imagesToShow(): string[] {
    // 🔥 Determina qué imágenes mostrar según el modo
    const source = this.accommodationId ? this.dynamicImages : this.images ?? [];
    if (this.showMode === 'single' && source.length > 0) {
      return [source[0]]; // solo la primera
    }
    return source;
  }
}
