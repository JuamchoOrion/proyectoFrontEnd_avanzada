import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewDTO } from '../../models/review-dto';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card.html',
  styleUrls: ['./review-card.css'],
})
export class ReviewCard {
  @Input() review!: ReviewDTO;
}
