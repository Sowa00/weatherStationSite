import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth.guard";
import {CurrentWeatherComponent} from "./current-weather/current-weather.component";
import {TemperatureChartComponent} from "./temperature-chart/temperature-chart.component";
import { ObservationChartComponent} from "./observation-chart/observation-chart.component";
import { DownloadComponent} from "./download/download.component";

export const routes: Routes = [
  { path: 'current-weather', component: CurrentWeatherComponent, canActivate: [AuthGuard] },
  { path: 'temperature-chart', component: TemperatureChartComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'observation-chart', component: ObservationChartComponent, canActivate: [AuthGuard]  },
  { path: 'download', component: DownloadComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
