import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsModalCreateService } from '../../../services/notifications/notifications-modal-create.service';
import { INotifications } from '../../../models/notifications.model';
import { NotificationsCrudService } from '../../../services/notifications/notifications-crud.service';

@Component({
  selector: 'app-notifications-create',
  templateUrl: './notifications-create.component.html',
  styleUrls: ['./notifications-create.component.scss'],
})
export class NotificationsCreateComponent implements OnInit {
  @Output() notificationCreated = new EventEmitter<boolean>();

  constructor(
    public modalService: NotificationsModalCreateService,
    private notificationsService: NotificationsCrudService
  ) {}

  ngOnInit(): void {}

  // Add New Notification
  addNotificationRequest: INotifications = {
    notificationID: 1,
    notificationText: '',
    completionDate: new Date(),
  };

  submitNotification() {
    this.notificationsService
      .addNotification(this.addNotificationRequest)
      .subscribe({
        next: (notification) => {
          console.log(this.addNotificationRequest);
          this.notificationCreated.emit(true); // emit the event
          this.modalService.close(); // close the modal
        },
      });
  }

  // Form Validators, if notificationForm == invalid then Create button is disabled

  notificationForm = new FormGroup({
    date: new FormControl<string>('', [Validators.required]), // TODO: don't know how to validate date properly, pattern doesn't work
    text: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });

  // Controls for FormGroup
  get text() {
    return this.notificationForm.controls.text as FormControl;
  }

  get date() {
    return this.notificationForm.controls.date as FormControl;
  }
}
