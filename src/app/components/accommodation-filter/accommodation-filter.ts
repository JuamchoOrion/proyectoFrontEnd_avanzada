import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accommodation-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accommodation-filter.html',
  styleUrls: ['./accommodation-filter.css'],
})
export class AccommodationFilterComponent {
  @Output() filtrar = new EventEmitter<any>();

  filtros = {
    title: '',
    minPrice: '',
    maxPrice: '',
  };

  /** 👉 Emitir filtros al padre */
  emitirFiltros() {
    const params: any = {};

    if (this.filtros.title) params.title = this.filtros.title;
    if (this.filtros.minPrice) params.minPrice = this.filtros.minPrice;
    if (this.filtros.maxPrice) params.maxPrice = this.filtros.maxPrice;

    this.filtrar.emit(params);
  }

  limpiar() {
    this.filtros = {
      title: '',
      minPrice: '',
      maxPrice: '',
    };
    this.filtrar.emit({});
  }
}
