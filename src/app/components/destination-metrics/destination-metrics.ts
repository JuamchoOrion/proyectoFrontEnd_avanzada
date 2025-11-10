import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destination-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-metrics.html',
  styleUrls: ['./destination-metrics.css'],
})
export class DestinationMetrics {
  @Input() metrics!: {
    totalReservations: number;
    averageRating: number;
    totalRevenue: number;
  };
}
