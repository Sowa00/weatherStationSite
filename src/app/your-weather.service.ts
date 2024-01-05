// src/app/services/your-weather.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherStation } from './weatherstation';  // Upewnij się, że to odnosi się do poprawnej ścieżki

@Injectable({
  providedIn: 'root',
})
export class YourWeatherService {
  private apiUrl = 'http://localhost:8081/wd/day';  // Zmień to na odpowiednią bazową ścieżkę dla twojego API

  constructor(private http: HttpClient) {}

  getWeatherDataForDay(date: string): Observable<WeatherStation[]> {
    const fullUrl = `${this.apiUrl}/${date}`;
    return this.http.get<WeatherStation[]>(fullUrl);
  }
}
