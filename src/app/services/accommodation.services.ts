import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private apiUrl = 'http://localhost:9090/api/accommodations';

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getAccommodationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
