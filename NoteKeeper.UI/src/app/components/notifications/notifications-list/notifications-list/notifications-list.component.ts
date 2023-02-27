import { Component, OnInit } from '@angular/core';
import { NotificationsModalCreateService } from '../../../../services/notifications/notifications-modal-create.service';
import { NotificationsCrudService } from '../../../../services/notifications/notifications-crud.service';
import { INotifications } from '../../../../models/notifications.model';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent implements OnInit {
  notifications: INotifications[] = [];

  constructor(
    public modalService: NotificationsModalCreateService,
    private notificationsCrudService: NotificationsCrudService
  ) {}

  // Method for this.notificationCreated.emit(true) to refresh notifications-list.component.html
  // after new element has been added
  ngOnInit(): void {
    this.refreshNotifications();
  }

  refreshNotifications() {
    this.notificationsCrudService.getAllNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        console.log(notifications);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
