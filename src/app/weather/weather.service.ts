import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { Weather } from './+model/weather';
import { WeatherRestService } from './+service/weather-rest.service';

@Injectable()
export class WeatherService implements OnDestroy {

  private readonly weather = new BehaviorSubject<Weather>(null);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);

  private readonly loadAction = new Subject<string>();

  private readonly sub: Subscription;

  constructor(private restService: WeatherRestService) {
    this.sub = this.loadEffect().subscribe(noop);
  }

  readonly weather$: Observable<Weather> = this.weather.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());

  findWeather(city: string): void {
    this.loadAction.next(city);
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
      switchMap((city) => this.restService.getWeather(city).pipe(
        tap((weather => {
          this.weather.next(weather);
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
}
