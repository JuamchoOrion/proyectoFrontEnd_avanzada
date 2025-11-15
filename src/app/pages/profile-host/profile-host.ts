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
import { EditAccommodationFormComponent } from '../../components/edit-accommodation-form/edit-accommodation-form';
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
    EditAccommodationFormComponent
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
  deletingId: string | number | null = null; // Para spinner en botón


  ngOnInit() {
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

  loadAccommodations(hostId: string | number) {
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

  /** Confirmar antes de eliminar */
  confirmDelete(accId: string | number) {
    if (confirm('¿Estás seguro de eliminar este alojamiento?')) {
      this.onDeleteAccommodation(accId);
    }
  }

  /** Eliminar alojamiento (soft delete) */
  onDeleteAccommodation(accId: string | number) {
    if (!this.currentUser?.id) return;

    this.deletingId = accId;

    this.hostService.deleteAccommodation(String(this.currentUser.id), accId).subscribe({
      next: () => {
        this.accommodations = this.accommodations.filter((a) => a.id !== accId);
        console.log('✅ Alojamiento eliminado correctamente:', accId);
        this.notificaciones.push({
          tipo: 'success',
          mensaje: `Alojamiento #${accId} eliminado correctamente`,
        });
        this.deletingId = null;
      },
      error: (err) => {
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

