import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ReservationDTO } from '../models/reservation-dto';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:9090/reservations';

  constructor(private http: HttpClient) {}

  /** ✅ Obtener reservas del usuario autenticado */
  getUserReservations(): Observable<ReservationDTO[]> {
    return this.http
      .get<{ error: boolean; content: { content: ReservationDTO[] } }>(`${this.apiUrl}`, {
        withCredentials: true,
      })
      .pipe(map((res) => res.content.content)); // ✅ accede al array real
  }
}
