import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map/map-service';
import { RouterModule } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.services';
import { DestinationDTO } from '../../models/destination-dto';
import { MarkerDTO } from '../../models/marker-dto';

@Component({
  selector: 'app-home-map',
  imports: [RouterModule],
  templateUrl: './home-map.html',
  styleUrl: './home-map.css',
})
export class HomeMap implements OnInit {
  // Se inyecta el servicio de mapa en el constructor del componente
  constructor(private mapService: MapService, private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.mapService.create();
    this.accommodationService.getDestinations().subscribe({
      next: (places) => {
        const markers = this.mapItemsToMarkers(places);
        this.mapService.drawMarkers(markers);
      },
      error: (err) => console.error('Error cargando destinos', err),
    });
  }
  public mapItemsToMarkers(places: DestinationDTO[]): MarkerDTO[] {
    return places.map((item) => ({
      id: item.id || '',
      location: item.location,
      title: item.city,
      photoUrl: item.image || 'assets/default.jpg',
    }));
  }
}
