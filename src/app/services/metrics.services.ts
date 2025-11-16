import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MetricsDTO } from '../models/metrics-dto';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private apiUrl =
    'https://proyectofinal-programacion-avanzada-production-5ceb.up.railway.app/api/reviews/accommodation';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las métricas de un alojamiento filtradas por fechas opcionales.
   * @param accommodationId ID del alojamiento
   * @param fromDate Fecha inicial (opcional)
   * @param toDate Fecha final (opcional)
   */
  getMetrics(accommodationId: string, fromDate?: string, toDate?: string): Observable<MetricsDTO> {
    let params = new HttpParams();
    if (fromDate) params = params.set('fromDate', fromDate);
    if (toDate) params = params.set('toDate', toDate);

    return this.http
      .get<{ error: boolean; content: MetricsDTO }>(`${this.apiUrl}/${accommodationId}`, {
        params,
      })
      .pipe(map((res) => res.content));
  }
}
