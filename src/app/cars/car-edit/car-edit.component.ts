import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarFormValue } from '../+shared/car-form/+model/car-form-value';
import { CarEditService } from './car-edit.service';
import { Car } from '../+model/car';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarEditService]
})
export class CarEditComponent {

  car$: Observable<Car>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  private sub: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public id: number,
              private dialogRef: MatDialogRef<CarEditComponent, boolean | undefined>,
              private service: CarEditService) {

    this.car$ = this.service.car$;
    this.loading$ = this.service.loading$;
    this.loaded$ = this.service.loaded$;

    this.sub = this.service.updated$.subscribe((updated) => {
      if (updated) {
        this.dialogRef.close(true);
      }
    });

    this.service.load(this.id);
  }

  handleSave(carFormValue: CarFormValue) {
    this.service.update(this.id, carFormValue);
  }

  handleCancel() {
    this.dialogRef.close();
  }
}
