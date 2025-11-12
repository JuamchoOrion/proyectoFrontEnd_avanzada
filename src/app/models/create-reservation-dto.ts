export interface CreateReservationDTO {
  accommodationId: number;
  checkIn: string;   // formato ISO "YYYY-MM-DDTHH:mm:ss"
  checkOut: string;
  guests: number;
}