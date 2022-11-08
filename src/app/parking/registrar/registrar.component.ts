import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styles: [
    `#registroVehiculos{
      margin-top: 10%;
      margin-bottom: 10%;
    }`
  ]
})
export class RegistrarComponent implements OnInit {

  type: string = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({type}) => this.type = type);
  }

}
