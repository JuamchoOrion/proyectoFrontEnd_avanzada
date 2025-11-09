import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ReservationSection } from '../../components/reservation-section/reservation-section';
import { Notifications } from '../../components/notifications/notifications';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [Sidebar, ReservationSection, Notifications, Navbar, Footer],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile {
  reservas: any[] = []; // se llenará con un servicio HTTP
  notificaciones: any[] = []; // se llenará con un servicio HTTP

  ngOnInit() {
    // 🔥 Datos de prueba (solo para ver el diseño)
    this.reservas = [
      {
        id: '1',
        titulo: 'Cartagena - Apartamento frente al mar',
        imagen: 'https://picsum.photos/600/300?random=1',
        checkin: '2025-09-10',
        checkout: '2025-09-15',
        estado: 'Confirmada',
      },
      {
        id: '2',
        titulo: 'Medellín - Loft moderno',
        imagen: 'https://picsum.photos/600/300?random=2',
        checkin: '2025-09-20',
        checkout: '2025-09-22',
        estado: 'Pendiente',
      },
      {
        id: '3',
        titulo: 'Bogotá - Habitación en Candelaria',
        imagen: 'https://picsum.photos/600/300?random=3',
        checkin: '2025-08-25',
        checkout: '2025-08-27',
        estado: 'Cancelada',
      },
    ];

    this.notificaciones = [
      {
        titulo: 'Nueva reserva confirmada',
        mensaje: 'Tu reserva en "Hotel Mar Azul" fue confirmada.',
        tiempo: 'Hace 2 horas',
      },
      {
        titulo: 'Mensaje de un anfitrión',
        mensaje: 'El anfitrión respondió a tu solicitud.',
        tiempo: 'Hace 5 horas',
      },
    ];
  }
  onCancelarReserva(id: string) {
    console.log('Cancelar reserva con id:', id);
  }

  onLimpiarNotificaciones() {
    this.notificaciones = [];
  }
}
