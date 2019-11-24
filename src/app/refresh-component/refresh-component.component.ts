import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { sqlScripts, Sql, Credentials } from './Refresh';
import { JsonPipe } from '@angular/common';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-refresh-component',
  templateUrl: './refresh-component.component.html',
  styleUrls: ['./refresh-component.component.css']
})
export class RefreshComponentComponent implements OnInit {

  orderValue = false;
  sql: Sql = new Sql();
  myForm: FormGroup;
  sqlScripts: sqlScripts = new sqlScripts();
  count = 1;
  selectedRow: number;
  showNew=false;
  show=true;
  fom:boolean=false;
  sho:boolean=true;
  fnd:boolean=false;
  dataFromDll=this.sql;
  constructor(private fb: FormBuilder,private shared:SharedService) {
    this.count = 1;
    this.dataFromDll = this.shared.getData();
    if(this.dataFromDll){
      console.log(this.dataFromDll);
    
  }
  }
  onSave() {
    
      this.sql.sqlScripts[this.selectedRow].sqlScriptName = this.sqlScripts.sqlScriptName;
      this.sql.sqlScripts[this.selectedRow].directory = this.sqlScripts.directory;
      this.sql.sqlScripts[this.selectedRow].credentials = this.sqlScripts.credentials;
      this.fom=false;
      this.showNew=true;
    
  }
  onSelectFile(event) {
    var file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = evnt => {
      const contentFromFile: any = JSON.parse(reader.result as string);
      console.log(contentFromFile);
      this.sql.sqlScripts.push(...contentFromFile.sqlScripts);
    }
    reader.readAsText(file);
   // this.sho=false;

   }  

  new(){
    this.sho=false;
    this.showNew=true;
  }
  get credentialsArray() {
   
    return <FormArray>this.myForm.get('credentials');
  }
  addcredentialsArray() {
    this.count+=1;
    this.credentialsArray.push(this.addcredentialsGroup());
  }
  Save() {
    if(this.fnd)
    {
      this.sql.sqlScripts.splice(this.selectedRow, 1);
      this.fnd = false; // After edit reset dne 
    }
    let credentials: Credentials[] = this.credentialsArray.value;
    const Obj: sqlScripts = new sqlScripts();
    Obj.sqlScriptName = this.myForm.get('sqlScriptName').value
    Obj.directory = this.myForm.get('directory').value
    Obj.credentials = credentials;
    this.sql.sqlScripts.push(Obj);
    this.myForm.reset();
    this.count = 0;
    this.credentialsArray.controls.forEach(control => control.patchValue({"order": ++this.count}));
    this.credentialsArray.clear();
    this.credentialsArray.push(this.addcredentialsGroup());
  }

  addcredentialsGroup() {
    return this.fb.group({
      credentialId: [],
	   order: this.count,
    });
  }
  
  remove(ndex) {
    if(this.credentialsArray.length>1){
    this.credentialsArray.removeAt(ndex);
    this.count=this.count-1;
  }}
  ngOnInit() {
    this.myForm = this.fb.group({
      sqlScriptName: [],
      directory: [],
      credentials: this.fb.array([this.addcredentialsGroup()]),
    })
    this.orderValue = true;
  }
  submit(){
    if(!this.fom){
     this.download(JSON.stringify(this.sql,null,1),"myjson.json","text/plain")
   } }
 
   onDelete(index: number) {
    this.sql.sqlScripts.splice(index, 1);
  }
 


  onEdit(index: number) {
    this.fnd=true;
    this.selectedRow = index;
    this.sqlScripts = Object.assign({}, this.sql.sqlScripts[this.selectedRow]);
    this.credentialsArray.clear();
    for(let i=0;i< this.sql.sqlScripts[this.selectedRow].credentials.length;i++)    
    {       
      this.credentialsArray.push( this.fb.group({
        credentialId:this.sql.sqlScripts[this.selectedRow].credentials[i].credentialId,
       order: this.sql.sqlScripts[this.selectedRow].credentials[i].order,
      })); 
         
    } 
    this.myForm.setValue({
      sqlScriptName: this.sqlScripts.sqlScriptName,
      directory: this.sqlScripts.directory,
      credentials:
      {
      }
    });
     


    //this.showNew = false;
    this.show=false;
    this.fom=true;
    this.fnd=true;
  }
 
 
 
   download(strData, strFileName, strMimeType) {
     var D = document,
         A = arguments,
         a = D.createElement("a"),
         d = A[0],
         n = A[1],
         t = A[2] || "text/plain";
 
     //build download link:
     a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);
 
 
     if ((window as any).MSBlobBuilder) { // IE10
         var bb = new MSBlobBuilder();
         bb.append(strData);
         return navigator.msSaveBlob(bb, strFileName);
     } /* end if(window.MSBlobBuilder) */
 
 
 
     if ('download' in a) { //FF20, CH19
         a.setAttribute("download", n);
         a.innerHTML = "downloading...";
         D.body.appendChild(a);
         setTimeout(function() {
             var e = D.createEvent("MouseEvents");
             e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
             a.dispatchEvent(e);
             D.body.removeChild(a);
         }, 66);
         return true;
     }; /* end if('download' in a) */
 
 
 
     //do iframe dataURL download: (older W3)
     var f = D.createElement("iframe");
     D.body.appendChild(f);
     f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
     setTimeout(function() {
         D.body.removeChild(f);
     }, 333);
     return true;
 }

}
