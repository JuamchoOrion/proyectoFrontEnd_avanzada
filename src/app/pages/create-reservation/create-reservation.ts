import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { ReservationForm } from '../../components/reservation-form/reservation-form';
import { ReservationSummary } from '../../components/reservation-summary/reservation-summary';
import { AccommodationService } from '../../services/accommodation.services';
import { CreateReservationDTO } from '../../models/create-reservation-dto';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, Navbar, Footer, ReservationForm, ReservationSummary],
  templateUrl: './create-reservation.html',
  styleUrls: ['./create-reservation.css'],
})
export class CreateReservationComponent implements OnInit {
  accommodation: any = null;

  reservationData: CreateReservationDTO = {
    accommodationId: 0,
    checkIn: '',
    checkOut: '',
    guests: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit() {
    // Obtener el ID del alojamiento desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reservationData.accommodationId = id;

    // Cargar información del alojamiento
    this.accommodationService.getAccommodationById(id).subscribe({
      next: (data) => {
        this.accommodation = data;
        console.log('🟢 Alojamiento cargado:', data);
      },
      error: (err) => {
        console.error('❌ Error al cargar alojamiento:', err);
        alert('No se pudo cargar la información del alojamiento.');
      },
    });
  }

  // Recibe los cambios emitidos desde el formulario hijo
  onReservationChange(data: any) {
    this.reservationData = { ...this.reservationData, ...data };
  }
}