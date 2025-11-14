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

@Component({
  selector: 'app-profile-host',
  standalone: true,
  imports: [
    CommonModule,
    SidebarHostComponent,
    Footer,
    Notifications,
    DestinationCard,
    AccommodationFilterComponent
  ],
  templateUrl: './profile-host.html',
  styleUrls: ['./profile-host.css'],
})
export class ProfileHost implements OnInit {

  accommodations: Accommodation[] = [];
  notificaciones: any[] = [];
  currentUser: UserProfileDTO | null = null;

  constructor(private hostService: HostService) {}

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
            mensaje: 'No se recibió información del host'
          });
          return;
        }

        if (!hostData.id) {
          console.warn('⚠️ HostData.id no existe:', hostData);
          this.notificaciones.push({
            tipo: 'error',
            mensaje: 'El perfil del host no tiene ID válido'
          });
          return;
        }

        this.currentUser = hostData;
        console.log('✅ Perfil del host asignado a currentUser:', this.currentUser);

        // 🔹 Cargar alojamientos del host
        this.loadAccommodations(hostData.id);
      },
      error: (err) => {
        console.error('❌ Error al cargar perfil del host:', err);
        this.notificaciones.push({
          tipo: 'error',
          mensaje: 'No se pudo cargar el perfil del host'
        });
      }
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
            mensaje: 'No tienes alojamientos registrados'
          });
        }
      },
      error: (err) => {
        console.error('❌ Error al cargar alojamientos:', err);
        this.notificaciones.push({
          tipo: 'error',
          mensaje: 'No se pudieron cargar los alojamientos'
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
        this.accommodations = this.accommodations.filter(a => a.id !== accId);
        console.log('✅ Alojamiento eliminado correctamente:', accId);
        this.notificaciones.push({
          tipo: 'success',
          mensaje: `Alojamiento #${accId} eliminado correctamente`
        });
      },
      error: (err) => {
        console.error('❌ Error al eliminar alojamiento:', err);
        this.notificaciones.push({
          tipo: 'error',
          mensaje: err.error?.message || 'Error al eliminar alojamiento'
        });
      }
    });
  }

  /** Limpiar notificaciones */
  onLimpiarNotificaciones() {
    this.notificaciones = [];
  }

}
