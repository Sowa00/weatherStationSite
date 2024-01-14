// weatherstation.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WeatherStation } from "./weatherstation";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherstationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getWeatherDataForDay(date: string): Observable<WeatherStation[]> {
    return this.http.get<WeatherStation[]>(`${this.apiServerUrl}/wd/day/${date}`);
  }
}
