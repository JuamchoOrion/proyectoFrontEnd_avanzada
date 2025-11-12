import { Component, OnInit } from '@angular/core';
import { SidebarProfileComponent } from '../../components/sidebar-profile/sidebar-profile';
import { ReservationSection } from '../../components/reservation-section/reservation-section';
import { Notifications } from '../../components/notifications/notifications';
import { Footer } from '../../components/footer/footer';
import { ReservationService } from '../../services/reservation.services.ts';
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
  notificaciones: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadReservations();
  }

  /** 🔹 Cargar reservas reales desde el backend */
  loadReservations() {
    this.reservationService.getUserReservations().subscribe({
      next: (res) => {
        this.reservas = res.map((r) => ({
          ...r,
          // 🔸 Mapeo adicional si tus componentes esperan otros nombres
          titulo: `Reserva #${r.id}`,
          imagen: `https://picsum.photos/600/300?random=${r.id}`,
          checkin: r.checkIn.split('T')[0],
          checkout: r.checkOut.split('T')[0],
          estado:
            r.reservationStatus === 'CONFIRMADA'
              ? 'Confirmada'
              : r.reservationStatus === 'PENDIENTE'
              ? 'Pendiente'
              : 'Cancelada',
        }));
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
