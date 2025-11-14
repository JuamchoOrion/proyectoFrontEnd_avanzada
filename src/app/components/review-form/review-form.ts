import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review.services';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-form.html',
  styleUrls: ['./review-form.css'],
})
export class ReviewForm {
  @Input() reservationId: number | null = null;

  @Output() reviewCreated = new EventEmitter<any>();

  newReview = {
    rating: 5,
    text: '',
  };

  loading = false;

  constructor(private reviewService: ReviewService) {}

  submitReview() {
    if (!this.newReview.text.trim()) return;
    if (!this.reservationId) return;
    this.loading = true;
    const body = {
      rating: this.newReview.rating,
      text: this.newReview.text,
      reservationId: this.reservationId, // ← CORRECTO
    };

    this.reviewService.createReview(body).subscribe({
      next: (response) => {
        this.loading = false;
        this.newReview = { rating: 5, text: '' };
        this.reviewCreated.emit(response.content); // Envía la reseña creada
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Error creando review:', err);
      },
    });
  }
}
