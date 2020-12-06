import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { Note } from '../+model/note';
import { NotebookRestService } from '../+service/notebook-rest.service';
import { NoteFormValue } from '../note-form/+model/note-form-value';

@Injectable()
export class NoteEditService implements OnDestroy {

  private readonly note = new BehaviorSubject<Note>(null);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly updated = new BehaviorSubject<boolean>(false);

  private readonly loadAction = new Subject<number>();
  private readonly updateAction = new Subject<Note>();

  private readonly sub: Subscription;

  readonly note$: Observable<Note> = this.note.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly updated$: Observable<boolean> = this.updated.pipe(distinctUntilChanged());

  constructor(private restService: NotebookRestService) {
    this.sub = merge(
      this.loadEffect(),
      this.updateEffect(),
    ).subscribe(noop);
  }

  load(id: number): void {
    this.loadAction.next(id);
  }

  update(noteId: number, form: NoteFormValue): void {
    this.updateAction.next({
      id: noteId,
      title: form.title,
      text: form.text
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
      switchMap((id) => this.restService.getNote(id).pipe(
        tap((note => {
          this.note.next(note);
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
      switchMap((note) => this.restService.editNote(note).pipe(
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
