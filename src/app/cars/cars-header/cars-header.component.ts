import { Component, EventEmitter, Output } from '@angular/core';
import { Color } from '../+model/color';
import { MatDialog } from '@angular/material/dialog';
import { CarYearsPickerComponent } from '../+shared/car-years-picker/car-years-picker.component';

@Component({
  selector: 'app-cars-header',
  templateUrl: './cars-header.component.html',
  styleUrls: ['./cars-header.component.scss']
})
export class CarsHeaderComponent {
  @Output()
  colorChange = new EventEmitter<Color>();
  @Output()
  createCar = new EventEmitter();
  @Output()
  filterByYears = new EventEmitter<{yearFrom: number, yearTo: number}>();

  colors: string[] = Object.keys(Color);

  constructor(private dialog: MatDialog) {}


  handleColorChange(color: Color) {
    this.colorChange.emit(color);
  }

  handleCreateCar() {
    this.createCar.emit();
  }

  handleYearRangeSelection() {
    this.dialog.open(CarYearsPickerComponent, {width: '250px'})
      .afterClosed().subscribe(result => {
        if (result) {
          this.filterByYears.emit({yearFrom: result.yearFrom, yearTo: result.yearTo});
        }
    })
  }
}
