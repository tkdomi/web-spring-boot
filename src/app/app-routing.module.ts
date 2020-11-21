import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { WeatherComponent } from './weather/weather.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'cars-management', pathMatch: 'full'},
  {path: 'cars-management', component: CarsComponent},
  {path: 'weather-app', component: WeatherComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
