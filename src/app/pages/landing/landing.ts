import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { SearchFilter } from '../../components/search-filter/search-filter';
import { CarouselComponent } from '../../components/carousel/carousel';
import { DestinationsSection } from '../../components/destination-section/destination-section';
import { Footer } from '../../components/footer/footer';
import { AccommodationService } from '../../services/accommodation.services';
import { DestinationDTO } from '../../models/destination-dto';
import { HomeMap } from '../../components/home-map/home-map';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Navbar, SearchFilter, CarouselComponent, DestinationsSection, Footer, HomeMap],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
})
export class Landing implements OnInit {
  destinations: DestinationDTO[] = [];
  heroImages: string[] = [];
  loading = true;

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  /** 🔹 Cargar todos los alojamientos al iniciar */
  loadDestinations(): void {
    this.accommodationService.getDestinations().subscribe({
      next: (data) => {
        this.updateDestinations(data);
      },
      error: (err) => {
        console.error('❌ Error al cargar alojamientos:', err);
        this.loading = false;
      },
    });
  }

  applyFilters(filters: any): void {
    this.loading = true;

    this.accommodationService.searchDestinations(filters).subscribe({
      next: (data) => {
        // ✅ Forzamos nueva referencia para activar detección de cambios
        this.destinations = [...data];
        this.heroImages = [...data.map((d) => d.images?.[0] || d.image || 'assets/default.jpg')];
        this.loading = false;
        console.log('🟢 Filtros aplicados, destinos actualizados:', this.destinations);
      },
      error: (err) => {
        console.error('❌ Error al aplicar filtros:', err);
        this.loading = false;
      },
    });
  }

  /** 🔹 Actualizar destinos y carrusel */
  private updateDestinations(data: DestinationDTO[]): void {
    this.destinations = data;
    this.heroImages = data.map((d) => d.images?.[0] || d.image || 'assets/default.jpg');
    this.loading = false;
  }
}
