import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../+model/note';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent {

  @Input()
  note: Note | null = null;

  @Output()
  deleteNote = new EventEmitter<number>();
  @Output()
  editNote = new EventEmitter<Note>();

  handleEditNote() {
    this.editNote.emit(this.note);
  }

  handleDeleteNote() {
    this.deleteNote.emit(this.note.id);
  }
}
