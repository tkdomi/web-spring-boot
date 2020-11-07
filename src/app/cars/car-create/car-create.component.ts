import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CarFormValue } from '../+shared/car-form/+model/car-form-value';
import { CarCreateService } from './car-create.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarCreateService]
})
export class CarCreateComponent implements OnDestroy {

  private sub: Subscription;

  constructor(private dialogRef: MatDialogRef<CarCreateComponent, boolean | undefined>,
              private service: CarCreateService) {

    this.sub = this.service.created$.subscribe((created) => {
      if (created) {
        this.dialogRef.close(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleSave(carFormValue: CarFormValue) {
    this.service.create(carFormValue);
  }

  handleCancel() {
    this.dialogRef.close();
  }
}
