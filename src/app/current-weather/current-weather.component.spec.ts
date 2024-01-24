import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherService } from '../weather.service';
import { AuthService } from '../auth.service';
import { DateService } from '../date.service';
import { WeatherStation } from '../weatherstation';
import { User } from '../user';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dateServiceSpy: jasmine.SpyObj<DateService>;
  let mockUserInfo: User;
  let mockWeatherData: WeatherStation;

  beforeEach(
    waitForAsync(() => {
      weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getCurrentWeather']);
      authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'getUserInfo', 'logout']);
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);
      dateServiceSpy = jasmine.createSpyObj('DateService', ['setCurrentDate']);

      TestBed.configureTestingModule({
        declarations: [CurrentWeatherComponent],
        imports: [ReactiveFormsModule],
        providers: [
          { provide: WeatherService, useValue: weatherServiceSpy },
          { provide: AuthService, useValue: authServiceSpy },
          { provide: Router, useValue: routerSpy },
          { provide: DateService, useValue: dateServiceSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(CurrentWeatherComponent);
      component = fixture.componentInstance;

      mockUserInfo = {
        id: 1,
        email: 'test@example.com',
        password: 'test123',
        firstname: 'John',
        lastname: 'Doe',
      };

      mockWeatherData = {
        id: 1,
        idByDateTime: 1,
        date: '2022-01-01',
        time: '12:00',
        temperatureOut: 32,
        hiTemperature: 40,
        lowTemperature: 25,
        outHuminity: 50,
        dewPt: 20,
        windSpeed: 10,
        windDirection: 'N',
        windRun: 15,
        hiSpeed: 12,
        hiDirection: 'NE',
        windChill: 28,
        heatIndex: 35,
        thwIndex: 33,
        bar: 1000,
        rain: 5,
        rainRate: 0.2,
        heatDd: 15,
        coolDd: 10,
        temperatureIn: 72,
        inHumidity: 40,
        inDew: 18,
        inHeat: 68,
        inEMC: 30,
        inAirDensity: 0.075,
        windSamp: 20,
        windTx: 22,
        ISSRecept: 98,
        arcInt: 45,
      };
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current weather correctly', () => {
    authServiceSpy.isAuthenticated.and.returnValue(of(true));
    authServiceSpy.getUserInfo.and.returnValue(of(mockUserInfo));

    component.subscribeToAuthChanges();

    expect(component.isAuthenticated).toBe(true);
    expect(component.userInfo).toEqual(mockUserInfo);
  });

  it('should not update userInfo when not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(of(false));

    component.subscribeToAuthChanges();

    expect(component.isAuthenticated).toBe(false);
    expect(component.userInfo).toBeNull();
  });

  it('should toggle detailed data', () => {
    component.showDetailedData = false;
    component.toggleDetailedData();
    expect(component.showDetailedData).toBe(true);

    component.toggleDetailedData();
    expect(component.showDetailedData).toBe(false);
  });

  it('should navigate to temperature chart with valid date', () => {
    component.currentDateInput = '01.02.2022';
    spyOn(console, 'error'); // Ignore console.error for this test
    component.goToTemperatureChart();
    expect(dateServiceSpy.setCurrentDate).toHaveBeenCalledWith('01.02.2022');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/temperature-chart', { date: '01.02.2022' }]);
  });

  it('should log an error for invalid date format', () => {
    component.currentDateInput = 'invalidDate';
    const consoleErrorSpy = spyOn(console, 'error');
    component.goToTemperatureChart();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid date format');
    expect(dateServiceSpy.setCurrentDate).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to observation page', () => {
    component.goToObservationPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/observation-chart', {}]);
  });

  it('should convert units correctly for different data types', () => {
    const convertedData = component.convertUnits(mockWeatherData);

    // Add assertions based on your conversion logic
    expect(convertedData.temperatureOut).toEqual(mockWeatherData.temperatureOut);
    // Add assertions for other properties
  });

  it('should convert to Celsius correctly', () => {
    const fahrenheitTemperature = 32;
    const celsiusTemperature = component.convertToCelsius(fahrenheitTemperature);

    expect(celsiusTemperature).toEqual(0);
  });

  it('should convert to hPa correctly', () => {
    const barPressure = 1;
    const hPaPressure = component.convertToHPa(barPressure);

    expect(hPaPressure).toEqual(1000);
  });

  it('should logout', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
