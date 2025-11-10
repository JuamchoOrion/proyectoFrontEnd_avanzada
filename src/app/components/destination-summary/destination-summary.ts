import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destination-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-summary.html',
  styleUrls: ['./destination-summary.css'],
})
export class DestinationSummary {
  @Input() destination!: {
    name: string;
    location: string;
    pricePerNight: number;
    capacity: number;
    services: string[];
    imageUrl: string;
  };
}
