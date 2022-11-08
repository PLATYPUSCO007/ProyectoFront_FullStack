import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html'
})
export class AltaComponent implements OnInit {

  type: string = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({type}) => this.type = type );
  }

}
