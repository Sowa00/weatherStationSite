import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('canActivate is called');

    return this.authService.isAuthenticated().pipe(
      switchMap(authenticated => {
        console.log('Is authenticated:', authenticated);

        if (authenticated) {
          console.log('Authenticated - path:', next.routeConfig?.path);
          if (next.routeConfig?.path === 'register' || next.routeConfig?.path === 'login') {
            console.log('Redirecting to current-weather');
            this.router.navigate(['/current-weather']);
            return of(false);
          }
          return of(true);
        } else {
          if (next.routeConfig?.path && next.routeConfig.path !== 'register' && next.routeConfig.path !== 'login') {
            console.log('Redirecting to home');
            this.router.navigate(['/']);
          }

          return of(true);
        }
      }),
      catchError(error => {
        console.error('Error during authentication check:', error);
        return of(false);
      })
    );
  }
}
