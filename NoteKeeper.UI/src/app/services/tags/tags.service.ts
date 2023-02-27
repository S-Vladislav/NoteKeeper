import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITags } from '../../models/tags.model';
import { INotifications } from '../../models/notifications.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllTags(): Observable<ITags[]> {
    return this.http.get<ITags[]>(this.baseApiUrl + '/api/Tags');
  }

  addTag(addTagRequest: ITags): Observable<ITags> {
    addTagRequest.tagId = 1;
    return this.http.post<ITags>(this.baseApiUrl + '/api/Tags', addTagRequest);
  }

  deleteTag(tagId: number): Observable<ITags> {
    return this.http.delete<ITags>(this.baseApiUrl + '/api/Tags/' + tagId);
  }

  getTag(tagId: string): Observable<ITags> {
    return this.http.get<ITags>(this.baseApiUrl + '/api/Tags/' + tagId);
  }

  updateTag(tagId: number, updateTagRequest: ITags): Observable<ITags> {
    return this.http.put<ITags>(
      this.baseApiUrl + '/api/Tag/' + tagId,
      updateTagRequest
    );
  }
}
