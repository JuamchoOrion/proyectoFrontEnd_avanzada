import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Accommodation } from '../models/accommodation';
import { UserProfileDTO } from '../models/user-dto';
import { ReservationDTO } from '../models/reservation-dto';
import { AccommodationDTO } from '../models/accommodation-dto';
@Injectable({
  providedIn: 'root',
})
export class HostService {
  private apiUrl = 'https://proyectofinal-programacion-avanzada-production.up.railway.app/api/hosts';

  constructor(private http: HttpClient) {}

  /** Obtener datos del host logeado */
  getCurrentHostProfile(): Observable<UserProfileDTO> {
    return this.http
      .get<{ error: boolean; content: UserProfileDTO; message: string }>(`${this.apiUrl}/me`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          console.log('🟣 RAW RESPONSE /me:', res);
          if (res.error || !res.content) {
            throw new Error(res.message || 'Error obteniendo host');
          }
          return res.content;
        })
      );
  }

  /** Obtener alojamientos del host */
  getHostAccommodations(hostId: string | number): Observable<AccommodationDTO[]> {
    return this.http
      .get<{ error: boolean; content: AccommodationDTO[]; message: string }>(
        `${this.apiUrl}/${String(hostId)}/accommodations`,
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          console.log('🟣 RAW RESPONSE /accommodations:', res);
          return res.content || [];
        })
      );
  }

  /** Eliminar alojamiento */
  deleteAccommodation(hostId: string | number, accommodationId: string | number) {
    return this.http.delete(
      `${this.apiUrl}/${String(hostId)}/accommodations/${String(accommodationId)}`,
      { withCredentials: true }
    );
  }

  /** Obtener host por ID */
  getHostById(hostId: string | number): Observable<UserProfileDTO> {
    return this.http
      .get<{ error: boolean; content: UserProfileDTO; message: string }>(
        `${this.apiUrl}/${String(hostId)}`,
        { withCredentials: true }
      )
      .pipe(map((res) => res.content));
  }
  getHostReservations(hostId: string): Observable<ReservationDTO[]> {
    return this.http
      .get<{ error: boolean; content: ReservationDTO[] }>(
        `https://proyectofinal-programacion-avanzada-production.up.railway.app/api/hosts/${hostId}/reservations`,
        { withCredentials: true }
      )
      .pipe(map((res) => res.content));
  }
}
