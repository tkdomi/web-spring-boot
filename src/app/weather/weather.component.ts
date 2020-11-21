import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Observable } from 'rxjs';
import { Weather } from './+model/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit {

  weather$: Observable<Weather>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private service: WeatherService) { }

  ngOnInit(): void {
    this.weather$ = this.service.weather$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;
  }

  handleFindWeather(city: string) {
    this.service.findWeather(city);
  }

}
