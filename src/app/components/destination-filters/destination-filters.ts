import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-destination-filters',
  templateUrl: './destination-filters.html',
  styleUrls: ['./destination-filters.css'],
})
export class DestinationFilters {
  startDate: string = '';
  endDate: string = '';

  @Output() filtersApplied = new EventEmitter<{ startDate: string; endDate: string }>();

  applyFilters(event?: Event) {
    if (event) {
      event.preventDefault(); // Evita recargar la página
    }
    this.filtersApplied.emit({ startDate: this.startDate, endDate: this.endDate });
  }
}
