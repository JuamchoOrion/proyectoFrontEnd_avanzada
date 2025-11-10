import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destination-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-description.html',
  styleUrls: ['./destination-description.css'],
})
export class DestinationDescription {
  @Input() description: string = '';
  @Input() services: string[] = [];
}
