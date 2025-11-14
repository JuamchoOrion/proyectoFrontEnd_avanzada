import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map/map-service';
import { RouterModule } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.services';
import { DestinationDTO } from '../../models/destination-dto';
import { MarkerDTO } from '../../models/marker-dto';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-map',
  standalone: true, // ✅ importante
  imports: [CommonModule, RouterModule], // ✅ agrega CommonModule
  templateUrl: './home-map.html',
  styleUrls: ['./home-map.css'],
})
export class HomeMap implements OnInit {
  @Input() mapHeight = '300px';
  @Input() mapWidth = '100%';
  constructor(private mapService: MapService, private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.mapService.create();
      this.accommodationService.getDestinations().subscribe((res) => {
        const markers = this.mapItemsToMarkers(res.content);
        this.mapService.drawMarkers(markers); // <-- ESTA LÍNEA ES LA QUE FALTA
      });
    }, 200);
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
