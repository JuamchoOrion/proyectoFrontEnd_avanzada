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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-host',
  standalone: true,
  imports: [
    CommonModule,
    SidebarHostComponent,
    RouterModule,
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

  deletingId: string | number | null = null; // Para spinner en botón

  constructor(private hostService: HostService) {}

  ngOnInit() {
    this.hostService.getCurrentHostProfile().subscribe({
      next: (hostData) => {
        if (!hostData?.id) {
          this.notificaciones.push({ tipo: 'error', mensaje: 'Perfil inválido' });
          return;
        }
        this.currentUser = hostData;
        this.loadAccommodations(hostData.id);
      },
      error: () => this.notificaciones.push({ tipo: 'error', mensaje: 'Error al cargar perfil' })
    });
  }

  loadAccommodations(hostId: string | number) {
    this.hostService.getHostAccommodations(String(hostId)).subscribe({
      next: (res) => this.accommodations = res || [],
      error: () => this.notificaciones.push({ tipo: 'error', mensaje: 'Error al cargar alojamientos' })
    });
  }

  aplicarFiltros(filtros: any) { console.log('Filtros:', filtros); }

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
        this.accommodations = this.accommodations.filter(a => a.id !== accId);
        this.notificaciones.push({
          tipo: 'success',
          mensaje: `Alojamiento #${accId} eliminado correctamente`
        });
        this.deletingId = null;
      },
      error: (err) => {
        this.notificaciones.push({
          tipo: 'error',
          mensaje: err.error?.message || 'Error al eliminar alojamiento'
        });
        this.deletingId = null;
      }
    });
  }

  onLimpiarNotificaciones() { this.notificaciones = []; }
}
