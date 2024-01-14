import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth.guard";
import {CurrentWeatherComponent} from "./current-weather/current-weather.component";
import {TemperatureChartComponent} from "./temperature-chart/temperature-chart.component";
import {TemperatureChartMonthComponent} from "./temperature-chart-month/temperature-chart-month.component";

export const routes: Routes = [
  { path: 'current-weather', component: CurrentWeatherComponent, canActivate: [AuthGuard] },
  { path: 'temperature-chart', component: TemperatureChartComponent, canActivate: [AuthGuard] },
  { path: 'temperature-chart-month', component: TemperatureChartMonthComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
