import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './destination-card.html',
  styleUrls: ['./destination-card.css'],
})
export class DestinationCard {
  @Input() title: string | null = null;
  @Input() description: string | null = null;
  @Input() price: string | number | null = null;
  @Input() image: string | null = null;
  @Input() destinationId: string | number | null = null;
}
