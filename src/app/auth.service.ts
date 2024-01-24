import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from "./user";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userInfoSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
    console.log('Authentication status:', value);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  setUserInfo(userInfo: User | null): void {
    this.userInfoSubject.next(userInfo);
  }

  getUserInfo(): Observable<User | null> {
    return this.userInfoSubject.asObservable();
  }

  logout(): void {

    this.clearToken();

    this.setAuthenticated(false);
    this.userInfoSubject.next(null);
  }

  loginUser(formData: any): Observable<any> {

    const loginUrl = 'adresTwojegoApi/login';

    return this.http.post<any>(loginUrl, formData).pipe(
      map(response => {
        const token = response.token;
        this.setToken(token);
        return response;
      }),
    );
  }

  setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  clearToken(): void {
    localStorage.removeItem('jwt_token');
  }
}
