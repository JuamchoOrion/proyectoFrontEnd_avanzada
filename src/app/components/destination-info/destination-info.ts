import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destination-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-info.html',
  styleUrls: ['./destination-info.css'],
})
export class DestinationInfo {
  @Input() destination: any;

  constructor(private router: Router) {}

  /** 🔹 Ir a la página de reserva */
  goToReservation() {
    if (this.destination?.id) {
      this.router.navigate([`/accommodation/${this.destination.id}/reserve`]);
    } else {
      alert('❌ No se pudo identificar el alojamiento.');
    }
  }
}