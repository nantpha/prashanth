import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tree } from './git.model';
import { CommitRequest, CommitResponse } from '../ddl/git.model';
import { environment } from '../../environments/environment';

@Injectable()
export class TrackService {

    constructor(private http: HttpClient) {

    }

    getGitURLInfo(projectId: string, branch: string): Observable<Tree[]> {
        //const fullUrl: string = `https://gitlab.prod.fedex.com/api/v4/projects/${projectId}/repository/tree?ref=${branch}`;
        const fullUrl = 'https://gitlab.com/api/v4/projects/15427851/repository/tree?ref=master';
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('Access-Control-Allow-Origin', '*')
            .append('PRIVATE-TOKEN', 'z4Vmu1Q2CQFpGLBqkkus');
        return this.http.get<Tree[]>(fullUrl, { headers });
    }

    getFilesInsideFolder(projectId: string, branch: string, folder: string): Observable<Tree[]> {
        //const fullUrl: string = `https://gitlab.prod.fedex.com/api/v4/projects/${projectId}/repository/tree?path=${folder}&ref=${branch}`;
        const fullUrl = 'https://gitlab.com/api/v4/projects/15427851/repository/tree?ref=master&path=test';
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('Access-Control-Allow-Origin', '*')
            .append('PRIVATE-TOKEN', 'z4Vmu1Q2CQFpGLBqkkus');
        //.append('PRIVATE-TOKEN', 'nh_utFkwj1pkK6Zm6Lus');

        return this.http.get<Tree[]>(fullUrl, { headers });
    }

    getFileContent(projectId: string, branch: string, file: string): Observable<string> {
        //const fullUrl: string = `https://gitlab.prod.fedex.com/api/v4/projects/${projectId}/repository/blobs/${file}/raw?ref=${branch}`;
        const fullUrl = 'https://gitlab.com/api/v4/projects/15427851/repository/blobs/a261fd079a97fbe7a5e911a94c27b8a089bd4f78/raw?ref=master';
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/text')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('Access-Control-Allow-Origin', '*')
            .append('PRIVATE-TOKEN', 'z4Vmu1Q2CQFpGLBqkkus');
        return this.http.get(fullUrl, { headers, responseType: "text" }
        );
    }

    commitFile(commitRequest: CommitRequest): Observable<CommitResponse> {
        const endpoint = environment.endpointBaseUrl + environment.endpoints.dllCommit;
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
        return this.http.post<CommitResponse>(endpoint, commitRequest, { headers })
    }
}