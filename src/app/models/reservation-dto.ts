export interface ReservationDTO {
  id: number;
  accommodationId: number;
  guestId: string;
  checkIn: string; // o Date si prefieres parsearlo
  checkOut: string;
  guestsNumber: number;
  totalPrice: number;
  reservationStatus: 'CONFIRMADA' | 'PENDIENTE' | 'CANCELADA';
}
