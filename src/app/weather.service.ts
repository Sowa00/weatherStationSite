import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherStation } from './weatherstation';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getWeatherDataForDay(date: string): Observable<WeatherStation[]> {
    const formattedDate = this.datePipe.transform(date, 'dd.MM.yyyy');
    const fullUrl = `${this.apiUrl}/wd/day/${formattedDate}`;
    return this.http.get<WeatherStation[]>(fullUrl);
  }
  getCurrentWeather(): Observable<WeatherStation | null> {
    return this.http.get<WeatherStation>(`${this.apiUrl}/wd/latest-time`);
  }

  getObservationData(startDate: string, endDate: string): Observable<any[]> {
    const formattedStartDate = this.datePipe.transform(startDate, 'dd.MM.yyyy');
    const formattedEndDate = this.datePipe.transform(endDate, 'dd.MM.yyyy');

    const url = `${this.apiUrl}/wd/dates?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;

    return this.http.get<any[]>(url);
  }

  convertToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5/9;
  }
}
