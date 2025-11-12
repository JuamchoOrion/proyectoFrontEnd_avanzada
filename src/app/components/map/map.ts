import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map/map-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements OnInit {
  // Se inyecta el servicio de mapa en el constructor del componente
  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.create();
  }
}
