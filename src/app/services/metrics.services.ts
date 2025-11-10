import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private apiUrl = 'http://localhost:9090/api/metrics';

  constructor(private http: HttpClient) {}

  getByAccommodation(accommodationId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/accommodation/${accommodationId}`);
  }
}
