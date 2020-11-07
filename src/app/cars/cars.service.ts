import { Injectable, OnDestroy } from '@angular/core';
import { Car } from './+model/car';
import { CarsRestService } from './+service/cars-rest.service';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { Color } from './+model/color';

@Injectable()
export class CarsService implements OnDestroy {

  private readonly cars = new BehaviorSubject<Car[]>([]);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly deleted = new BehaviorSubject<boolean>(false);

  private readonly loadAction = new Subject();
  private readonly loadByColorAction = new Subject<{color: Color}>();
  private readonly deleteAction = new Subject<{id: number}>();

  private readonly sub: Subscription;

  constructor(private restService: CarsRestService) {
    this.sub = merge(
      this.loadEffect(),
      this.loadByColorEffect(),
      this.deleteEffect()
    ).subscribe(noop);
  }

  readonly cars$: Observable<Car[]> = this.cars.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly deleted$: Observable<boolean> = this.deleted.pipe(distinctUntilChanged());

  load(): void {
    this.loadAction.next();
  }

  filterByColor(color: Color): void {
    this.loadByColorAction.next({color});
  }

  deleteCar(id: number) {
    this.deleteAction.next({id});
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
      switchMap(() => this.restService.getCars().pipe(
        tap((cars => {
          this.cars.next(cars);
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

  private loadByColorEffect() {
    return this.loadByColorAction.pipe(
      tap(() => {
        this.loading.next(true);
        this.loaded.next(false);
      }),
      switchMap(({color}) => this.restService.getCarsByColor(color).pipe(
        tap((cars => {
          this.cars.next(cars);
        })),
        catchError(error => {
          console.log(error);
          this.cars.next([]);
          return EMPTY;
        }),
        finalize(() => {
          this.loading.next(false);
          this.loaded.next(true);
        })
      )),
      ignoreElements()
    );
  }

  private deleteEffect(): Observable<never> {
    return this.deleteAction.pipe(
      switchMap(({id}) => this.restService.deleteCar(id).pipe(
        tap(() => this.deleted.next(true)),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      )),
      ignoreElements()
    );
  }
}
