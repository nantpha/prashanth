import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'newtrack',
  templateUrl: './new-track.component.html',
  styleUrls:['./newTrack.component.css']
})
export class NewTrackComponent implements OnInit {


items:string[]=[];

constructor()
{
	
	
	this.items.push("password");
	this.items.push("Ddl");
}
ngOnInit() {
  }
  
}
