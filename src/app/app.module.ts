import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { YourWeatherService } from './your-weather.service';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureChartComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [YourWeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
