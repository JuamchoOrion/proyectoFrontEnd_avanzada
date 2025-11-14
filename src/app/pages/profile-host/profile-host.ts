import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarHostComponent } from '../../components/sidebar-host/sidebar-host';
import { Footer } from '../../components/footer/footer';
import { Notifications } from '../../components/notifications/notifications';
import { DestinationCard } from '../../components/destination-card/destination-card';
import { AccommodationFilterComponent } from '../../components/accommodation-filter/accommodation-filter';
import { HostService } from '../../services/host-profile.services';
import { Accommodation } from '../../models/accommodation';
import { UserProfileDTO } from '../../models/user-dto';
import { ReservationDTO } from '../../models/reservation-dto';
import { RouterModule } from '@angular/router';
import { ReservationCard } from '../../components/reservation-card/reservation-card';
import { ReservationSection } from '../../components/reservation-section/reservation-section';
import { AccommodationService } from '../../services/accommodation.services';
import { AccommodationDTO } from '../../models/accommodation-dto';
@Component({
  selector: 'app-profile-host',
  standalone: true,
  imports: [
    CommonModule,
    SidebarHostComponent,
    Footer,
    Notifications,
    DestinationCard,
    AccommodationFilterComponent,
    ReservationCard,
    ReservationSection,
    RouterModule,
  ],
  templateUrl: './profile-host.html',
  styleUrls: ['./profile-host.css'],
})
export class ProfileHost implements OnInit {
  accommodations: AccommodationDTO[] = [];
  notificaciones: any[] = [];
  currentUser: UserProfileDTO | null = null;
  reservations: ReservationDTO[] = [];

  constructor(
    private hostService: HostService,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit() {
    console.log('🔹 Iniciando carga de perfil del host...');

    // 🔹 Obtener datos completos del host logeado
    this.hostService.getCurrentHostProfile().subscribe({
      next: (hostData) => {
        console.log('🟢 Respuesta recibida del endpoint /me:', hostData);

        if (!hostData) {
          console.warn('⚠️ HostData es null o indefinido');
          this.notificaciones.push({
            tipo: 'error',
            mensaje: 'No se recibió información del host',
          });
          return;
        }

        if (!hostData.id) {
          console.warn('⚠️ HostData.id no existe:', hostData);
          this.notificaciones.push({
            tipo: 'error',
            mensaje: 'El perfil del host no tiene ID válido',
          });
          return;
        }

        this.currentUser = hostData;
        console.log('✅ Perfil del host asignado a currentUser:', this.currentUser);

        // 🔹 Cargar alojamientos del host
        this.loadAccommodations(hostData.id);
        this.loadReservations(hostData.id);
      },
      error: (err) => {
        console.error('❌ Error al cargar perfil del host:', err);
        this.notificaciones.push({
          tipo: 'error',
          mensaje: 'No se pudo cargar el perfil del host',
        });
      },
    });
  }

  /** Cargar alojamientos del host */
  loadAccommodations(hostId: string | number) {
    console.log('🔹 Cargando alojamientos para hostId:', hostId);

    this.hostService.getHostAccommodations(String(hostId)).subscribe({
      next: (res) => {
        console.log('🟢 Alojamientos recibidos:', res);
        this.accommodations = res || [];
        if (!res || res.length === 0) {
          this.notificaciones.push({
            tipo: 'info',
            mensaje: 'No tienes alojamientos registrados',
          });
        }
      },
      error: (err) => {
        console.error('❌ Error al cargar alojamientos:', err);
        this.notificaciones.push({
          tipo: 'error',
          mensaje: 'No se pudieron cargar los alojamientos',
        });
      },
    });
  }
  loadReservations(hostId: string | number) {
    console.log('🔹 Cargando reservas recibidas para hostId:', hostId);

    this.hostService.getHostReservations(String(hostId)).subscribe({
      next: (res) => {
        console.log('🟢 Reservas recibidas:', res);
        this.mapearReservas(res);
        if (!res || res.length === 0) {
          this.notificaciones.push({
            tipo: 'info',
            mensaje: 'No tienes reservas recibidas aún',
          });
        }
      },
      error: (err) => {
        console.error('❌ Error al cargar reservas:', err);
        this.notificaciones.push({
          tipo: 'error',
          mensaje: 'No se pudieron cargar las reservas',
        });
      },
    });
  }
  /** Filtrar alojamientos */
  aplicarFiltros(filtros: any) {
    console.log('Filtros aplicados:', filtros);
  }

  /** Eliminar alojamiento */
  onDeleteAccommodation(accId: string | number) {
    if (!this.currentUser?.id) return;

    console.log('🔹 Eliminando alojamiento:', accId);

    this.hostService.deleteAccommodation(String(this.currentUser.id), accId).subscribe({
      next: () => {
        this.accommodations = this.accommodations.filter((a) => a.id !== accId);
        console.log('✅ Alojamiento eliminado correctamente:', accId);
        this.notificaciones.push({
          tipo: 'success',
          mensaje: `Alojamiento #${accId} eliminado correctamente`,
        });
      },
      error: (err) => {
        console.error('❌ Error al eliminar alojamiento:', err);
        this.notificaciones.push({
          tipo: 'error',
          mensaje: err.error?.message || 'Error al eliminar alojamiento',
        });
      },
    });
  }

  /** Limpiar notificaciones */
  onLimpiarNotificaciones() {
    this.notificaciones = [];
  }
  onCancelarReserva(reservaId: string | number) {}
  private mapearReservas(res: ReservationDTO[]) {
    this.reservations = res.map((r) => ({
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

    // Obtener la imagen del alojamiento
    this.reservations.forEach((reserva) => {
      if (reserva.accommodationId) {
        this.accommodationService.getAccommodationById(reserva.accommodationId).subscribe({
          next: (acc) => {
            reserva.imagen = acc.mainImage || acc.images?.[0] || 'assets/default.jpg';
          },
          error: () => (reserva.imagen = 'assets/default.jpg'),
        });
      } else {
        reserva.imagen = 'assets/default.jpg';
      }
    });
  }
}
