import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReservationCard } from '../reservation-card/reservation-card';
import { CancelModal } from '../cancel-modal/cancel-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-section',
  standalone: true,
  imports: [CommonModule, ReservationCard, CancelModal],
  templateUrl: './reservation-section.html',
  styleUrls: ['./reservation-section.css'],
})
export class ReservationSection {
  @Input() reservas: any[] = [];
  @Output() cancelar = new EventEmitter<string>();

  reservaSeleccionada: any;

  seleccionar(reserva: any) {
    this.reservaSeleccionada = reserva;
  }

  confirmarCancelacion() {
    this.cancelar.emit(this.reservaSeleccionada?.id);
  }
}
