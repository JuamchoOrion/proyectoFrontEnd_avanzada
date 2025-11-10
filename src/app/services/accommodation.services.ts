import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DestinationDTO } from '../models/destination-dto';
import { AccommodationDTO } from '../models/accommodation-dto';

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

interface ApiResponse<T> {
  error: boolean;
  content: PageResponse<T> | T;
}

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private apiUrl = 'http://localhost:9090/api/accommodations';

  constructor(private http: HttpClient) {}

  // ✅ Obtener todos los alojamientos (para la landing)
  getDestinations(page = 0, size = 10): Observable<DestinationDTO[]> {
    return this.http
      .get<ApiResponse<AccommodationDTO>>(`${this.apiUrl}?page=${page}&size=${size}`)
      .pipe(
        map((response) => {
          const page = response.content as PageResponse<AccommodationDTO>;
          const list = page.content;

          return list
            .filter((a) => a.status === 'ACTIVE')
            .map((a) => ({
              id: a.id,
              city: a.city,
              description: a.description,
              price: a.pricePerNight,
              image: a.mainImage || a.images?.[0] || 'assets/default.jpg',
            }));
        })
      );
  }

  getAccommodationById(id: string | number): Observable<AccommodationDTO> {
    return this.http
      .get<{ error: boolean; content: AccommodationDTO }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.content)); // ✅ solo devolvemos el objeto dentro de content
  }
}
