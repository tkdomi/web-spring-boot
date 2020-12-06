import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { NoteCreateService } from './note-create.service';
import { NoteFormValue } from '../note-form/+model/note-form-value';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NoteCreateService]
})
export class NoteCreateComponent implements OnDestroy {

  private sub: Subscription;

  constructor(private dialogRef: MatDialogRef<NoteCreateComponent, boolean | undefined>,
              private service: NoteCreateService) {

    this.sub = this.service.added$.subscribe((added) => {
      if (added) {
        this.dialogRef.close(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleSave(noteFormValue: NoteFormValue) {
    this.service.add(noteFormValue);
  }

  handleCancel() {
    this.dialogRef.close();
  }
}
