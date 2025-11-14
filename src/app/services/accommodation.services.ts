import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DestinationDTO } from '../models/destination-dto';
import { AccommodationDTO } from '../models/accommodation-dto';
import { CreateAccommodationDTO } from '../models/create-accommodation-dto';

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
export interface ApiResponsePage<T> {
  error: boolean;
  content: {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
  };
}

export interface DestinationsPage {
  content: DestinationDTO[];
  totalPages: number;
  page: number;
}
@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private apiUrl = 'http://localhost:9090/api/accommodations';

  constructor(private http: HttpClient) {}
  getDestinations(page = 0, size = 10): Observable<DestinationsPage> {
    return this.http
      .get<ApiResponsePage<AccommodationDTO>>(`${this.apiUrl}?page=${page}&size=${size}`)
      .pipe(
        map((response) => {
          const pageData = response.content; // Page<AccommodationDTO>
          const list = pageData.content; // Items reales

          const destinations: DestinationDTO[] = list
            .filter((a) => a.status === 'ACTIVE')
            .map((a) => ({
              id: a.id,
              city: a.city,
              description: a.description,
              price: a.pricePerNight,
              image: a.mainImage?.startsWith('http')
                ? a.mainImage
                : a.images?.[0]?.startsWith('http')
                ? a.images[0]
                : 'assets/default.jpg',
              images: a.images,
              location: {
                latitude: a.latitude,
                longitude: a.longitude,
              },
            }));

          return {
            content: destinations,
            totalPages: pageData.totalPages,
            page: pageData.number,
          };
        })
      );
  }

  // ============================================================
  // 🔹 2️⃣ Obtener alojamiento por ID
  // ============================================================
  getAccommodationById(id: string | number): Observable<AccommodationDTO> {
    return this.http
      .get<{ error: boolean; content: AccommodationDTO }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.content));
  }

  // ============================================================
  // 🔹 3️⃣ Crear alojamiento (con imágenes y validaciones)
  // ============================================================
  createAccommodation(formData: FormData): Observable<AccommodationDTO> {
    return this.http.post<AccommodationDTO>(`${this.apiUrl}`, formData);
  }

  // ============================================================
  // 🔹 4️⃣ Obtener perfil del anfitrión
  // ============================================================
  getHostProfile(
    id: string
  ): Observable<{ id: string; name: string; email: string; photoUrl?: string }> {
    return this.http
      .get<{
        error: boolean;
        data: { id: string; name: string; email: string; photoUrl?: string };
      }>(`http://localhost:9090/users/${id}`)
      .pipe(map((response) => response.data));
  }
  searchDestinations(filters: any, page = 0, size = 10): Observable<DestinationDTO[]> {
    const params: string[] = [];

    if (filters.city) params.push(`city=${encodeURIComponent(filters.city)}`);
    if (filters.checkIn) params.push(`checkIn=${encodeURIComponent(filters.checkIn)}`);
    if (filters.checkOut) params.push(`checkOut=${encodeURIComponent(filters.checkOut)}`);
    if (filters.maxPrice) params.push(`maxPrice=${filters.maxPrice}`);
    if (filters.services) params.push(`services=${filters.services}`);

    const query = params.length ? `?${params.join('&')}` : '';

    return this.http
      .get<ApiResponse<PageResponse<AccommodationDTO>>>(
        `${this.apiUrl}${query}&page=${page}&size=${size}`
      )
      .pipe(
        map((response) => {
          const pageData = response.content as PageResponse<AccommodationDTO>;
          const list: AccommodationDTO[] = Array.isArray(pageData.content)
            ? pageData.content
            : (pageData as any).content || [];

          return list
            .filter((a) => a.status === 'ACTIVE')
            .map((a) => ({
              id: a.id,
              city: a.city,
              description: a.description,
              price: a.pricePerNight,
              image: a.mainImage || a.images?.[0] || 'assets/default.jpg',
              images: a.images,
              location: {
                latitude: a.latitude,
                longitude: a.longitude,
              },
            }));
        })
      );
  }
}
