import { Component, OnInit } from '@angular/core';
import { sqlScripts, Sql } from './ddl';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-ddl',
  templateUrl: './ddl.component.html',
  styleUrls: ['./ddl.component.css']
})
export class DdlComponent implements OnInit {

  sqlScripts:sqlScripts =new sqlScripts();
sqlScript:Sql=new Sql();  
  regModel: sqlScripts;
  showNew: Boolean = false;
  submitType: string = 'Save';
  saveType:string='Enter JSON inforamtion';
  selectedRow: number;
  dataFromDll:sqlScripts;
  constructor(private shared:SharedService) {
    this.regModel = new sqlScripts;
    this.dataFromDll = this.shared.getData();
    if(this.dataFromDll){
      console.log(this.dataFromDll);
    
  }
  }
  ngOnInit() {}

  onNew() {
    this.sqlScripts = new sqlScripts();
    this.submitType = 'Save';
    this.showNew = true;
  }

  onSelectFile(event) {
    var file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = evnt => {
      const contentFromFile: any = JSON.parse(reader.result as string);
      console.log(contentFromFile);
      this.sqlScript.sqlScripts.push(...contentFromFile.sqlScripts);
    }
    reader.readAsText(file);
   // this.sho=false;

   }  

  // This method associate to Save Button.
  onSave() {
    if (this.submitType == 'Save') {
    // this.track.credentials.push(this.credentials);
    this.sqlScript.sqlScripts.push(this.sqlScripts);
    this.sqlScripts=new sqlScripts();
		console.log(this.sqlScript);
    } else {
      this.sqlScript.sqlScripts[this.selectedRow].sqlScriptName = this.sqlScripts.sqlScriptName;
      this.sqlScript.sqlScripts[this.selectedRow].directory = this.sqlScripts.directory;
    }
    this.showNew = false;
  }

  onEdit(index: number) {
    this.selectedRow = index;
    this.sqlScripts = Object.assign({}, this.sqlScript.sqlScripts[this.selectedRow]);
    this.submitType = 'Update';
	  this.saveType = 'Update JSON information';
    this.showNew = true;
  }

  onDelete(index: number) {
    this.sqlScript.sqlScripts.splice(index, 1);
  }

  onCancel() {
    this.showNew = false;
  }

  submit(){
    this.download(JSON.stringify(this.sqlScript,null,2),"myjson.json","text/plain")
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
