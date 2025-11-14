import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-card.html',
  styleUrls: ['./reservation-card.css'],
})
export class ReservationCard {
  @Input() reserva: any;
  @Output() abrirModal = new EventEmitter<void>();

  abrir() {
    this.abrirModal.emit();
  }
  constructor(private router: Router) {}

  verDetalle() {
    this.router.navigate(['/reservations', this.reserva.id]);
  }
}
