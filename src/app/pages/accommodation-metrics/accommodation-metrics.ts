import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Componentes Standalone
import { Navbar } from '../../components/navbar/navbar';
import { SidebarProfileComponent } from '../../components/sidebar-profile/sidebar-profile';
import { Notifications } from '../../components/notifications/notifications';
import { DestinationSummary } from '../../components/destination-summary/destination-summary';
import { DestinationMetrics } from '../../components/destination-metrics/destination-metrics';
import { DestinationFilters } from '../../components/destination-filters/destination-filters';
import { ReservationTableComponent } from '../../components/reservation-table/reservation-table';
import { ReviewCard } from '../../components/review-card/review-card';
import { HostCommentCardComponent } from '../../components/host-comment-card/host-comment-card';

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
    SidebarProfileComponent,
    Notifications,
    DestinationSummary,
    DestinationMetrics,
    DestinationFilters,
    ReservationTableComponent,
    ReviewCard,
    HostCommentCardComponent
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

  accommodationId!: number;
  hostId = 1;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private reviewService: ReviewService,
    private reservationService: ReservationService,
    private metricsService: MetricsService
  ) {}

  async ngOnInit() {
    this.accommodationId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.accommodationId) {
      this.error = 'No se proporcionó un ID de alojamiento válido.';
      this.loading = false;
      return;
    }

    this.loading = true;
    try {
      // 1️⃣ Información del alojamiento
      this.summary = await firstValueFrom(
        this.accommodationService.getAccommodationById(this.accommodationId)
      );

      // 2️⃣ Métricas del alojamiento
      this.metrics = await firstValueFrom(
        this.metricsService.getMetrics(this.accommodationId.toString())
      );

      // 4️⃣ Comentarios del alojamiento
      this.comments = await firstValueFrom(
        this.reviewService.getReviewsByAccommodation(this.accommodationId)
      );
    } catch (e) {
      console.error(e);
      this.error = 'Error al cargar los datos de métricas, reservas o comentarios.';
    } finally {
      this.loading = false;
    }
  }
}
