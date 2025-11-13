import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes reutilizados
import { Navbar } from '../../components/navbar/navbar';
import { SidebarHostComponent } from '../../components/sidebar-host/sidebar-host';
import { DestinationsSection } from '../../components/destination-section/destination-section';
import { ReservationSection } from '../../components/reservation-section/reservation-section';

// Modelos y servicios
import { DestinationDTO } from '../../models/destination-dto';
import { AccommodationService } from '../../services/accommodation.services';
import { ReservationService } from '../../services/reservation.services';

@Component({
  selector: 'app-profile-host',
  standalone: true,
  imports: [CommonModule, Navbar, SidebarHostComponent, DestinationsSection, ReservationSection],
  templateUrl: './profile-host.html',
  styleUrls: ['./profile-host.css'],
})
export class ProfileHost implements OnInit {
  destinos: DestinationDTO[] = [];
  reservas: any[] = [];
  loadingDestinos = true;
  loadingReservas = true;

  constructor(
    private accommodationService: AccommodationService,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.cargarDestinos();
    this.cargarReservas();
  }

  // 🔹 Cargar alojamientos del anfitrión (usando tu servicio actualizado)
  cargarDestinos() {
    this.accommodationService.getDestinations().subscribe({
      next: (data) => {
        this.destinos = data;
        this.loadingDestinos = false;
      },
      error: (err) => {
        console.error('Error cargando destinos:', err);
        this.loadingDestinos = false;
      },
    });
  }

  // 🔹 Cargar reservas (usando tu ReservationService)
  cargarReservas() {
    this.reservationService.getUserReservations().subscribe({
      next: (data) => {
        this.reservas = data;
        this.loadingReservas = false;
      },
      error: (err) => {
        console.error('Error cargando reservas:', err);
        this.loadingReservas = false;
      },
    });
  }

  // 🔹 Cancelar una reserva
  onCancelarReserva(idReserva: string | number) {
    this.reservationService.cancelReservation(Number(idReserva)).subscribe({
      next: () => {
        this.reservas = this.reservas.filter((r) => r.id !== idReserva);
      },
      error: (err) => console.error('Error cancelando reserva:', err),
    });
  }
}
