import {Directive, EventEmitter, HostListener, Output,ElementRef} from '@angular/core';
import {NgControl} from'@angular/forms'
@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {
  constructor(private control:NgControl)
  {

  }
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event) {
    this.value = $event.target.value.toUpperCase();
    this.ngModelChange.emit(this.value);
  }
  @HostListener('input', ['$event']) onEvent($event) {
    const str:string=this.control.value
    this.control.control.setValue(str.toUpperCase());
  }
}