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
import { ReviewService } from '../../services/review.services'; // ✅ importa el nuevo servicio

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
  ],
  templateUrl: './accommodation-detail.html',
  styleUrls: ['./accommodation-detail.css'],
})
export class AccommodationDetail implements OnInit {
  destination: any = null;
  reviews: any[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private reviewService: ReviewService
  ) {}

  async ngOnInit() {
    try {
      // 1️⃣ Traer alojamiento
      const id = Number(this.route.snapshot.paramMap.get('id'));
      console.log('📦 ID del alojamiento desde la URL:', id);
      const accommodationResponse: any = await this.accommodationService
        .getAccommodationById(id)
        .toPromise();
      this.destination = accommodationResponse.content;

      // 2️⃣ Traer reseñas usando el ID del alojamiento
      const reviewResponse: any = await this.reviewService
        .getReviewsByAccommodation(id)
        .toPromise();

      this.reviews = reviewResponse.content.content; // ⚠️ recuerda que viene doble content
    } catch (e) {
      console.error(e);
      this.error = 'Error al cargar el destino o las reseñas.';
    } finally {
      this.loading = false;
    }
  }
}
