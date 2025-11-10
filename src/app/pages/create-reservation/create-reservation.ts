import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationForm } from '../../components/reservation-form/reservation-form';
import { ReservationSummary } from '../../components/reservation-summary/reservation-summary';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, ReservationForm, ReservationSummary, Navbar, Footer],
  templateUrl: './create-reservation.html',
  styleUrls: ['./create-reservation.css'],
})
export class CreateReservation {
  // Datos dinámicos que normalmente vienen desde un servicio
  accommodation = {
    name: 'Apartamento en Cartagena',
    pricePerNight: 120,
  };

  reservationData: any = null;

  onReservationChange(data: any) {
    this.reservationData = data;
  }
}
