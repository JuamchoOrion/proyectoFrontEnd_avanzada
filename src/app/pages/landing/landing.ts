import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { SearchFilter } from '../../components/search-filter/search-filter';
import { CarouselComponent } from '../../components/carousel/carousel';
import { DestinationsSection } from '../../components/destination-section/destination-section';
import { Footer } from '../../components/footer/footer';
import { AccommodationService } from '../../services/accommodation.services';
import { DestinationDTO } from '../../models/destination-dto';
import { HomeMap } from '../../components/home-map/home-map';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    Navbar,
    SearchFilter,
    CarouselComponent,
    DestinationsSection,
    Footer,
    HomeMap,
    CommonModule,
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
})
export class Landing implements OnInit {
  destinations: DestinationDTO[] = [];
  heroImages: string[] = [];
  currentPage = 0;
  totalPages = 0;
  loading = true;

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.loadDestinations(0);
  }

  /** 🔹 Cargar todos los alojamientos al iniciar */

  loadDestinations(page: number): void {
    this.loading = true;

    this.accommodationService.getDestinations(page).subscribe({
      next: (res) => {
        console.log('📌 RES:', res);
        console.log('📌 res.totalPages:', res.totalPages);
        console.log('📌 res.page:', res.page);

        this.destinations = res.content;
        this.totalPages = res.totalPages;
        this.currentPage = res.page;

        console.log('📌 this.totalPages:', this.totalPages);

        this.heroImages = [
          ...res.content.map((d) => d.images?.[0] || d.image || 'assets/default.jpg'),
        ];
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
  changePage(page: number) {
    if (page < 0 || page >= this.totalPages) return;
    this.loadDestinations(page);
  }
  /** 🔹 Actualizar destinos y carrusel */
  private updateDestinations(data: DestinationDTO[]): void {
    this.destinations = data;
    this.heroImages = data.map((d) => d.images?.[0] || d.image || 'assets/default.jpg');
    this.loading = false;
  }
}
