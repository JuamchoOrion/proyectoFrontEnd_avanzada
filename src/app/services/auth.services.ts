import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDTO } from '../models/createUser-dto';
import { map } from 'rxjs/operators';
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
  /** 
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }*/

  isAuthenticated(): boolean {
    console.log('🍪 Cookies actuales:', document.cookie);
    return document.cookie.includes('jwt=');
  }
  /** 
  validateToken() {
    return this.http.get('http://localhost:9090/api/auth/validate-token', {
      withCredentials: true,
    }) .pipe(
      map((res) => {
        // Verifica si la respuesta tiene el campo "content"
        if (typeof res.content === 'boolean') {
          return res.content;
        }
        // En caso de que devuelva { error: false, content: { ... } }
        return !!res.content;
      })
    );
  }**/
  validateToken(): Observable<ResponseDTO<boolean>> {
    return this.http.get<ResponseDTO<boolean>>(`${this.apiUrl}/validate-token`, {
      withCredentials: true,
    });
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
