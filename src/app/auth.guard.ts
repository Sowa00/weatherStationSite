import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {catchError, Observable, of, switchMap} from 'rxjs';
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

    // Sprawdzanie autoryzacji przy użyciu AuthService
    return this.authService.isAuthenticated().pipe(
      switchMap(authenticated => {
        console.log('Is authenticated:', authenticated);

        if (authenticated) {
          // Zalogowany użytkownik ma dostęp do wszystkich tras
          return of(true);
        } else {
          // Sprawdź, czy trasa wymaga autoryzacji (np. "current-weather" lub "temperature-chart")
          if (next.routeConfig?.path && next.routeConfig.path !== 'register' && next.routeConfig.path !== 'login') {
            // Niezalogowany użytkownik jest przekierowywany do "/login" dla pozostałych tras
            console.log('Redirecting to home');
            this.router.navigate(['/']);
          }

          return of(true); // Niezalogowany użytkownik ma dostęp do tras bez wymaganej autoryzacji
        }
      }),
      catchError(error => {
        console.error('Error during authentication check:', error);
        return of(false);
      })
    );
  }


}
