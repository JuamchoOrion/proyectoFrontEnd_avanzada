import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationCard } from '../destination-card/destination-card';
import { DestinationDTO } from '../../models/destination-dto';

@Component({
  selector: 'app-destination-section',
  standalone: true,
  imports: [CommonModule, DestinationCard],
  templateUrl: './destination-section.html',
  styleUrls: ['./destination-section.css'],
})
export class DestinationsSection {
  @Input() destinations: DestinationDTO[] = [];
  @Input() loading: boolean = false;
}
