import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:9090/users';

  constructor(private http: HttpClient) {}

 
  /** ✅ Obtener perfil del usuario autenticado */
  getUserProfile(): Observable<{ id: string; name: string; email: string; phone: string; photoUrl?: string }> {
    return this.http
      .get<{ error: boolean; data: { id: string; name: string; email: string; phone: string; photoUrl?: string } }>(
        `${this.apiUrl}/profile`,
        { withCredentials: true } // 🔒 Importante: envía cookie JWT
      )
      .pipe(map((res) => res.data));
  }

  /** ✏️ Editar perfil */
  editUser(user: { name: string; phone: string; photoUrl?: string }): Observable<any> {
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