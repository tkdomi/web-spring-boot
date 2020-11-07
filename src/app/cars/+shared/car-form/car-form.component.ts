import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Color } from '../../+model/color';
import { Car } from '../../+model/car';
import { CarForm } from './car-form';
import { Subscription } from 'rxjs';
import { CarFormValue } from './+model/car-form-value';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarForm]
})
export class CarFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  car: Car | null = null;

  @Output()
  save = new EventEmitter<CarFormValue>();
  @Output()
  cancel = new EventEmitter();

  readonly colors: string[] = Object.keys(Color);

  private sub: Subscription;

  constructor(public readonly form: CarForm,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sub = this.form.$ref.valueChanges.subscribe(() => this.cdr.markForCheck());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('car')) {
      this.form.setValue(this.car);
    }
  }

  handleSubmit(): void {
    if (this.form.$ref.invalid) {
      return;
    }
    this.save.emit(this.form.getValue());
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
