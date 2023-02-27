// default with routing and animations
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Common
import { HttpClientModule } from '@angular/common/http';

// Directives
import { FocusDirective } from './directives/tests/focus/focus.directive';
import { NotificationsFocusDirective } from './directives/notifications/notifications-focus.directive';

// Components
import { NavComponent } from './components/nav/nav/nav.component';
import { NotificationsListComponent } from './components/notifications/notifications-list/notifications-list/notifications-list.component';
import { AboutListComponent } from './components/about/about-list/about-list/about-list.component';
import { NotificationsCreateComponent } from './components/notifications/notifications-create/notifications-create.component';
import { NotificationsModalComponent } from './components/notifications/notifications-modal/notifications-modal.component';
import { NotificationsEditComponent } from './components/notifications/notifications-edit/notifications-edit.component';
import { TagsListComponent } from './components/tags/tags-list/tags-list.component';
import { NotesListComponent } from './components/notes/notes-list/notes-list.component';
import { NotesCreateComponent } from './components/notes/notes-create/notes-create.component';
import { NotesEditComponent } from './components/notes/notes-edit/notes-edit.component';
import { NotesModalComponent } from './components/notes/notes-modal/notes-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FocusDirective,
    NavComponent,
    NotificationsListComponent,
    AboutListComponent,
    NotificationsModalComponent,
    NotificationsCreateComponent,
    NotificationsFocusDirective,
    NotificationsCreateComponent,
    NotificationsEditComponent,
    TagsListComponent,
    NotesListComponent,
    NotesCreateComponent,
    NotesEditComponent,
    NotesModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatOptionModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
