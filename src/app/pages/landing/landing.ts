import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { SearchFilter } from '../../components/search-filter/search-filter';
import { CarouselComponent } from '../../components/carousel/carousel';
import { DestinationsSection } from '../../components/destination-section/destination-section';
import { Footer } from '../../components/footer/footer';
import { AccommodationService } from '../../services/accommodation.services';
import { DestinationDTO } from '../../models/destination-dto';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Navbar, SearchFilter, CarouselComponent, DestinationsSection, Footer],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
})
export class Landing implements OnInit {
  destinations: DestinationDTO[] = [];
  heroImages: string[] = []; // ✅ imágenes para el carrusel principal
  loading = true;

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.accommodationService.getDestinations().subscribe({
      next: (data) => {
        console.log('✅ Destinos cargados:', data);
        this.destinations = data;
        // ✅ Toma solo la primera imagen de cada alojamiento
        this.heroImages = data.map((d) => d.images?.[0] || d.image || 'assets/default.jpg');
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar alojamientos:', err);
        this.loading = false;
      },
    });
  }
}
