import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastrService = inject(ToastrService);
  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['']);
    toastrService.info('Lütfen önce giriş yapınız');
    return false;
  }
};
