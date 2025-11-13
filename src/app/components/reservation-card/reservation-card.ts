import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-card.html',
  styleUrls: ['./reservation-card.css'],
})
export class ReservationCard {
  @Input() reserva: any;
  @Output() abrirModal = new EventEmitter<any>();

  abrir() {
    this.abrirModal.emit(this.reserva); // ← ENVÍA LA RESERVA SELECCIONADA
  }
}