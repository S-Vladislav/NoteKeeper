import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appNotificationsFocus]',
})
export class NotificationsFocusDirective implements OnInit, AfterViewInit {
  constructor(private elNotifications: ElementRef) {}

  ngAfterViewInit(): void {
    this.elNotifications.nativeElement.focus();
  }

  ngOnInit(): void {}
}
