import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Componentes Standalone
import { Navbar } from '../../components/navbar/navbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Notifications } from '../../components/notifications/notifications';
import { DestinationSummary } from '../../components/destination-summary/destination-summary';
import { DestinationMetrics } from '../../components/destination-metrics/destination-metrics';
import { DestinationFilters } from '../../components/destination-filters/destination-filters';
import { ReservationTable } from '../../components/reservation-table/reservation-table';
import { ReviewCard } from '../../components/review-card/review-card';
import { HostCommentCard } from '../../components/host-comment-card/host-comment-card';

// Servicios
import { AccommodationService } from '../../services/accommodation.services';
import { ReviewService } from '../../services/review.services';
import { ReservationService } from '../../services/reservation.services';
import { MetricsService } from '../../services/metrics.services';

@Component({
  selector: 'app-accommodation-metrics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Sidebar,
    Notifications,
    DestinationSummary,
    DestinationMetrics,
    DestinationFilters,
    ReservationTable,
    ReviewCard,
    HostCommentCard
  ],
  templateUrl: './accommodation-metrics.html',
  styleUrls: ['./accommodation-metrics.css']
})
export class AccommodationMetrics implements OnInit {
  // Datos de la página
  reservations: any[] = [];
  comments: any[] = [];
  metrics: any = {};
  summary: any = {};
  loading = true;
  error = '';

  // Puedes reemplazar estos IDs con valores dinámicos según tu app
  accommodationId = 1;
  hostId = 1;

  constructor(
    private accommodationService: AccommodationService,
    private reviewService: ReviewService,
    private reservationService: ReservationService,
    private metricsService: MetricsService
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      // 1️⃣ Traer información del alojamiento
      const summaryResponse: any = await this.accommodationService.getAccommodationById(this.accommodationId).toPromise();
      this.summary = summaryResponse.content || summaryResponse;

      // 2️⃣ Traer métricas
      const metricsResponse: any = await this.metricsService.getByAccommodation(this.accommodationId).toPromise();
      this.metrics = metricsResponse.content || metricsResponse;

      // 3️⃣ Traer reservas del host
      const reservationsResponse: any = await this.reservationService.getByHost(this.hostId).toPromise();
      this.reservations = reservationsResponse.content || reservationsResponse;

      // 4️⃣ Traer comentarios del alojamiento
      const commentsResponse: any = await this.reviewService.getReviewsByAccommodation(this.accommodationId).toPromise();
      this.comments = commentsResponse.content || commentsResponse;
    } catch (e) {
      console.error(e);
      this.error = 'Error al cargar los datos de métricas, reservas o comentarios.';
    } finally {
      this.loading = false;
    }
  }
}
