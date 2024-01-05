import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component'
import { FormsModule } from '@angular/forms';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { YourWeatherService } from './your-weather.service';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { routes } from './app.routes';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    TemperatureChartComponent,
    CurrentWeatherComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [YourWeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
