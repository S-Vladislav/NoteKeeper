import { Component, Input, OnInit } from '@angular/core';
import { NotificationsModalCreateService } from '../../../services/notifications/notifications-modal-create.service';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.scss'],
})
export class NotificationsModalComponent implements OnInit {
  @Input() notificationTitle: string;

  constructor(public modalService: NotificationsModalCreateService) {}

  ngOnInit(): void {}
}
