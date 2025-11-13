import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ReservationDTO } from '../models/reservation-dto';
import { CreateReservationDTO } from '../models/create-reservation-dto';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:9090/reservations';

  constructor(private http: HttpClient) {}

  /** ✅ Obtener reservas iniciales (sin filtros) */
  getUserReservations(): Observable<ReservationDTO[]> {
    return this.http
      .get<{ error: boolean; content: { content: ReservationDTO[] } }>(`${this.apiUrl}`, {
        withCredentials: true,
      })
      .pipe(map((res) => res.content.content));
  }

  /** 🔍 Obtener reservas con filtros dinámicos */
  getUserReservationsFiltered(params?: any): Observable<ReservationDTO[]> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http
      .get<{ error: boolean; content: { content: ReservationDTO[] } }>(this.apiUrl, {
        params: httpParams,
        withCredentials: true,
      })
      .pipe(map((res) => res.content.content));
  }

  /** 🟦 Crear una nueva reserva */
  createReservation(dto: CreateReservationDTO): Observable<ReservationDTO> {
    return this.http.post<ReservationDTO>(this.apiUrl, dto, { withCredentials: true });
  }

  /** 📌 Obtener reserva por ID */
  getReservationById(id: number): Observable<ReservationDTO> {
    return this.http.get<ReservationDTO>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  /** ❌ Cancelar una reserva */
  cancelReservation(id: number): Observable<ReservationDTO> {
    return this.http.patch<ReservationDTO>(`${this.apiUrl}/${id}/cancel`, {}, {
      withCredentials: true,
    });
  }
}