import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appTitle]'
})
export class AppTitleDirective {

  constructor( private el: ElementRef) {
    this.toAppTitle()
  }

  toAppTitle() {
    this.el.nativeElement.style['font-size'] = '20pt'
  }

}
