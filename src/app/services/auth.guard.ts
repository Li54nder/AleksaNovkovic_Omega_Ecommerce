import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token && !inject(JwtHelperService).isTokenExpired(token);
}

export const authGuard: CanActivateFn = (route, state) => {
  return isAuthenticated()? true : inject(Router).navigateByUrl('login');
};
