import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-summary.html',
  styleUrls: ['./reservation-summary.css'],
})
export class ReservationSummary {
  @Input() accommodation: any = null;
  @Input() reservation: any = null;

  get nights(): number {
    if (!this.reservation?.checkIn || !this.reservation?.checkOut) return 0;
    const inDate = new Date(this.reservation.checkIn);
    const outDate = new Date(this.reservation.checkOut);
    const diff = (outDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24);
    return diff > 0 ? diff : 0;
  }

  get total(): number {
    if (!this.accommodation || this.nights === 0) return 0;
    return this.accommodation.pricePerNight * this.nights;
  }
}
