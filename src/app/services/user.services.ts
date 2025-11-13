import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfileDTO } from '../models/user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:9090/users';

  // ✅ Imagen por defecto en Cloudinary
  private defaultPhotoUrl =
    'https://res.cloudinary.com/dbeyylkba/image/upload/v1762801754/307ce493-b254-4b2d-8ba4-d12c080d6651_w7ozqw.jpg';

  constructor(private http: HttpClient) {}

  /** ✅ Obtener perfil del usuario autenticado */
  getUserProfile(): Observable<UserProfileDTO> {
    return this.http
      .get<{ error: boolean; content: UserProfileDTO }>(`${this.apiUrl}/profile`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          const user = res.content;
          // Si no tiene foto, usa la predeterminada
          return { ...user, photoUrl: user.photoUrl || this.defaultPhotoUrl };
        })
      );
  }

  /** 👤 Obtener usuario por ID */
  getUserById(userId: string): Observable<UserProfileDTO> {
    return this.http
      .get<{ error: boolean; content: UserProfileDTO }>(`${this.apiUrl}/${userId}`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          const user = res.content;
          console.log('Usuario obtenido:', user);
          return { ...user, photoUrl: user.photoUrl || this.defaultPhotoUrl };
        })
      );
  }

  /** ✏️ Editar perfil */
  editUser(user: Partial<UserProfileDTO>): Observable<any> {
    return this.http.put(`${this.apiUrl}`, user, { withCredentials: true });
  }

  /** 🔐 Cambiar contraseña */
  changePassword(payload: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/password`, payload, { withCredentials: true });
  }

  /** 🗑️ Eliminar usuario */
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
