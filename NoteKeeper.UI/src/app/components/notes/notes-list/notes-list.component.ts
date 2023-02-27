import { Component, OnInit } from '@angular/core';
import { INotes } from '../../../models/notes.model';
import { NotesModalCreateService } from '../../../services/notes/notes-modal-create.service';
import { NotesCrudService } from '../../../services/notes/notes-crud.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  notes: INotes[] = [];

  constructor(
    public modalNoteService: NotesModalCreateService,
    private notesCrudService: NotesCrudService
  ) {}

  ngOnInit(): void {
    this.refreshNotes();
  }

  refreshNotes() {
    this.notesCrudService.getAllNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
        console.log(notes);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
