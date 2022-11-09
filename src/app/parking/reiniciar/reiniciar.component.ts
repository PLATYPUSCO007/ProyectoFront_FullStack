import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { ParkingService } from '../services/parking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reiniciar',
  templateUrl: './reiniciar.component.html'
})
export class ReiniciarComponent implements OnInit {

  isDisabled: boolean = false;

  constructor(private dialog: MatDialog,
              private serviceParking: ParkingService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  reiniciar(){
     this.dialog.open(DialogComponent, {
      width: '300px'
    }).afterClosed()
    .subscribe(result =>{
      if (result) {

        forkJoin(
          [this.serviceParking.deleteOficial(), this.serviceParking.updateResidente()]
        ).subscribe((result)=>{
          console.log(result);
          
          if (result.length <= 0) {
            this.openSnack('Error en la operacion, no se ejecuta la acción.');
            return;
          }

          this.openSnack('Acción ejecutada con exito!');
        });
        
      }
    })
  }

  openSnack(message: string){
    this._snackBar.open(message, 'X', {
      duration: 3000
    })
  }

}
