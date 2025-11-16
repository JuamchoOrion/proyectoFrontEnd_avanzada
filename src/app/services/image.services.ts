import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private apiUrl =
    'https://proyectofinal-programacion-avanzada-production-5ceb.up.railway.app/api/images';

  constructor(private http: HttpClient) {}

  async getImagesByAccommodationId(accommodationId: number): Promise<string[]> {
    return await firstValueFrom(
      this.http.get<string[]>(`${this.apiUrl}/accommodation/${accommodationId}`)
    );
  }
  /*
  onFilesSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const files = Array.from(input.files);
    const maxSize = 15 * 1024 * 1024; // 15 MB

    for (const file of files) {
      if (file.size > maxSize) {
        alert(`El archivo ${file.name} supera el límite de 15 MB`);
        return;
      }
    }
    this.dto.images = files;
  }
}*/
}
