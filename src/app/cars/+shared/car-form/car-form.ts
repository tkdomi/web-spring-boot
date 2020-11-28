import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Car } from '../../+model/car';
import { CarFormValue } from './+model/car-form-value';

@Injectable()
export class CarForm {
  readonly $ref: FormGroup;

  readonly mark: FormControl;
  readonly model: FormControl;
  readonly color: FormControl;
  readonly year: FormControl;

  constructor() {
    const form = new FormGroup({
      mark: new FormControl(null),
      model: new FormControl(null),
      color: new FormControl(null),
      year: new FormControl(null)
      }
    );

    this.$ref = form;
    this.mark = form.get('mark') as FormControl;
    this.model = form.get('model') as FormControl;
    this.color = form.get('color') as FormControl;
    this.year = form.get('year') as FormControl;
  }

  setValue(car: Car): void {
    this.mark.setValue(car.mark ?? '');
    this.model.setValue(car.model ?? '');
    this.color.setValue(car.color ?? null);
    this.year.setValue(car.year ?? null);
  }

  getValue(): CarFormValue {
    return {
      mark: this.mark.value,
      model: this.model.value,
      color: this.color.value,
      year: this.year.value
    };
  }
}
