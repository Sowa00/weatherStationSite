import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { YourWeatherService } from '../your-weather.service';
import { WeatherStation } from '../weatherstation';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.css']
})
export class TemperatureChartComponent implements OnInit {
  public lineChartData: ChartDataset[] = [{ data: [], label: 'TemperatureOut' }];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor(private weatherService: YourWeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeatherDataForDay('01.11.2023').subscribe((data: WeatherStation[]) => {
      data.forEach((item: WeatherStation) => {
        // Konwersja temperatury z Fahrenheitów na stopnie Celsiusza
        const temperatureCelsius = ((item.temperatureOut - 32) * 5) / 9;

        // Dodanie skonwertowanej temperatury do danych na wykresie
        this.lineChartData[0].data.push(temperatureCelsius);
        this.lineChartLabels.push(item.time);

        // Dodanie console logów do śledzenia danych
        console.log(`Czas: ${item.time}, Temperatura (F): ${item.temperatureOut}, Temperatura (C): ${temperatureCelsius}`);
      });
    });
  }
}
