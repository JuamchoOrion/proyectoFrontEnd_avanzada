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

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private apiUrl = 'http://localhost:9090/api/accommodations';

  constructor(private http: HttpClient) {}
  /**
  getDestinations(page = 0, size = 10): Observable<DestinationDTO[]> {
    return this.http
      .get<ApiResponse<AccommodationDTO>>(`${this.apiUrl}?page=${page}&size=${size}`)
      .pipe(
        map((response) => {
          const page = response.content as PageResponse<AccommodationDTO>;
          //const list = page.content;
          const list = Array.isArray(page.content) ? page.content : (page as any).content || [];
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
  }*/
  getDestinations(page = 0, size = 10): Observable<DestinationDTO[]> {
    return this.http
      .get<ApiResponse<PageResponse<AccommodationDTO>>>(`${this.apiUrl}?page=${page}&size=${size}`)
      .pipe(
        map((response) => {
          const pageData = response.content as PageResponse<AccommodationDTO>;
          // ✅ El verdadero arreglo está dentro de pageData.content
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

  getAccommodationById(id: string | number): Observable<AccommodationDTO> {
    return this.http
      .get<{ error: boolean; content: AccommodationDTO }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.content)); // ✅ solo devolvemos el objeto dentro de content
  }

  createAccommodation(dto: CreateAccommodationDTO): Observable<AccommodationDTO> {
    const formData = new FormData();

    formData.append('title', dto.title);
    formData.append('description', dto.description);
    formData.append('city', dto.city);
    formData.append('address', dto.address);
    formData.append('latitude', dto.latitude?.toString() || '');
    formData.append('longitude', dto.longitude?.toString() || '');
    formData.append('pricePerNight', dto.pricePerNight.toString());
    formData.append('maxCapacity', dto.maxCapacity.toString());

    dto.services.forEach((service) => formData.append('services', service));
    dto.images.forEach((file) => formData.append('images', file));

    return this.http.post<AccommodationDTO>(`${this.apiUrl}`, formData);
  }
  getHostProfile(
    id: string
  ): Observable<{ id: string; name: string; email: string; photoUrl?: string }> {
    return this.http
      .get<{
        error: boolean;
        data: { id: string; name: string; email: string; photoUrl?: string };
      }>(`http://localhost:9090/users/${id}`)
      .pipe(
        map((response) => response.data) // <-- extrae solo el campo "data"
      );
  }
}
