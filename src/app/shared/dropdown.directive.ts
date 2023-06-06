import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;
  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }
}

// close menu from any way:
// export class DropdownDirective {
//   @HostBinding('class.open') isOpen = false;
//   @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
//     this.isOpen = this.elRef.nativeElement.contains(event.target)
//       ? !this.isOpen
//       : false;
//   }
//   constructor(private elRef: ElementRef) {}
// }

// another way:
// export class DropdownDirective {
//   constructor(private el: ElementRef) {}
//   @HostListener('click') toggleOpenMenu(){
//     this.el.nativeElement.classList.toggle('open');
//   }
// }
