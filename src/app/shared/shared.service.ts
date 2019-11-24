import { Injectable } from '@angular/core';
import { CommitRequest } from '../ddl/git.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {

  }

  fileContentData: any;
  private _commitRequest: CommitRequest;

  setData(data: any) {
    this.fileContentData = data;
  }

  getData(): any {
    return this.fileContentData;
  }

  get commitRequest() {
    return this._commitRequest;
  }

  set commitRequest(commitRequest: CommitRequest) {
    this._commitRequest = commitRequest;
  }
}
