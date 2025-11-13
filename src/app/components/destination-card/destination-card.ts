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
  @Input() title!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() image!: string;
 @Input() destinationId!: string | number;
}