import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { INotifications } from '../../models/notifications.model';
import { ITags } from '../../models/tags.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsCrudService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllNotifications(): Observable<INotifications[]> {
    return this.http.get<INotifications[]>(
      this.baseApiUrl + '/api/Notifications'
    );
  }

  addNotification(
    addNotificationRequest: INotifications
  ): Observable<INotifications> {
    addNotificationRequest.notificationID = 1;
    return this.http.post<INotifications>(
      this.baseApiUrl + '/api/Notifications',
      addNotificationRequest
    );
  }

  getNotification(notificationID: string): Observable<INotifications> {
    return this.http.get<INotifications>(
      this.baseApiUrl + '/api/Notifications/' + notificationID
    );
  }

  updateNotification(
    notificationID: number,
    updateNotificationRequest: INotifications
  ): Observable<INotifications> {
    return this.http.put<INotifications>(
      this.baseApiUrl + '/api/Notifications/' + notificationID,
      updateNotificationRequest
    );
  }

  deleteNotification(notificationID: number): Observable<INotifications> {
    return this.http.delete<INotifications>(
      this.baseApiUrl + '/api/Notifications/' + notificationID
    );
  }
}
