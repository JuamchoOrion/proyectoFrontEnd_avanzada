import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.services'; // servicio de Cloudinary opcional

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css'],
})
export class CarouselComponent implements OnInit {
  @Input() images: string[] | null = null; // imágenes estáticas (landing)
  @Input() accommodationId?: number; // si se usa Cloudinary

  dynamicImages: string[] = [];
  loading = true;

  constructor(private imageService: ImageService) {}

  async ngOnInit() {
    try {
      // Si se pasa accommodationId, carga dinámicamente desde backend
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
    // Si se usa Cloudinary → muestra dynamicImages
    // Si no → usa las estáticas pasadas por Input
    return this.accommodationId ? this.dynamicImages : this.images ?? [];
  }
}
