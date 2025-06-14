

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';


export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn(); // or from state
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
