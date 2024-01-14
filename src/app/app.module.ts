import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { TemperatureChartMonthComponent } from './temperature-chart-month/temperature-chart-month.component';
import { YourWeatherService } from './your-weather.service';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { routes } from './app.routes';
import { RouterModule } from "@angular/router";
import { RegisterComponent} from "./register/register.component";
import { LoginComponent} from "./login/login.component";
import { HomeComponent} from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    TemperatureChartComponent,
    TemperatureChartMonthComponent,
    CurrentWeatherComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
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
  providers: [YourWeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
