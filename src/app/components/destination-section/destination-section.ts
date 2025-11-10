import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationCard } from '../destination-card/destination-card';
import { AccommodationService } from '../../services/accommodation.services';
import { DestinationDTO } from '../../models/destination-dto';

@Component({
  selector: 'app-destination-section',
  standalone: true,
  imports: [CommonModule, DestinationCard],
  templateUrl: './destination-section.html',
  styleUrls: ['./destination-section.css'],
})
export class DestinationsSection implements OnInit {
  destinations: DestinationDTO[] = [];
  loading = true;

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.accommodationService.getDestinations().subscribe({
      next: (data) => {
        console.log('✅ Destinos cargados:', data);
        this.destinations = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar alojamientos:', err);
        this.loading = false;
      },
    });
  }
}
