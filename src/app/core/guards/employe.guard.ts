import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const employeGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const userRole = auth.userRole();

  if (userRole === 'ROLE_EMPLOYE') {
    return true;
  }

  router.navigate(['/connexion']);
  return false;
};
