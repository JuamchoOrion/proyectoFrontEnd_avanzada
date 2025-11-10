import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-table.html',
  styleUrls: ['./reservation-table.css']
})
export class ReservationTableComponent {
  @Input() reservations: any[] = []; // Array de reservas: { user, checkIn, checkOut, status }

  getBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completada':
        return 'bg-success';
      case 'pendiente':
        return 'bg-warning text-dark';
      case 'cancelada':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}
