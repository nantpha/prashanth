import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UploadFilesResponse } from './uploadfiles.model';

@Injectable({
  providedIn: 'root'
})
export class UploadfilesService {

  constructor(private http: HttpClient) {

  }

  uploadFiles(formContent: any): Observable<UploadFilesResponse> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    const endpoint = environment.endpointBaseUrl + environment.endpoints.uploadfiles;
    return this.http.post<UploadFilesResponse>(endpoint, formContent, { headers: headers });
  }
}
