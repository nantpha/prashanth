import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TrackService } from './track.service';
import { Tree } from './git.model';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { CommitRequest } from '../ddl/git.model';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  gitURL: string = '15427851';
  gitBranch: string = 'master';

  gitURLInfo: Tree[];
  gitFolders: Tree[] = [];
  gitFiles: Tree[] = [];

  selectedFolder: string;
  fileContent: string;

  constructor(
    private dllService: TrackService,
    private shared: SharedService,
    private router: Router) {

  }

  ngOnInit() {

  }

  getGitURLInfo(): void {
    this.dllService.getGitURLInfo(this.gitURL, this.gitBranch).subscribe(
      data => {
        this.gitURLInfo = data;
        if (this.gitURLInfo) {
          this.gitFolders = this.gitURLInfo.filter(tree => tree.type === "tree");
        }
      }
    );
  }

  onSelectFolder(event: any): void {
    this.selectedFolder = event.target.value;
    if (this.gitURLInfo && this.selectedFolder) {
      this.dllService.getFilesInsideFolder(this.gitURL, this.gitBranch, this.selectedFolder).subscribe(
        data => {
          if (data) {
            this.gitFiles = data.filter(tree => tree.type === "blob");
          }
        });
    }
  }

  onSelectFile(event: any): void {

    const file = event.target.value;

    let commitRequest: CommitRequest = new CommitRequest();
    commitRequest.projectId = this.gitURL;
    commitRequest.branch = this.gitBranch;
    commitRequest.file = this.gitFiles.find( tmpFile => tmpFile.id === file).path;
    this.shared.commitRequest = commitRequest;
    console.log(commitRequest);

    this.dllService.getFileContent(this.gitURL, this.gitBranch, file).subscribe(
      data => {
        this.fileContent = data;
        this.shared.setData(this.fileContent);
        if ("test" === this.selectedFolder.toLowerCase()) {
          this.router.navigate(['newtrack/password']);
        }
        if ("dll" === this.selectedFolder.toLowerCase()) {
          this.router.navigate(['newtrack/ddl']);
        }
        if ("refresh" === this.selectedFolder.toLowerCase()) {
          this.router.navigate(['newtrack/refresh']);
        }
      }
    );
  }
}
