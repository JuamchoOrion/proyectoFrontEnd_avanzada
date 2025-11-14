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
import { MetricsService } from '../../services/metrics.services';
import { AccommodationDTO } from '../../models/accommodation-dto';
import { ReviewDTO } from '../../models/review-dto';
import { MetricsDTO } from '../../models/metrics-dto';
import { Map } from '../../components/map/map';
import { MapService } from '../../services/map/map-service';
import { MarkerDTO } from '../../models/marker-dto';
import { AuthService } from '../../services/auth.services';
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

  /** Si el usuario autenticado es HOST, esto será true */
  isHost: boolean = false;

  /** Métricas solo para host */
  metrics?: MetricsDTO;
  showMetrics = false;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private reviewService: ReviewService,
    private metricsService: MetricsService,
    private authService: AuthService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'No se encontró el ID del alojamiento.';
      this.loading = false;
      return;
    }

    /** 1️⃣ Obtener rol real desde el backend */
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.isHost = user.role === 'ROLE_HOST';
        console.log('🎭 Rol detectado:', user.role, '=> isHost:', this.isHost);

        /** 4️⃣ Cargar métricas solo si es host */
        if (this.isHost) {
          this.metricsService.getMetrics(id).subscribe({
            next: (data) => {
              this.metrics = data;
              this.showMetrics = true;
            },
            error: (err) => console.error('❌ Error cargando métricas:', err),
          });
        }
      }
    });

    /** 2️⃣ Cargar alojamiento */
    this.accommodationService.getAccommodationById(id).subscribe({
      next: (data) => {
        this.destination = data;

        // Inicializar mapa
        const marker: MarkerDTO = {
          id: Number(data.id),
          title: data.address,
          photoUrl: data.mainImage || data.images?.[0] || '',
          location: { latitude: data.latitude, longitude: data.longitude },
        };

        setTimeout(() => {
          this.mapService.drawMarkers([marker]);
        }, 200);

        /** 3️⃣ Cargar reseñas */
        this.reviewService.getReviewsByAccommodation(data.id).subscribe({
          next: (reviews) => {
            this.reviews = reviews;
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
