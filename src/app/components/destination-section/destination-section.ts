import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationCard } from '../destination-card/destination-card';
import { AccommodationService } from '../../services/accommodation.services';

@Component({
  selector: 'app-destination-section',
  standalone: true,
  imports: [DestinationCard, CommonModule],
  templateUrl: './destination-section.html',
  styleUrls: ['./destination-section.css'],
})
export class DestinationsSection implements OnInit {
  destinations: any[] = [];

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit() {
    this.accommodationService.getAll().subscribe({
      next: (response) => {
        console.log('✅ Alojamientos cargados:', response);
        this.destinations = response.content.content; // ⚠️ doble 'content' como te expliqué
      },
      error: (err) => console.error('❌ Error al cargar alojamientos:', err),
    });
  }
}
