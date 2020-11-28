import { Injectable, OnDestroy } from '@angular/core';
import { Car } from '../+model/car';
import { CarFormValue } from '../+shared/car-form/+model/car-form-value';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { CarsRestService } from '../+service/cars-rest.service';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { Color } from '../+model/color';

@Injectable()
export class CarEditService implements OnDestroy {

  private readonly car = new BehaviorSubject<Car>(null);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly updated = new BehaviorSubject<boolean>(false);

  private readonly loadAction = new Subject<number>();
  private readonly updateAction = new Subject<Car>();

  private readonly sub: Subscription;

  readonly car$: Observable<Car> = this.car.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly updated$: Observable<boolean> = this.updated.pipe(distinctUntilChanged());

  constructor(private restService: CarsRestService) {
    this.sub = merge(
      this.loadEffect(),
      this.updateEffect(),
    ).subscribe(noop);
  }

  load(id: number): void {
    this.loadAction.next(id);
  }

  update(carId: number, form: CarFormValue): void {
    this.updateAction.next({
      id: carId,
      mark: form.mark,
      model: form.model,
      color: Color[form.color],
      year: form.year
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
        this.loaded.next(false);
      }),
      switchMap((id) => this.restService.getCar(id).pipe(
        tap((car => {
          this.car.next(car);
          this.loaded.next(true);
        })),
        catchError(error => {
          console.log(error);
          return EMPTY;
        }),
        finalize(() => this.loading.next(false))
      )),
      ignoreElements()
    );
  }

  private updateEffect(): Observable<never> {
    return this.updateAction.pipe(
      switchMap((car) => this.restService.editCar(car).pipe(
        tap(() => this.updated.next(true)),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      )),
      ignoreElements()
    );
  }
}
