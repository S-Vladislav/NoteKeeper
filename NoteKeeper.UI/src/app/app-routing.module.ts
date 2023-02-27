import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsListComponent } from './components/notifications/notifications-list/notifications-list/notifications-list.component';
import { AboutListComponent } from './components/about/about-list/about-list/about-list.component';
import { NotificationsEditComponent } from './components/notifications/notifications-edit/notifications-edit.component';
import { TagsListComponent } from './components/tags/tags-list/tags-list.component';
import * as path from 'path';
import { NotesListComponent } from './components/notes/notes-list/notes-list.component';
import { NotesEditComponent } from './components/notes/notes-edit/notes-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AboutListComponent,
  },

  {
    path: 'about',
    component: AboutListComponent,
  },

  {
    path: 'notifications',
    component: NotificationsListComponent,
  },

  {
    path: 'notifications/edit/:notificationID',
    component: NotificationsEditComponent,
  },

  {
    path: 'tags',
    component: TagsListComponent,
  },

  {
    path: 'notes/edit/:noteId',
    component: NotesEditComponent,
  },

  {
    path: 'notes',
    component: NotesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
