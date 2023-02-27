import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesModalCreateService } from '../../../services/notes/notes-modal-create.service';
import { NotesCrudService } from '../../../services/notes/notes-crud.service';
import { INotes } from '../../../models/notes.model';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.scss'],
})
export class NotesCreateComponent implements OnInit {
  @Output() noteCreated = new EventEmitter<boolean>();

  constructor(
    public modalNoteService: NotesModalCreateService,
    private noteService: NotesCrudService
  ) {}

  ngOnInit(): void {}

  // Add New Note
  addNoteRequest: INotes = {
    noteId: 1,
    noteHeader: '',
    noteText: '',
  };

  submitNote() {
    this.noteService.addNote(this.addNoteRequest).subscribe({
      next: (note) => {
        console.log(this.addNoteRequest);
        this.noteCreated.emit(true); // emit the event
        this.modalNoteService.close(); // close the modal
      },
    });
  }

  // Form Validators, if notificationForm == invalid then Create button is disabled

  noteForm = new FormGroup({
    text: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });

  // Controls for FormGroup
  get text() {
    return this.noteForm.controls.text as FormControl;
  }
}
