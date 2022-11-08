import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    mat-toolbar.mat-toolbar.mat-primary.mat-toolbar-single-row {
      padding: 0 10% 0 10%;
    }

    button.mat-focus-indicator.mat-menu-trigger.mat-button.mat-button-base {
      margin-left: 10%;
    }

    button.mat-focus-indicator.mat-button.mat-button-base {
      margin-left: 10%;
    }
  `]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
