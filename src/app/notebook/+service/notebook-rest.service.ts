import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../+model/note';
import { NoteFormValue } from '../note-form/+model/note-form-value';

@Injectable({
  providedIn: 'root'
})
export class NotebookRestService {

  private readonly API_URL = 'http://localhost:4200/api/v1/notes';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.API_URL);
  }

  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.API_URL}/${id}`);
  }

  deleteNote(id: number): Observable<{ }> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  createNote(note: NoteFormValue): Observable<NoteFormValue> {
    return this.http.post<NoteFormValue>(this.API_URL, note);
  }

  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(this.API_URL, note);
  }
}
