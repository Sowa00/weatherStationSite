import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from './weatherstation';

@Injectable({
  providedIn: 'root',
})
export class YourWeatherService {
  private apiUrl = 'https://your-api-url/';

  constructor(private http: HttpClient) {}

  getWeatherDataForDay(date: string): Observable<WeatherData[]> {
    return this.http.get<WeatherData[]>(`${this.apiUrl}/weather/${date}`);
  }
}
