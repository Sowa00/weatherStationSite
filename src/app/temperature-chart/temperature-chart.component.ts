import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { WeatherService } from '../weather.service';
import { WeatherStation } from '../weatherstation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateService } from "../date.service";

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.css'],
})
export class TemperatureChartComponent implements OnInit {
  public lineChartData: ChartDataset[] = [];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  public weatherDataForm: FormGroup;
  public availableData: string[] = ['Temperatura', 'Wilgotność', 'Prędkość wiatru', 'Ciśnienie', 'Opady deszczu'];
  public currentDate: string = '';

  private dataMapping: { [key: string]: string } = {
    'Temperatura': 'temperatureOut',
    'Wilgotność': 'outHumidity',
    'Prędkość wiatru': 'windSpeed',
    'Ciśnienie': 'bar',
    'Opady deszczu': 'rain'
  };

  constructor(private weatherService: WeatherService, private formBuilder: FormBuilder, private dateService: DateService) {
    this.weatherDataForm = this.formBuilder.group({
      selectedData: [''],
      selectedDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadWeatherData();
    this.currentDate = this.dateService.getCurrentDate();
  }

  loadWeatherData(): void {
    const selectedData = this.weatherDataForm.value.selectedData;
    const selectedDate = this.weatherDataForm.value.selectedDate;

    const englishData = this.dataMapping[selectedData];

    this.weatherService.getWeatherDataForDay(selectedDate).subscribe((data: WeatherStation[]) => {
      this.lineChartData = [{ data: [], label: selectedData }];
      this.lineChartLabels = [];
      data.forEach((item: WeatherStation) => {
        const dataValue = (item as any)[englishData];
        this.lineChartData[0].data.push(dataValue);
        this.lineChartLabels.push(item.time);
      });
    });
  }

  selectData(selectedData: string): void {
    this.weatherDataForm.patchValue({ selectedData });
    this.loadWeatherData();
  }
}
