// app.routes.ts
import { Routes } from '@angular/router';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';

export const routes: Routes = [
  { path: 'current-weather', component: CurrentWeatherComponent },
  { path: 'temperature-chart', component: TemperatureChartComponent },
  // Dodaj inne ścieżki, jeśli potrzebujesz
];
