import { Component, Input, OnInit } from '@angular/core';
import { NotesModalCreateService } from '../../../services/notes/notes-modal-create.service';

@Component({
  selector: 'app-notes-modal',
  templateUrl: './notes-modal.component.html',
  styleUrls: ['./notes-modal.component.scss'],
})
export class NotesModalComponent implements OnInit {
  @Input() noteTitle: string;

  constructor(public modalNotesService: NotesModalCreateService) {}

  ngOnInit(): void {}
}
