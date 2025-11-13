import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.html',
  styleUrls: ['./search-filter.css'],
})
export class SearchFilter {
  @Output() filtersChanged = new EventEmitter<any>();

  // 🔹 Valores enlazados al formulario
  city: string = '';
  checkIn: string = '';
  checkOut: string = '';
  maxPrice: number | null = null;
  service: string = '';

  onSubmit() {
    const filters = {
      city: this.city?.trim() || null,
      checkIn: this.checkIn ? new Date(this.checkIn).toISOString() : null,
      checkOut: this.checkOut ? new Date(this.checkOut).toISOString() : null,
      maxPrice: this.maxPrice || null,
      services: this.service || null,
    };
    this.filtersChanged.emit(filters);
  }
}
