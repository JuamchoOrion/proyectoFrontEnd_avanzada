import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewDTO } from '../../models/review-dto';
import { ReviewCard } from '../review-card/review-card';
import { ReviewService } from '../../services/review.services';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ReviewCard],
  templateUrl: './reviews-section.html',
  styleUrls: ['./reviews-section.css'],
})
export class ReviewsSection {
  @Input() reviews: ReviewDTO[] = [];
  @Input() isHost: boolean = false;

  replyMessages: { [key: number]: string } = {};

  constructor(private reviewService: ReviewService) {}

  sendReply(reviewId: number) {
  const message = this.replyMessages[reviewId];

  if (!message || message.trim() === '') {
    alert('La respuesta no puede estar vacía');
    return;
  }

  this.reviewService.replyToReview(reviewId, message).subscribe({
    next: (res) => {
      // Actualizamos directamente la propiedad reply del review
      const review = this.reviews.find(r => r.id === reviewId);
      if (review) {
        review.reply = message; // ← solo el texto
      }
      this.replyMessages[reviewId] = ''; // limpiar campo
      alert('Respuesta enviada con éxito');
    },
    error: (err) => {
      console.error("Error al enviar respuesta:", err);
      alert("Error al enviar respuesta");
    }
  });
}
}