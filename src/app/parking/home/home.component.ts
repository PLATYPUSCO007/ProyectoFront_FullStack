import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .mat-card-header-text {
    margin: auto !important;
  }
  .home-card {
    max-width: 60%;
    text-align: center;
    margin: auto;
  }
  `]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
