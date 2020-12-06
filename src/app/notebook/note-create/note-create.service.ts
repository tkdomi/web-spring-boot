import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { NotebookRestService } from '../+service/notebook-rest.service';
import { NoteFormValue } from '../note-form/+model/note-form-value';

@Injectable()
export class NoteCreateService implements OnDestroy {

  private readonly added = new BehaviorSubject<boolean>(false);

  private readonly addAction = new Subject<NoteFormValue>();

  private readonly sub: Subscription;

  constructor(private restService: NotebookRestService) {
    this.sub = this.addEffect().subscribe(noop);
  }

  readonly added$: Observable<boolean> = this.added.pipe(distinctUntilChanged());

  add(note: NoteFormValue): void {
    this.addAction.next(note);
  }

  private addEffect(): Observable<never> {
    return this.addAction.pipe(
      switchMap(note => this.restService.createNote(note).pipe(
        tap(() => this.added.next(true)),
        catchError(error => {
          console.error(error);
          return EMPTY;
        })
      )),
      ignoreElements()
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
