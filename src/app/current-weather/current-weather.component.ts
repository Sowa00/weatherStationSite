// current-weather.component.ts

import { Component, OnInit } from '@angular/core';
import { YourWeatherService } from '../your-weather.service';
import { WeatherStation } from '../weatherstation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  public currentWeather: WeatherStation | null = null;
  public currentDateInput: string = '';

  constructor(private weatherService: YourWeatherService, private router: Router) {}

  ngOnInit(): void {
    this.loadCurrentWeather();
  }

  loadCurrentWeather(): void {
    this.weatherService.getCurrentWeather().subscribe((data: WeatherStation | null) => {
      if (data) {
        this.currentWeather = this.convertUnits(data);
      }
    });
  }

  convertUnits(data: WeatherStation): WeatherStation {
    // Konwersja bar na hPa
    const hPa = data.bar * 1000;

    // Zwróć nowy obiekt z przeliczonymi jednostkami
    return {
      ...data,
      bar: hPa,
    };
  }

  onDateInputChange(): void {
    // Przyjmujemy, że wprowadzona data ma format "dd.mm.yyyy"
    const parts = this.currentDateInput.split('.');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const enteredDate = new Date(`${year}-${month}-${day}`);

      // Do something with the entered date, e.g., validate, format, etc.
      console.log('Entered Date:', enteredDate);
    } else {
      console.error('Invalid date format');
    }
  }

  goToTemperatureChart(): void {
    // Jeśli używasz Angular Router, możesz przekazać datę jako parametr do ścieżki
    this.router.navigate(['/temperature-chart', { date: this.currentDateInput }]);
  }

  convertToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5/9;
  }
}
