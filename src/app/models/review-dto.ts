export interface ReviewDTO {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  createdAt: string; // ← CORREGIDO
  reply: string;
  accommodationId: number;
}
