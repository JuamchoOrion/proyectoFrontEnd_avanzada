import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ReservationService } from '../../services/reservation.services';
import { AccommodationService } from '../../services/accommodation.services';
import { ReviewService } from '../../services/review.services';

import { ReviewDTO } from '../../models/review-dto';
import { AccommodationDTO } from '../../models/accommodation-dto';
import { ReservationDTO } from '../../models/reservation-dto';

import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsSection } from '../../components/reviews-section/reviews-section';
import { Footer } from '../../components/footer/footer';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  templateUrl: './review-detail.html',
  styleUrls: ['./review-detail.css'],
  imports: [CommonModule, ReviewForm, ReviewsSection, Footer, Navbar],
})
export class ReservationDetail implements OnInit {
  reservationId!: number;
  reservation!: ReservationDTO;
  accommodation?: AccommodationDTO;

  reviews: ReviewDTO[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private accommodationService: AccommodationService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.reservationId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.reservationId) return;
    this.loadReservation();
  }

  loadReservation() {
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (res) => {
        this.reservation = res;

        this.accommodationService.getAccommodationById(res.accommodationId).subscribe((acc) => {
          this.accommodation = acc;
          this.loadReviews(acc.id);
        });
      },
      error: (err) => console.error('❌ Error cargando reserva', err),
    });
  }

  loadReviews(accommodationId: number) {
    this.reviewService.getReviewsByAccommodation(accommodationId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error cargando reviews:', err);
        this.loading = false;
      },
    });
  }

  onReviewCreated(review: ReviewDTO) {
    this.reviews.unshift(review);
  }
}
