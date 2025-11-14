export interface MetricsDTO {
  accommodationId: number;
  accommodationTitle: string;
  totalReservations: number;
  completedReservations: number;
  canceledReservations: number;
  averageRating: number;
  totalReviews: number;
  fromDate: string;
  toDate: string;
}