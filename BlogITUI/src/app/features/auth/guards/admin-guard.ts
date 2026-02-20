import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.user();

  //user is not allowed here, navigate away from page to login page
  if(!user){
    router.navigate(['/login']);
    return false;
  }

  //User is logged in
  //Check role of user. If user is not a writer, log them out. 
  const isWriter = user.roles.includes("writer");
  if(!isWriter){
    authService.logout();
    return false;
  }

  //we know user is logged in and a writer role
  return true;
};
