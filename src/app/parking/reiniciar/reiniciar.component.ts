import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Component({
  selector: 'app-reiniciar',
  templateUrl: './reiniciar.component.html'
})
export class ReiniciarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  reiniciar(){
     this.dialog.open(DialogComponent, {
      width: '300px'
    }).afterClosed()
    .subscribe(result =>{
      if (result) {
        console.log('Marco Si!!');
        
      }
    })
  }

}
