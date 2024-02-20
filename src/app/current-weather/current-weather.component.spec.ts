import { WeatherStation } from '../weatherstation';
import { CurrentWeatherComponent } from "./current-weather.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WeatherService } from "../weather.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { DateService } from "../date.service";
import { of } from 'rxjs';
import {User} from "../user";
import {AuthService} from "../auth.service";


describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let dateServiceSpy: jasmine.SpyObj<DateService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;


  beforeEach(async () => {
    const weatherServiceSpyObj = jasmine.createSpyObj('WeatherService', ['getCurrentWeather']);
    const dateServiceSpyObj = jasmine.createSpyObj('DateService', ['setCurrentDate']);

    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpyObj },
        { provide: DateService, useValue: dateServiceSpyObj },
        FormBuilder
      ]
    }).compileComponents();

    weatherServiceSpy = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    dateServiceSpy = TestBed.inject(DateService) as jasmine.SpyObj<DateService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current weather on initialization', () => {
    const weatherData: WeatherStation = { id: 1, idByDateTime: 1, date: '2024-02-08', time: '12:00', temperatureOut: 25, hiTemperature: 30, lowTemperature: 20, outHuminity: 50, dewPt: 15, windSpeed: 10, windDirection: 'N', windRun: 100, hiSpeed: 15, hiDirection: 'NW', windChill: 20, heatIndex: 27, thwIndex: 26, bar: 1010, rain: 0, rainRate: 0, heatDd: 5, coolDd: 3, temperatureIn: 22, inHumidity: 40, inDew: 18, inHeat: 25, inEMC: 12, inAirDensity: 1.2, windSamp: 5000, windTx: 1000, ISSRecept: 10, arcInt: 100 };
    weatherServiceSpy.getCurrentWeather.and.returnValue(of(weatherData));
    component.ngOnInit();
    expect(component.currentWeather).toEqual(weatherData);
  });

  it('should toggle detailed data', () => {
    component.toggleDetailedData();
    expect(component.showDetailedData).toBeTrue();
    component.toggleDetailedData();
    expect(component.showDetailedData).toBeFalse();
  });

  it('should logout', () => {
    spyOn(component['authService'], 'logout');
    spyOn(component['router'], 'navigate');
    component.logout();
    expect(component['authService'].logout).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledWith(['']);
  });
});
