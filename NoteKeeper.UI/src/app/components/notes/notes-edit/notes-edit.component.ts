import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesCrudService } from '../../../services/notes/notes-crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INotes } from '../../../models/notes.model';

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.scss'],
})
export class NotesEditComponent implements OnInit {
  constructor(
    private notesRouteEdit: ActivatedRoute,
    private notesCrudService: NotesCrudService,
    private router: Router
  ) {}

  noteDetails: INotes = {
    noteId: 1,
    noteHeader: '',
    noteText: '',
  };

  notesFormEdit = new FormGroup({
    header: new FormControl<string>(''),
    text: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });

  ngOnInit(): void {
    this.notesRouteEdit.paramMap.subscribe({
      next: (params) => {
        const noteId = params.get('noteId');

        if (noteId) {
          this.notesCrudService.getNote(noteId).subscribe({
            next: (response) => {
              this.noteDetails = response;
            },
          });
        }
      },
    });
  }

  updateNote() {
    this.notesCrudService
      .updateNote(this.noteDetails.noteId, this.noteDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['notes']);
        },
      });
  }

  deleteNote(noteId: number) {
    this.notesCrudService.deleteNote(noteId).subscribe({
      next: (response) => {
        this.router.navigate(['notes']);
      },
    });
  }
}
