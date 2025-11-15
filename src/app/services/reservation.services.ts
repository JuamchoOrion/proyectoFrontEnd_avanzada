import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ReservationDTO } from '../models/reservation-dto';
import { CreateReservationDTO } from '../models/create-reservation-dto';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'https://proyectofinal-programacion-avanzada-production.up.railway.app/reservations';

  constructor(private http: HttpClient) {}

  /** ✅ Obtener reservas iniciales (sin filtros) */
  getUserReservations(
    page = 0,
    size = 5
  ): Observable<{
    content: ReservationDTO[];
    totalPages: number;
    page: number;
  }> {
    return this.http
      .get<{ error: boolean; content: any }>(`${this.apiUrl}?page=${page}&size=${size}`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          const pageData = res.content;

          return {
            content: pageData.content,
            totalPages: pageData.totalPages,
            page: pageData.number,
          };
        })
      );
  }

  /** 🔹 Crear una nueva reserva */
  createReservation(dto: CreateReservationDTO): Observable<ReservationDTO> {
    return this.http.post<ReservationDTO>(this.apiUrl, dto);
  }

  /** 🔹 Obtener reservas del usuario actual */
  getReservations(): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(this.apiUrl);
  }

  /** 🔹 Obtener reserva por ID */
  getReservationById(id: number): Observable<ReservationDTO> {
    return this.http
      .get<{ error: boolean; content: ReservationDTO }>(`${this.apiUrl}/${id}`)
      .pipe(map((res) => res.content));
  }

  /** 🔹 Cancelar una reserva */
  cancelReservation(id: number): Observable<ReservationDTO> {
    return this.http.patch<ReservationDTO>(`${this.apiUrl}/${id}/cancel`, {});
  }

  /** 🔍 Obtener reservas con filtros dinámicos */
  getUserReservationsFiltered(
    filtros: any,
    page = 0,
    size = 5
  ): Observable<{
    content: ReservationDTO[];
    totalPages: number;
    page: number;
  }> {
    let params = new HttpParams().set('page', page).set('size', size);

    Object.keys(filtros || {}).forEach((key) => {
      if (filtros[key]) params = params.set(key, filtros[key]);
    });

    return this.http
      .get<{ error: boolean; content: any }>(this.apiUrl, {
        params,
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          const p = res.content;
          return {
            content: p.content,
            totalPages: p.totalPages,
            page: p.number,
          };
        })
      );
  }
}
