import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../+model/note';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent {

  @Input()
  notes: Note[];

  @Output()
  selectedNote = new EventEmitter<Note>();

  handleSelection($event: MatSelectionListChange) {
    this.selectedNote.emit($event.source.selectedOptions.selected[0]?.value);
  }
}
