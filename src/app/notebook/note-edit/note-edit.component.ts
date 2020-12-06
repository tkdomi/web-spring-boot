import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NoteEditService } from './note-edit.service';
import { Observable, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../+model/note';
import { NoteFormValue } from '../note-form/+model/note-form-value';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NoteEditService]
})
export class NoteEditComponent {

  note$: Observable<Note>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  private sub: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public id: number,
              private dialogRef: MatDialogRef<NoteEditComponent, boolean | undefined>,
              private service: NoteEditService) {

    this.note$ = this.service.note$;
    this.loading$ = this.service.loading$;
    this.loaded$ = this.service.loaded$;

    this.sub = this.service.updated$.subscribe((updated) => {
      if (updated) {
        this.dialogRef.close(true);
      }
    });

    this.service.load(this.id);
  }

  handleSave(noteFormValue: NoteFormValue) {
    this.service.update(this.id, noteFormValue);
  }

  handleCancel() {
    this.dialogRef.close();
  }

}
