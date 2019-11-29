import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { UploadfilesService } from './uploadfiles.service';
import { UploadFilesResponse } from './uploadfiles.model';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent implements OnInit, AfterViewInit {


  @ViewChild('uploadFilesDialogue', { static: false }) modelDialogue: TemplateRef<any>;
  private uploadFilesRef: BsModalRef;

  private formGroup: FormGroup;
  private selectedFiles: any[] = [];
  private message: string;
  private isSuccess: boolean;
  private errorMap: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private uploadService: UploadfilesService) {

  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      projectId: ['', Validators.required],
      branch: ['', Validators.required],
      folderPath: [''],
      commitMessage: ['', Validators.required],
      uploadFiles: this.formBuilder.array([
        this.formBuilder.group({ uploadFile: '' })
      ])
    });
  }

  ngAfterViewInit(): void {
    this.uploadFilesRef = this.modalService.show(this.modelDialogue, {
      keyboard: false, class: 'modal-dialog-centered gray modal-lg', ignoreBackdropClick: true
    });
  }

  get fields() {
    return this.formGroup.controls;
  }

  get uploadFilesAry() {
    return this.formGroup.get('uploadFiles') as FormArray;
  }

  addUploadFileControl(): void {
    this.uploadFilesAry.push(this.formBuilder.group({ uploadFile: '' }));
  }

  removeUpload(index: number): void {
    this.uploadFilesAry.removeAt(index);
    this.selectedFiles.splice(index, 1);
  }

  onUpload(event: any, index: number) {
    this.selectedFiles.splice(index, 1);
    this.selectedFiles[index] = event.target.files[0];
  }

  uploadFiles(): void {

    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      Object.keys(this.fields).forEach(key => {
        this.errorMap[key] = this.fields[key].invalid;
      });
      //return;
    }

    this.errorMap['uploadFiles'] = this.selectedFiles.length === 0;
    if (this.errorMap['uploadFiles']) {
      //return;
    }

    const frmData: FormData = new FormData();
    frmData.append("projectId", this.formGroup.get('projectId').value);
    frmData.append("branch", this.formGroup.get('branch').value);
    frmData.append("folderPath", this.formGroup.get('folderPath').value);
    frmData.append("commitMessage", this.formGroup.get('commitMessage').value);
    this.selectedFiles.forEach(file => {
      if (file) {
        frmData.append('uploadFiles', file);
      }
    });

    this.uploadService.uploadFiles(frmData).subscribe(
      (response: UploadFilesResponse) => {
        if (response) {
          this.message = response.message;
          this.isSuccess = response.success;
        }
      }, error => {
        console.log(`Error while uploading files: ${JSON.stringify(error)}`);
        this.message = `Error while uploading files: ${JSON.stringify(error)}`;
        this.isSuccess = false;
      });
  }
}
