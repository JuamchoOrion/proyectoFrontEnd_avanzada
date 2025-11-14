import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewDTO } from '../../models/review-dto';
import { ReviewCard } from '../review-card/review-card';

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [CommonModule, ReviewCard],
  templateUrl: './reviews-section.html',
  styleUrls: ['./reviews-section.css'],
})
export class ReviewsSection {
  @Input() reviews: ReviewDTO[] = [];
}
