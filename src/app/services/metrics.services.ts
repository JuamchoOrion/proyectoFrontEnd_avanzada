import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetricsDTO } from '../models/metrics-dto';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private apiUrl = 'https://proyectofinal-programacion-avanzada-production.up.railway.app/accommodation';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las métricas de un alojamiento filtradas por fechas opcionales.
   * @param accommodationId ID del alojamiento
   * @param fromDate Fecha inicial (opcional)
   * @param toDate Fecha final (opcional)
   * @returns Observable<MetricsDTO>
   */
  getMetrics(
    accommodationId: string | number,
    fromDate?: string,
    toDate?: string
  ): Observable<MetricsDTO> {
    let params = new HttpParams();
    if (fromDate) params = params.set('from', fromDate);
    if (toDate) params = params.set('to', toDate);

    // Simplemente devolvemos directamente el DTO recibido
    return this.http.get<MetricsDTO>(`${this.apiUrl}/${accommodationId}/metrics`, { params });
  }
}
