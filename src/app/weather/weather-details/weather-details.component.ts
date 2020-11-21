import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Weather } from '../+model/weather';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDetailsComponent {

  @Input()
  weather: Weather;
}
