import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ReviewDTO } from '../models/review-dto';

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

interface ApiResponse<T> {
  error: boolean;
  content: PageResponse<T>;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:9090/api/reviews';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las reseñas asociadas a un alojamiento específico.
   * El backend devuelve un objeto con error y content (que es una Page).
   */
  getReviewsByAccommodation(
    accommodationId: string | number,
    page = 0,
    size = 10
  ): Observable<ReviewDTO[]> {
    return this.http
      .get<ApiResponse<ReviewDTO>>(
        `${this.apiUrl}/accommodation/${accommodationId}?page=${page}&size=${size}`
      )
      .pipe(
        map((response) => {
          const pageContent = response.content; // objeto Page
          return pageContent.content; // lista de ReviewDTO
        })
      );
  }
}
