// src/app/services/your-weather.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherStation } from './weatherstation';  // Upewnij się, że to odnosi się do poprawnej ścieżki

@Injectable({
  providedIn: 'root',
})
export class YourWeatherService {
  private apiUrl = 'http://localhost:8081';  // Zmień to na odpowiednią bazową ścieżkę dla twojego API

  constructor(private http: HttpClient) {}

  getWeatherDataForDay(date: string): Observable<WeatherStation[]> {
    const fullUrl = `${this.apiUrl}/wd/day/${date}`;
    return this.http.get<WeatherStation[]>(fullUrl);
  }
  getCurrentWeather(): Observable<WeatherStation | null> {
    // Tutaj użyj HTTP do pobrania najnowszych danych pogodowych z twojego API
    // Zwróć dane jako Observable
    return this.http.get<WeatherStation>(`${this.apiUrl}/wd/latest-time`);
  }
}
