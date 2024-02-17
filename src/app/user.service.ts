import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    const url = `${this.apiServerUrl}/wd/register`;
    return this.http.post(url, user);
  }

  loginUser(user: any): Observable<any> {
    const url = `${this.apiServerUrl}/wd/login`;
    return this.http.post(url, user);
  }
}
