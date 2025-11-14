import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { ReservationForm } from '../../components/reservation-form/reservation-form';
import { ReservationSummary } from '../../components/reservation-summary/reservation-summary';
import { AccommodationService } from '../../services/accommodation.services';
import { CreateReservationDTO } from '../../models/create-reservation-dto';
import { Map } from '../../components/map/map';
import { MapService } from '../../services/map/map-service';
import { MarkerDTO } from '../../models/marker-dto';
@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, Navbar, Footer, ReservationForm, ReservationSummary, Map ],
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
    private accommodationService: AccommodationService,
    private mapService: MapService
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
         const marker: MarkerDTO = {
        id: data.id,
        title: data.address,
        photoUrl: data.mainImage || data.images?.[0] || '',
        location: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
      };
       // Esperar a que el mapa se renderice
      setTimeout(() => {
        this.mapService.drawMarkers([marker]);
      }, 200);
    
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