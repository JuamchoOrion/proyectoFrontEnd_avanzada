import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private apiUrl = 'http://localhost:9090/api/reservations';

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  cancelReservation(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, {});
  }

  getByHost(hostId: number): Observable<any> {
    return this.http.get(`http://localhost:9090/api/hosts/${hostId}/reservations`);
  }
=======
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
      .get<{ error: boolean; content: { content: ReservationDTO[] } }>(`${this.apiUrl}`, {
        withCredentials: true,
      })
      .pipe(map((res) => res.content.content)); // ✅ accede al array real
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
      return this.http.get<ReservationDTO>(`${this.apiUrl}/${id}`);
    }
  
    /** 🔹 Cancelar una reserva */
    cancelReservation(id: number): Observable<ReservationDTO> {
      return this.http.patch<ReservationDTO>(`${this.apiUrl}/${id}/cancel`, {});
    }
>>>>>>> origin/master
}
