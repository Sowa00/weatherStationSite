import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';

import { WeatherService } from './weather.service';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { routes } from './app.routes';
import { RouterModule } from "@angular/router";
import { RegisterComponent} from "./register/register.component";
import { LoginComponent} from "./login/login.component";
import { HomeComponent} from "./home/home.component";
import { ObservationChartComponent} from "./observation-chart/observation-chart.component";
import { DateService } from "./date.service";
import { DateRangeService} from "./date-range.service";
import { SidebarComponent} from "./sidebar/sidebar.component";
import { DatePipe} from "@angular/common";
import {DownloadComponent} from "./download/download.component";


@NgModule({
  declarations: [
    AppComponent,
    TemperatureChartComponent,
    CurrentWeatherComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ObservationChartComponent,
    SidebarComponent,
    DownloadComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [WeatherService, DateService, DateRangeService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
