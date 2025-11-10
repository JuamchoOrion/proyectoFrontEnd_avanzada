import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDTO } from '../models/createUser-dto';
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
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  isAuthenticated(): boolean {
    return document.cookie.includes('jwt=');
  }

  validateToken() {
    return this.http.get('http://localhost:9090/api/auth/validate-token', {
      withCredentials: true,
    });
  }
}
