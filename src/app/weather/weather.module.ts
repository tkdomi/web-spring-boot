import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WeatherComponent,
    WeatherDetailsComponent,
    WeatherFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [WeatherComponent]
})
export class WeatherModule { }
