import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private uploadService: UploadfilesService) {

  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
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

    const frmData: FormData = new FormData();
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
