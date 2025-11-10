import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:9090/api/reviews';

  constructor(private http: HttpClient) {}

  getReviewsByAccommodation(id: number, page = 0, size = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/accommodation/${id}?page=${page}&size=${size}`);
  }
}
