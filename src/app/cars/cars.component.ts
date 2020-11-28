import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Car } from './+model/car';
import { CarsService } from './cars.service';
import { Observable, Subscription } from 'rxjs';
import { Color } from './+model/color';
import { MatDialog } from '@angular/material/dialog';
import { CarCreateComponent } from './car-create/car-create.component';
import { CarEditComponent } from './car-edit/car-edit.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarsService]
})
export class CarsComponent implements OnInit, OnDestroy {

  cars$: Observable<Car[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  selectedColor: Color = null;

  private sub: Subscription;

  constructor(private service: CarsService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cars$ = this.service.cars$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

    this.sub = this.service.deleted$.subscribe((deleted) => {
      if (deleted) {
        this.service.load();
      }
    });

    this.service.load();
  }

  handleCreateCar() {
    this.dialog
      .open(CarCreateComponent, {width: '500px'})
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.service.load();
        }
      });
  }

  handleEditCar(id: number) {
    this.dialog
      .open(CarEditComponent, {width: '500px', data: id})
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.service.load();
        }
      });
  }

  handleDeleteCar(id: number) {
    this.service.deleteCar(id);
  }

  handleColorChange(color: Color) {
    if (color) {
      this.service.filterByColor(color);
    } else {
      this.service.load();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleFilterByYears(params: { yearFrom: number; yearTo: number }) {
    this.service.filterByYears(params.yearFrom, params.yearTo);
  }
}
