import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { CarouselComponent } from '../../components/carousel/carousel';
import { DestinationInfo } from '../../components/destination-info/destination-info';
import { DestinationDescription } from '../../components/destination-description/destination-description';
import { ReviewsSection } from '../../components/reviews-section/reviews-section';
import { AccommodationService } from '../../services/accommodation.services';
import { ReviewService } from '../../services/review.services';
import { AccommodationDTO } from '../../models/accommodation-dto';
import { ReviewDTO } from '../../models/review-dto';
import { Map } from '../../components/map/map';
import { MapService } from '../../services/map/map-service';
import { Marker } from 'mapbox-gl';
import { MarkerDTO } from '../../models/marker-dto';
@Component({
  selector: 'app-accommodation-detail',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Footer,
    CarouselComponent,
    DestinationInfo,
    DestinationDescription,
    ReviewsSection,
    Map,
  ],
  templateUrl: './accommodation-detail.html',
  styleUrls: ['./accommodation-detail.css'],
})
export class AccommodationDetail implements OnInit {
  destination?: AccommodationDTO;
  reviews: ReviewDTO[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private reviewService: ReviewService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('📦 ID del alojamiento desde la URL:', id);

    if (!id) {
      this.error = 'No se encontró el ID del alojamiento.';
      this.loading = false;
      return;
    }

    // 1️⃣ Obtener alojamiento
    this.accommodationService.getAccommodationById(id).subscribe({
      next: (data) => {
        console.log('✅ Alojamiento cargado:', data);
        this.destination = data;

        // Inicializar mapa con la ubicación del alojamiento'
        const marker: MarkerDTO = {
          id: Number(data.id),
          title: data.address,
          photoUrl: data.mainImage || data.images?.[0] || '',
          location: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
        };
        setTimeout(() => {
          this.mapService.drawMarkers([marker]);
        }, 200);
        this.reviewService.getReviewsByAccommodation(data.id).subscribe({
          next: (reviews) => {
            console.log('✅ Reseñas cargadas:', reviews);
            this.reviews = reviews; // directamente ReviewDTO[]
            this.loading = false;
          },
          error: (err) => {
            console.error('❌ Error cargando reseñas:', err);
            this.loading = false;
          },
        });
      },
      error: (err) => {
        console.error('❌ Error cargando alojamiento:', err);
        this.error = 'Error al cargar el alojamiento.';
        this.loading = false;
      },
    });
  }
}
