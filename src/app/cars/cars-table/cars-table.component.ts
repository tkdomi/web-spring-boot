import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '../+model/car';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsTableComponent {
  @Input()
  cars: Car[] = [];
  @Output()
  editCar = new EventEmitter<number>();
  @Output()
  deleteCar = new EventEmitter<number>();

  displayedColumns: string[] = ['mark', 'model', 'color', 'year', 'options'];

  handleEdit(car: Car) {
    this.editCar.emit(car.id);
  }

  handleDelete(car: Car) {
    this.deleteCar.emit(car.id);
  }

}
