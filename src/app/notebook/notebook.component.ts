import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NotebookService } from './notebook.service';
import { Observable, Subscription } from 'rxjs';
import { Note } from './+model/note';
import { map } from 'rxjs/operators';
import { NoteCreateComponent } from './note-create/note-create.component';
import { MatDialog } from '@angular/material/dialog';
import { NoteEditComponent } from './note-edit/note-edit.component';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NotebookService]
})
export class NotebookComponent implements OnInit, OnDestroy {

  notes$: Observable<Note[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  noNotes$: Observable<boolean>;

  note: Note = null;

  private sub: Subscription;

  constructor(private service: NotebookService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.notes$ = this.service.notes$;
    this.loading$ = this.service.loading$;
    this.loaded$ = this.service.loaded$;
    this.noNotes$ = this.notes$.pipe(map((notes) => notes.length === 0));

    this.sub = this.service.deleted$.subscribe((deleted) => {
      if (deleted) {
        this.reloadNotes();
      }
    });

    this.service.load();
  }

  handleSelectedChange(selectedNote: Note) {
    this.note = selectedNote;
  }

  handleDeleteNote(id: number) {
    this.service.delete(id);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleAddNote() {
    this.dialog
      .open(NoteCreateComponent, {width: '500px'})
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.reloadNotes();
        }
      });
  }

  handleEditNote(note: Note) {
    this.dialog
      .open(NoteEditComponent, {width: '500px', data: note.id})
      .afterClosed()
      .subscribe((edited) => {
        if (edited) {
          this.reloadNotes();
        }
      })
  }

  private reloadNotes(): void {
    this.note = null;
    this.service.load();
  }
}
