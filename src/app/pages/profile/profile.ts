import { Component, OnInit } from '@angular/core';
import { SidebarProfileComponent } from '../../components/sidebar-profile/sidebar-profile';
import { ReservationSection } from '../../components/reservation-section/reservation-section';
import { Notifications } from '../../components/notifications/notifications';
import { Footer } from '../../components/footer/footer';
import { ReservationService } from '../../services/reservation.services';
import { AccommodationService } from '../../services/accommodation.services';
import { ReservationDTO } from '../../models/reservation-dto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarProfileComponent, ReservationSection, Notifications, Footer],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile implements OnInit {
  reservas: ReservationDTO[] = [];
  accommodation: any;
  notificaciones: any[] = [];

  constructor(
    private reservationService: ReservationService,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit() {
    this.loadReservations();
  }

  /** 🔹 Cargar reservas reales desde el backend */
  loadReservations() {
    this.reservationService.getUserReservations().subscribe({
      next: (res) => {
        // 🔹 Mapea las reservas con datos base
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
              : 'Cancelada',
          imagen: '', // ← se llenará luego con la del alojamiento real
        }));

        // 🔹 Por cada reserva, trae la imagen real del alojamiento
        this.reservas.forEach((reserva) => {
          const alojamientoId = reserva.accommodationId;
          if (alojamientoId) {
            this.accommodationService.getAccommodationById(alojamientoId).subscribe({
              next: (alojamiento) => {
                reserva.imagen =
                  alojamiento.mainImage || alojamiento.images?.[0] || 'assets/default.jpg';
              },
              error: (err) => {
                console.warn(
                  `⚠️ No se pudo cargar la imagen del alojamiento ${alojamientoId}`,
                  err
                );
                reserva.imagen = 'assets/default.jpg';
              },
            });
          } else {
            reserva.imagen = 'assets/default.jpg';
          }
        });

        console.log('🟢 Reservas cargadas:', this.reservas);
      },
      error: (err) => {
        console.error('❌ Error al cargar reservas:', err);
      },
    });
  }

  onCancelarReserva(id: string) {
    console.log('Cancelar reserva con id:', id);
  }

  onLimpiarNotificaciones() {
    this.notificaciones = [];
  }
}
