import { Component } from '@angular/core';
import { DestinationCard } from '../destination-card/destination-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destination-section',
  standalone: true,
  imports: [DestinationCard, CommonModule],
  templateUrl: './destination-section.html',
  styleUrls: ['./destination-section.css'],
})
export class DestinationsSection {
  destinations = [
    {
      title: 'Cartagena',
      description: 'Hermosas playas y vida nocturna vibrante.',
      price: '$120',
      image: 'https://picsum.photos/id/1040/400/250',
    },
    {
      title: 'Medellín',
      description: 'Ciudad de la eterna primavera.',
      price: '$90',
      image: 'https://picsum.photos/id/1025/400/250',
    },
    {
      title: 'Bogotá',
      description: 'Capital cultural y gastronómica.',
      price: '$100',
      image: 'https://picsum.photos/id/1031/400/250',
    },
  ];
}
