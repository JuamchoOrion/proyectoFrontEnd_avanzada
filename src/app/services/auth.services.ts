import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CreateUserDTO } from '../models/createUser-dto';
import { map, catchError } from 'rxjs/operators';
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
  private apiUrl = 'http://localhost:9090/api/auth';

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

  getCurrentUser(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/me`, {
        withCredentials: true,
      })
      .pipe(
        map((res: any) => res.content), // solo devolvemos la parte útil
        catchError(() => of(null))
      );
  }
  logout(): Observable<ResponseDTO<string>> {
    return this.http.post<ResponseDTO<string>>(
      `${this.apiUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
