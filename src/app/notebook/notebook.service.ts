import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { Note } from './+model/note';
import { NotebookRestService } from './+service/notebook-rest.service';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class NotebookService implements OnDestroy {

  private readonly notes = new BehaviorSubject<Note[]>([]);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly deleted = new BehaviorSubject<boolean>(false);

  private readonly loadAction = new Subject();
  private readonly deleteAction = new Subject<{id: number}>();

  private readonly sub: Subscription;

  constructor(private restService: NotebookRestService) {
    this.sub = merge(
      this.loadEffect(),
      this.deleteEffect()
    ).subscribe(noop);
  }

  readonly notes$: Observable<Note[]> = this.notes.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly deleted$: Observable<boolean> = this.deleted.asObservable();

  load(): void {
    this.loadAction.next();
  }

  delete(id: number): void {
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
      switchMap(() => this.restService.getNotes().pipe(
        tap((notes => {
          this.notes.next([...notes.sort((n1, n2) => n1.title.localeCompare(n2.title))]);
          this.loaded.next(true);
        })),
        catchError(error => {
          console.error(error);
          return EMPTY;
        }),
        finalize(() => this.loading.next(false))
      )),
      ignoreElements()
    );
  }

  private deleteEffect(): Observable<never> {
    return this.deleteAction.pipe(
      switchMap(({id}) => this.restService.deleteNote(id).pipe(
        tap(() => this.deleted.next(true)),
        catchError(error => {
          console.error(error);
          return EMPTY;
        })
      )),
      ignoreElements()
    );
  }
}
