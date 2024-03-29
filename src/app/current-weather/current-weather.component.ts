import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherStation } from '../weatherstation';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from "../user";
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateService } from "../date.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  public currentWeather: WeatherStation | null = null;
  public currentDateInput: string = '';
  public isAuthenticated: boolean = false;
  public userInfo: User | null = null;
  public showDetailedData: boolean = false;
  public detailedData: WeatherStation[] = [];
  public weatherDataForm: FormGroup;
  public availableData: string[] = ['Temperatura', 'Wilgotność', 'Prędkość wiatru', 'Ciśnienie', 'Opady deszczu'];
  public selectedData: string = 'temperatureOut';

  constructor(
    public weatherService: WeatherService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dateService: DateService
  ) {
    this.weatherDataForm = this.formBuilder.group({
      selectedData: ['temperatureOut'],
    });
  }

  ngOnInit(): void {
    this.loadCurrentWeather();
    this.subscribeToAuthChanges();
  }

  loadCurrentWeather(): void {
    this.weatherService.getCurrentWeather().subscribe((data: WeatherStation | null) => {
      if (data) {
        this.currentWeather = data;
      }
    });
  }

  toggleDetailedData(): void {
    this.showDetailedData = !this.showDetailedData;
  }

  subscribeToAuthChanges(): void {
    this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
      if (authenticated) {
        this.authService.getUserInfo().subscribe(userInfo => {
          this.userInfo = userInfo;
        });
      }
    });
  }

  goToObservationPage(): void {
    this.router.navigate(['/observation-chart', { }]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
