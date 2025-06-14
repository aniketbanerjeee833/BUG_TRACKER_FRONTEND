import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

// export const adminGuard: CanActivateFn = (route, state) => {
//   return true;
// };
export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser.value;
  if (user.role==='ADMIN') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};