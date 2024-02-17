import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateRangeService } from '../date-range.service';
import { WeatherService } from '../weather.service';
import {ChartDataset, ChartOptions} from "chart.js";
import {WeatherStation} from "../weatherstation";

@Component({
  selector: 'app-observation-chart',
  templateUrl: './observation-chart.component.html',
  styleUrls: ['./observation-chart.component.css'],
})
export class ObservationChartComponent implements OnInit {
  public dateRangeForm: FormGroup;
  public lineChartData: ChartDataset[] = [];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  private dataMapping: { [key: string]: string } = {
    'Temperatura': 'temperatureOut',
    'Wilgotność': 'outHumidity',
    'Prędkość wiatru': 'windSpeed',
    'Ciśnienie': 'bar',
    'Opady deszczu': 'rain'
  };

  get availableData(): string[] {
    return ['Temperatura', 'Wilgotność', 'Prędkość wiatru', 'Ciśnienie', 'Opady deszczu'];
  }

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private dateRangeService: DateRangeService,
  ) {
    this.dateRangeForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      selectedData: ['Temperatura'],
    });
  }

  ngOnInit(): void {
    this.dateRangeService.startDate$.subscribe((startDate) => {
      this.dateRangeForm.patchValue({ startDate });
    });

    this.dateRangeService.endDate$.subscribe((endDate) => {
      this.dateRangeForm.patchValue({ endDate });
    });

    this.loadObservationData();
  }

  loadObservationData(): void {
    if (this.dateRangeForm.valid) {
      const startDate = this.dateRangeForm.value.startDate;
      const endDate = this.dateRangeForm.value.endDate;
      const selectedData = this.dateRangeForm.value.selectedData;
      const englishData = this.dataMapping[selectedData];

      if (new Date(startDate) > new Date(endDate)) {
        console.error('Data początkowa nie może być większa niż data końcowa.');
        return;
      }
      this.weatherService.getObservationData(startDate, endDate).subscribe((data: WeatherStation[]) => {
        console.log(data);
        this.lineChartData = [{ data: [], label: selectedData }];
        this.lineChartLabels = [];
        data.forEach((item: WeatherStation) => {
          const dataValue = (item as any)[englishData];
          this.lineChartData[0].data.push(this.weatherService.convertToCelsius(dataValue));
          this.lineChartLabels.push(`${item.date} ${item.time}`);
        });
      }, (error) => {
        console.error('Błąd podczas pobierania danych:', error);
      });
    } else {
      console.log('Formularz jest nieprawidłowy. Sprawdź błędy walidacji.');
    }
  }
}
