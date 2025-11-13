import { Component, OnInit } from '@angular/core';
import { SidebarProfileComponent } from '../../components/sidebar-profile/sidebar-profile';
import { ReservationSection } from '../../components/reservation-section/reservation-section';
import { Notifications } from '../../components/notifications/notifications';
import { Footer } from '../../components/footer/footer';
import { ReservationService } from '../../services/reservation.services';
import { AccommodationService } from '../../services/accommodation.services';
import { ReservationDTO } from '../../models/reservation-dto';
import { ReservationFilterComponent } from '../../components/reservation-filter/reservations-filter';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    SidebarProfileComponent,
    ReservationFilterComponent,
    ReservationSection,
    Notifications,
    Footer
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile implements OnInit {

  reservas: ReservationDTO[] = [];
  notificaciones: any[] = [];

  constructor(
    private reservationService: ReservationService,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit() {
    this.loadReservations();
  }

  /** ============================
   *  🔹 Cargar todas las reservas
   *  ============================ */
  loadReservations() {
    this.reservationService.getUserReservations().subscribe({
      next: (res) => {
        this.mapearReservas(res);
      },
      error: (err) => console.error('❌ Error al cargar reservas:', err),
    });
  }

  /** ===================================================
   *  🔹 Filtros enviados desde <app-reservations-filter>
   *  =================================================== */
  aplicarFiltros(filtros: any) {
  this.reservationService.getUserReservationsFiltered(filtros).subscribe({
    next: (res) => {
      this.reservas = res.map(r => ({
        ...r,
        titulo: `Reserva #${r.id}`,
        checkin: r.checkIn.split('T')[0],
        checkout: r.checkOut.split('T')[0],
        estado:
          r.reservationStatus === 'CONFIRMED' ? 'Confirmada' :
          r.reservationStatus === 'PENDING' ? 'Pendiente' :
          r.reservationStatus === 'CANCELED' ? 'Cancelada' :
          'Completada',
      }));
    }
  });
}

  /** ==============================
   *  🔹 Mapear reservas con imagen
   *  ============================== */
  private mapearReservas(res: ReservationDTO[]) {
    this.reservas = res.map((r) => ({
      ...r,
      titulo: `Reserva #${r.id}`,
      checkin: r.checkIn.split('T')[0],
      checkout: r.checkOut.split('T')[0],
      estado:
        r.reservationStatus === 'CONFIRMED'
          ? 'Confirmada'
          : r.reservationStatus === 'PENDING'
          ? 'Pendiente'
          : r.reservationStatus === 'CANCELED'
          ? 'Cancelada'
          : 'Completada',
      imagen: '',
    }));

    this.reservas.forEach((reserva) => {
      if (reserva.accommodationId) {
        this.accommodationService.getAccommodationById(reserva.accommodationId).subscribe({
          next: (alojamiento) => {
            reserva.imagen =
              alojamiento.mainImage || alojamiento.images?.[0] || 'assets/default.jpg';
          },
          error: () => reserva.imagen = 'assets/default.jpg'
        });
      } else {
        reserva.imagen = 'assets/default.jpg';
      }
    });
  }

  /** ============================
   *  🔹 Cancelar reserva
   *  ============================ */
   /** 🔥 CANCELAR RESERVA */
  onCancelarReserva(id: number) {
    this.reservationService.cancelReservation(id).subscribe({
      next: (res) => {
        this.notificaciones.push({
          tipo: 'success',
          mensaje: `La reserva #${id} fue cancelada correctamente`
        });

        // Actualizar la lista después de cancelar
        this.loadReservations();
      },
      error: (err) => {
        this.notificaciones.push({
          tipo: 'error',
          mensaje: err.error?.message || 'Error al cancelar la reserva'
        });
      }
    });
  }

  


  onLimpiarNotificaciones() {
    this.notificaciones = [];
  }

}