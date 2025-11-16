import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserProfileDTO } from '../models/user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl =
    'https://proyectofinal-programacion-avanzada-production-5ceb.up.railway.app/users'; // 👈 ruta estándar con prefijo /api

  // ✅ Imagen por defecto en Cloudinary
  private defaultPhotoUrl =
    'https://res.cloudinary.com/dbeyylkba/image/upload/v1762801754/307ce493-b254-4b2d-8ba4-d12c080d6651_w7ozqw.jpg';

  constructor(private http: HttpClient) {}

  /** ✅ Obtener perfil del usuario autenticado */
  getUserProfile(): Observable<UserProfileDTO> {
    return this.http
      .get<{ error: boolean; content: UserProfileDTO }>(
        'https://proyectofinal-programacion-avanzada-production-5ceb.up.railway.app/users/profile',
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((res) => {
          const user = res.content;
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
  /*
  editUser(user: Partial<UserProfileDTO>): Observable<any> {
    return this.http.put(`${this.apiUrl}`, user, { withCredentials: true });
    */

  /** ✏️ Editar perfil (FormData para incluir imagen) */
  editUser(formData: FormData): Observable<any> {
    // ⚠️ No agregues 'Content-Type': Angular lo define automáticamente para multipart/form-data
    return this.http.put(`${this.apiUrl}`, formData, {
      withCredentials: true,
    });
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
