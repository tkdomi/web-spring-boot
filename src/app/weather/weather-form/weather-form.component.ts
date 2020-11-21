import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherFormComponent {
  @Output()
  checkWeather: EventEmitter<string> = new EventEmitter<string>();

  onCheckWeather(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.checkWeather.next(form.value.city);
  }
}
