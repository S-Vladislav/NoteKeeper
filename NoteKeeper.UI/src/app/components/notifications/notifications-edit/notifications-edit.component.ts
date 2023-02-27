import { Component, OnInit } from '@angular/core';
import { INotifications } from '../../../models/notifications.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsCrudService } from '../../../services/notifications/notifications-crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notifications-edit',
  templateUrl: './notifications-edit.component.html',
  styleUrls: ['./notifications-edit.component.scss'],
})
export class NotificationsEditComponent implements OnInit {
  constructor(
    private notificationsRouteEdit: ActivatedRoute,
    private notificationCrudService: NotificationsCrudService,
    private router: Router
  ) {}

  notificationFormEdit = new FormGroup({
    date: new FormControl<string>('', [Validators.required]), // TODO: don't know how to validate date properly, pattern doesn't work
    text: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });
  notificationDetails: INotifications = {
    notificationID: 1,
    notificationText: '',
    completionDate: new Date(),
  };

  ngOnInit(): void {
    this.notificationsRouteEdit.paramMap.subscribe({
      next: (params) => {
        const notificationID = params.get('notificationID');

        if (notificationID) {
          this.notificationCrudService
            .getNotification(notificationID)
            .subscribe({
              next: (response) => {
                this.notificationDetails = response;
              },
            });
        }
      },
    });
  }

  updateNotification() {
    this.notificationCrudService
      .updateNotification(
        this.notificationDetails.notificationID,
        this.notificationDetails
      )
      .subscribe({
        next: (response) => {
          this.router.navigate(['notifications']);
        },
      });
  }

  deleteNotification(notificationID: number) {
    this.notificationCrudService.deleteNotification(notificationID).subscribe({
      next: (response) => {
        this.router.navigate(['notifications']);
      },
    });
  }
}
