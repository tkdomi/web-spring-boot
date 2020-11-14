import { Injectable, OnDestroy } from '@angular/core';
import { CarFormValue } from '../+shared/car-form/+model/car-form-value';
import { BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription } from 'rxjs';
import { CarsRestService } from '../+service/cars-rest.service';
import { catchError, distinctUntilChanged, ignoreElements, map, switchMap, tap } from 'rxjs/operators';
import { Car } from '../+model/car';
import { Color } from '../+model/color';

@Injectable()
export class CarCreateService implements OnDestroy {

  private readonly created = new BehaviorSubject<boolean>(false);

  private readonly createAction = new Subject<CarFormValue>();

  private readonly sub: Subscription;

  readonly created$: Observable<boolean> = this.created.pipe(distinctUntilChanged());

  constructor(private restService: CarsRestService) {
    this.sub = this.createEffect().subscribe(noop);
  }

  create(form: CarFormValue): void {
    this.createAction.next(form);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private createEffect(): Observable<never> {
    return this.createAction.pipe(
      map((form) => this.mapToCar(form)),
      switchMap((car) => this.restService.createCar(car).pipe(
        tap(() => this.created.next(true)),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      )),
      ignoreElements()
    );
  }

  private mapToCar(form: CarFormValue): Car {
    return {
      mark: form.mark,
      model: form.model,
      color: Color[form.color]
    };
  }
}
