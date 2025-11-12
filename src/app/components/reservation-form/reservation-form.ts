import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.services';
import { CreateReservationDTO } from '../../models/create-reservation-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-form.html',
  styleUrls: ['./reservation-form.css'],
})
export class ReservationForm {
  @Input() accommodationId!: number;
  @Output() reservationChange = new EventEmitter<CreateReservationDTO>();

  reservation: CreateReservationDTO = {
    accommodationId: 0,
    checkIn: '',
    checkOut: '',
    guests: 1,
  };

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.accommodationId) {
      this.reservation.accommodationId = this.accommodationId;
    }
  }

  updateReservation() {
    this.reservationChange.emit(this.reservation);
  }

  confirmReservation(form?: NgForm) {
    if (!this.reservation.checkIn || !this.reservation.checkOut) {
      alert('⚠️ Por favor selecciona las fechas de check-in y check-out.');
      return;
    }

    const payload: CreateReservationDTO = {
      accommodationId: this.accommodationId,
      checkIn: new Date(this.reservation.checkIn).toISOString(),
      checkOut: new Date(this.reservation.checkOut).toISOString(),
      guests: this.reservation.guests,
    };

    this.reservationService.createReservation(payload).subscribe({
      next: (res) => {
        console.log('✅ Reserva creada exitosamente:', res);
        alert('🎉 Reserva confirmada correctamente');
        form?.resetForm();
        this.router.navigate(['/profile']); // 👈 Redirigir tras crear
      },
      error: (err) => {
        console.error('❌ Error al crear la reserva:', err);
        alert('Error al confirmar la reserva');
      },
    });
  }
}