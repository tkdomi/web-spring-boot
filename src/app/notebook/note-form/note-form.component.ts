import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { NoteForm } from './note-form';
import { Subscription } from 'rxjs';
import { Note } from '../+model/note';
import { NoteFormValue } from './+model/note-form-value';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NoteForm]
})
export class NoteFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  note: Note;

  @Output()
  save = new EventEmitter<NoteFormValue>();
  @Output()
  cancel = new EventEmitter();

  private sub: Subscription;

  constructor(public readonly form: NoteForm,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sub = this.form.$ref.valueChanges.subscribe(() => this.cdr.markForCheck());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('note')) {
      this.form.setValue(this.note);
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
