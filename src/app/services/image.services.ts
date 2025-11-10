import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private apiUrl = 'http://localhost:9090/api/images';

  constructor(private http: HttpClient) {}

  async getImagesByAccommodationId(accommodationId: number): Promise<string[]> {
    return await firstValueFrom(
      this.http.get<string[]>(`${this.apiUrl}/accommodation/${accommodationId}`)
    );
  }
}
