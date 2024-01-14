import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  // Metoda do ustawiania statusu autoryzacji
  setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
    console.log('Authentication status:', value)
  }

  // Metoda do sprawdzania, czy użytkownik jest zalogowany
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
