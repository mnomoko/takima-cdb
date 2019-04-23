import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class ErrorAlertComponent implements OnInit {
  @Input() error: any;
  visiblityState: string;

  ngOnInit(): void {
    this.visiblityState = 'shown';
    setTimeout(() => this.visiblityState = 'hidden', 2000);
    setTimeout(() => this.error = undefined, 3500);
  }
}
