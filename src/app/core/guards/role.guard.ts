import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs";

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authUser.pipe(
    map(user => {
      if (user && user.role === 'ADMIN') {
        return true;
      }
      return router.createUrlTree(['/home']); // Redirect to home if not admin
    })
  );
};
