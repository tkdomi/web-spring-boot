import { Component } from '@angular/core';

@Component({
  selector: 'app-car-years-picker',
  templateUrl: './car-years-picker.component.html',
  styleUrls: ['./car-years-picker.component.scss']
})
export class CarYearsPickerComponent {

  yearFrom: number = 1900;
  yearTo: number = new Date().getFullYear();
}
