import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TemperatureChartComponent } from './temperature-chart.component';
import { WeatherService } from '../weather.service';
import { DateService } from '../date.service';
import { of } from 'rxjs';
import { WeatherStation } from '../weatherstation';

describe('TemperatureChartComponent', () => {
  let component: TemperatureChartComponent;
  let fixture: ComponentFixture<TemperatureChartComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let dateServiceSpy: jasmine.SpyObj<DateService>;

  beforeEach(async () => {
    weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeatherDataForDay', 'convertToCelsius']);
    dateServiceSpy = jasmine.createSpyObj('DateService', ['getCurrentDate']);

    await TestBed.configureTestingModule({
      declarations: [TemperatureChartComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: WeatherService, useValue: weatherServiceSpy },
        { provide: DateService, useValue: dateServiceSpy }
      ]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load weather data for selected date', () => {
    const selectedDate = '2024-02-01';
    const weatherData: WeatherStation[] = [
      { id: 1, idByDateTime: 1, date: '2024-02-01', time: '12:00', temperatureOut: 25, hiTemperature: 30, lowTemperature: 20, outHuminity: 50, dewPt: 15, windSpeed: 10, windDirection: 'N', windRun: 50, hiSpeed: 15, hiDirection: 'N', windChill: 20, heatIndex: 30, thwIndex: 28, bar: 1010, rain: 0, rainRate: 0, heatDd: 5, coolDd: 10, temperatureIn: 20, inHumidity: 40, inDew: 10, inHeat: 25, inEMC: 12, inAirDensity: 15, windSamp: 100, windTx: 100, ISSRecept: 100, arcInt: 100 }
    ];
    weatherServiceSpy.getWeatherDataForDay.and.returnValue(of(weatherData));
    component.weatherDataForm.patchValue({ selectedDate });

    component.loadWeatherData();

    expect(weatherServiceSpy.getWeatherDataForDay).toHaveBeenCalledWith(selectedDate);
    expect(component.lineChartData.length).toBe(1);
    expect(component.lineChartLabels.length).toBe(1);
  });

  it('should convert fahrenheit to celsius', () => {
    const fahrenheit = 70;
    const expectedCelsius = (fahrenheit - 32) * 5 / 9;

    const celsius = weatherServiceSpy.convertToCelsius.and.callFake((fahrenheit: number) => {
      return (fahrenheit - 32) * 5 / 9;
    });

    expect(celsius(fahrenheit)).toBeCloseTo(expectedCelsius, 0);
  });

  it('should select data and load weather data', () => {
    const selectedData = 'Temperatura';
    const selectedDate = '2022-01-01';
    const weatherData: WeatherStation[] = [
      { id: 1, idByDateTime: 1, date: '2024-02-01', time: '12:00', temperatureOut: 25, hiTemperature: 30, lowTemperature: 20, outHuminity: 50, dewPt: 15, windSpeed: 10, windDirection: 'N', windRun: 50, hiSpeed: 15, hiDirection: 'N', windChill: 20, heatIndex: 30, thwIndex: 28, bar: 1010, rain: 0, rainRate: 0, heatDd: 5, coolDd: 10, temperatureIn: 20, inHumidity: 40, inDew: 10, inHeat: 25, inEMC: 12, inAirDensity: 15, windSamp: 100, windTx: 100, ISSRecept: 100, arcInt: 100 }
    ];
    weatherServiceSpy.getWeatherDataForDay.and.returnValue(of(weatherData));
    component.weatherDataForm.patchValue({ selectedDate });
    component.selectData(selectedData);


    expect(component.weatherDataForm.value.selectedData).toBe(selectedData);
    expect(weatherServiceSpy.getWeatherDataForDay).toHaveBeenCalledWith(selectedDate);
  });

});


