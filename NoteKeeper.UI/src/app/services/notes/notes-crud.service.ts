import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INotes } from '../../models/notes.model';

@Injectable({
  providedIn: 'root',
})
export class NotesCrudService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllNotes(): Observable<INotes[]> {
    return this.http.get<INotes[]>(this.baseApiUrl + '/api/Notes');
  }

  addNote(addNoteRequest: INotes): Observable<INotes> {
    addNoteRequest.noteId = 1;
    return this.http.post<INotes>(
      this.baseApiUrl + '/api/Notes',
      addNoteRequest
    );
  }

  getNote(noteId: string): Observable<INotes> {
    return this.http.get<INotes>(this.baseApiUrl + '/api/Notes/' + noteId);
  }

  updateNote(noteId: number, updateNoteRequest: INotes): Observable<INotes> {
    return this.http.put<INotes>(
      this.baseApiUrl + '/api/Notes/' + noteId,
      updateNoteRequest
    );
  }

  deleteNote(noteId: number): Observable<INotes> {
    return this.http.delete<INotes>(this.baseApiUrl + '/api/Notes/' + noteId);
  }
}
