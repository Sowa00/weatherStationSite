import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { YourWeatherService } from '../your-weather.service';
import { WeatherStation } from '../weatherstation';

@Component({
  selector: 'app-temperature-chart-month',
  templateUrl: './temperature-chart-month.component.html',
  styleUrls: ['./temperature-chart-month.component.css']
})
export class TemperatureChartMonthComponent implements OnInit {
  public lineChartData: ChartDataset[] = [{ data: [], label: 'TemperatureOut' }];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor(private weatherService: YourWeatherService) {}

  ngOnInit(): void {
    // Pobierz dane z ostatniego miesiąca
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Formatuj daty w formacie 'dd.mm.yyyy'
    const formattedToday = this.formatDate(today);
    const formattedLastMonth = this.formatDate(lastMonth);

    this.weatherService.getWeatherDataForMoth().subscribe((data: WeatherStation[]) => {
      data.forEach((item: WeatherStation) => {
        // Konwersja temperatury z Fahrenheitów na stopnie Celsiusza
        const temperatureCelsius = ((item.temperatureOut - 32) * 5) / 9;

        // Konwersja daty na timestamp
        const timestamp = new Date(item.date).getTime();

        // Dodanie skonwertowanej temperatury do danych na wykresie
        this.lineChartData[0].data.push({ x: timestamp, y: temperatureCelsius });
        this.lineChartLabels.push(item.time);

        // Dodanie console logów do śledzenia danych
        console.log(`Czas: ${item.time}, Temperatura (F): ${item.temperatureOut}, Temperatura (C): ${temperatureCelsius}`);
      });
    });
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${this.formatNumber(day)}.${this.formatNumber(month)}.${year}`;
  }

  private formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
