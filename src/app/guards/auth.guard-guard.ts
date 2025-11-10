import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { catchError, map, of } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateToken().pipe(
    map(() => true), // ✅ Si el backend responde 200 → acceso permitido
    catchError((error) => {
      console.warn('Token inválido o expirado:', error);
      router.navigate(['/login']);
      return of(false); // 🚫 Bloquear acceso
    })
  );
};
