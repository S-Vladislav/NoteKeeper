import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesModalCreateService {
  isNoteVisible$ = new BehaviorSubject<boolean>(false);

  open() {
    this.isNoteVisible$.next(true);
  }

  close() {
    this.isNoteVisible$.next(false);
  }

  constructor() {}
}
