import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  templateUrl: './destination-card.html',
  styleUrls: ['./destination-card.css'],
})
export class DestinationCard {
  @Input() title = '';
  @Input() description = '';
  @Input() price = '';
  @Input() image = '';
}
