import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-form.html',
  styleUrls: ['./reservation-form.css'],
})
export class ReservationForm {
  @Output() reservationChange = new EventEmitter<any>();

  reservation = {
    checkIn: '',
    checkOut: '',
    guests: 1,
    comments: '',
  };

  // Emitir cambios cada vez que el usuario modifica algo
  updateReservation() {
    this.reservationChange.emit(this.reservation);
  }

  confirmReservation() {
    console.log('Reserva confirmada:', this.reservation);
    alert('Reserva confirmada correctamente 🎉');
  }
}
