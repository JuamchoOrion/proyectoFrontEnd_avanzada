import { Component, OnInit } from '@angular/core';
import { SidebarProfileComponent } from '../../components/sidebar-profile/sidebar-profile';
import { ReservationSection } from '../../components/reservation-section/reservation-section';
import { Notifications } from '../../components/notifications/notifications';
import { Footer } from '../../components/footer/footer';
import { ReservationService } from '../../services/reservation.services';
import { AccommodationService } from '../../services/accommodation.services';
import { ReservationDTO } from '../../models/reservation-dto';
import { ReservationFilterComponent } from '../../components/reservation-filter/reservations-filter';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    SidebarProfileComponent,
    ReservationFilterComponent,
    ReservationSection,
    Notifications,
    Footer,
    CommonModule,
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile implements OnInit {
  reservas: ReservationDTO[] = [];
  notificaciones: any[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 4;
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
  loadReservations(page: number = 0) {
    this.reservationService.getUserReservations(page, this.pageSize).subscribe({
      next: (res) => {
        this.totalPages = res.totalPages;
        this.currentPage = res.page;

        this.mapearReservas(res.content);
      },
      error: (err) => console.error('❌ Error al cargar reservas:', err),
    });
  }

  /** ===================================================
   *  🔹 Filtros enviados desde <app-reservations-filter>
   *  =================================================== */
  aplicarFiltros(filtros: any, page: number = 0) {
    this.reservationService.getUserReservationsFiltered(filtros, page, this.pageSize).subscribe({
      next: (res) => {
        this.totalPages = res.totalPages;
        this.currentPage = res.page;

        this.mapearReservas(res.content);
      },
      error: (err) => console.error('❌ Error al aplicar filtros:', err),
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
          error: () => (reserva.imagen = 'assets/default.jpg'),
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
          mensaje: `La reserva #${id} fue cancelada correctamente`,
        });

        // Actualizar la lista después de cancelar
        this.loadReservations();
      },
      error: (err) => {
        this.notificaciones.push({
          tipo: 'error',
          mensaje: err.error?.message || 'Error al cancelar la reserva',
        });
      },
    });
  }

  onLimpiarNotificaciones() {
    this.notificaciones = [];
  }
}
