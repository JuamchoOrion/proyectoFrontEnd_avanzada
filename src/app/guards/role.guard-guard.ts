import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { map, catchError, of } from 'rxjs';

export const RoleGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map((user) => {
      console.log(user)
      if (user && user.role === 'ROLE_HOST') {
        console.log('🟢 Acceso permitido: usuario con rol HOST');
        return true;
      } else {
        console.warn('🚫 Acceso denegado: se requiere rol HOST');
        router.navigate(['/landing']);
        return false;
      }
    }),
    catchError((err) => {
      console.error('⚠️ Error al verificar rol:', err);
      router.navigate(['/landing']);
      return of(false);
    })
  );
};
