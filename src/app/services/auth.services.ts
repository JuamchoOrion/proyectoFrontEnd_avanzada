import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CreateUserDTO } from '../models/createUser-dto';
import { ResetPasswordDTO } from '../models/reset-password-dto';

interface ResponseDTO<T> {
  error: boolean;
  content: T;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =
    'https://proyectofinal-programacion-avanzada-production-5ceb.up.railway.app/api/auth';
  private hostsUrl =
    'https://proyectofinal-programacion-avanzada-production-5ceb.up.railway.app/api/hosts';

  constructor(private http: HttpClient) {}

  register(dto: CreateUserDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dto, { withCredentials: true });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  }

  isAuthenticated(): boolean {
    console.log('🍪 Cookies actuales:', document.cookie);
    return document.cookie.includes('jwt=');
  }

  validateToken(): Observable<ResponseDTO<boolean>> {
    return this.http.get<ResponseDTO<boolean>>(`${this.apiUrl}/validate-token`, {
      withCredentials: true,
    });
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/password/reset`, { email }, { withCredentials: true });
  }

  confirmPasswordReset(dto: ResetPasswordDTO): Observable<any> {
    return this.http.patch(`${this.apiUrl}/password/confirm`, dto, { withCredentials: true });
  }

  /** Devuelve id y role del usuario logeado */
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, { withCredentials: true }).pipe(
      map((res: any) => res.content),
      catchError(() => of(null))
    );
  }

  /**
   * Para hosts: obtiene el perfil completo usando el id
   * Primero obtiene id y role, luego consulta /api/hosts/{id}
   */
  getHostProfile(): Observable<any> {
    return this.getCurrentUser().pipe(
      switchMap((user) => {
        if (user?.role === 'ROLE_HOST' && user?.id) {
          return this.http.get(`${this.hostsUrl}/${user.id}`, { withCredentials: true }).pipe(
            map((res: any) => res.content),
            catchError(() => of(null))
          );
        }
        return of(null);
      })
    );
  }

  logout(): Observable<ResponseDTO<string>> {
    return this.http.post<ResponseDTO<string>>(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }
}
