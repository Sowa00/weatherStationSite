import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherStation } from './weatherstation';

@Injectable({
  providedIn: 'root',
})
export class YourWeatherService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getWeatherDataForDay(date: string): Observable<WeatherStation[]> {
    const fullUrl = `${this.apiUrl}/wd/day/${date}`;
    return this.http.get<WeatherStation[]>(fullUrl);
  }
  getCurrentWeather(): Observable<WeatherStation | null> {
    return this.http.get<WeatherStation>(`${this.apiUrl}/wd/latest-time`);
  }

  getObservationData(startDate: string, endDate: string): Observable<any[]> {
    const url = `${this.apiUrl}/wd/dates?startDate=${startDate}&endDate=${endDate}`;

    return this.http.get<any[]>(url);
  }
}
