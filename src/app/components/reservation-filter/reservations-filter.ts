import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationStatus } from '../../models/reservationStatus-enum';

@Component({
  selector: 'app-reservation-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-filter.html',
  styleUrls: ['./reservation-filter.css'],
})
export class ReservationFilterComponent {
  @Output() filtrar = new EventEmitter<any>();

  ReservationStatus = ReservationStatus;

  filtros = {
    status: '',
    checkIn: '',
    checkOut: '',
    fecha: ''
  };

  /** 👉 Emite los filtros al componente padre */
  emitirFiltros() {
    const params: any = {};

    // Estado
    if (this.filtros.status) params.status = this.filtros.status;

    // Check-in
    if (this.filtros.checkIn)
      params.checkIn = this.filtros.checkIn + 'T00:00:00';

    // Check-out
    if (this.filtros.checkOut)
      params.checkOut = this.filtros.checkOut + 'T23:59:59';

    // Fecha exacta convertida en rango
    if (this.filtros.fecha) {
      params.from = this.filtros.fecha + 'T00:00:00';
      params.to   = this.filtros.fecha + 'T23:59:59';
    }

    // Emitimos al padre
    this.filtrar.emit(params);
  }

  limpiar() {
    this.filtros = {
      status: '',
      checkIn: '',
      checkOut: '',
      fecha: ''
    };

    this.filtrar.emit({});
  }
}