import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Note } from '../+model/note';
import { NoteFormValue } from './+model/note-form-value';

@Injectable()
export class NoteForm {
  readonly $ref: FormGroup;

  readonly title: FormControl;
  readonly text: FormControl;

  constructor() {
    const form = new FormGroup({
      title: new FormControl(null),
      text: new FormControl(null)
    });

    this.$ref = form;
    this.title = form.get('title') as FormControl;
    this.text = form.get('text') as FormControl;
  }

  public setValue(note: Note): void {
    this.title.setValue(note.title ?? '');
    this.text.setValue(note.text ?? '');
  }

  public getValue(): NoteFormValue {
    return {
      title: this.title.value,
      text: this.text.value
    }
  }
}
