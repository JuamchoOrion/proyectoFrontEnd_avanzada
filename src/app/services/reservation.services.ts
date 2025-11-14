import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ReservationDTO } from '../models/reservation-dto';
import { CreateReservationDTO } from '../models/create-reservation-dto';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:9090/reservations';

  constructor(private http: HttpClient) {}

  /** ✅ Obtener reservas del usuario autenticado */
  getUserReservations(): Observable<ReservationDTO[]> {
    return this.http
      .get<{ error: boolean; content: any }>(this.apiUrl, {
        withCredentials: true,
      })
      .pipe(
        map((res) => res.content?.content ?? []) // <-- seguro
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
}
