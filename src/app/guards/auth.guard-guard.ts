import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { catchError, map, of } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateToken().pipe(
    map((response) => {
      if (response.content === true) {
        return true;
      }

      router.navigate(['/login']);
      return false;
    }),
    catchError((error) => {
      console.warn('⚠️ Token inválido o expirado:', error);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
