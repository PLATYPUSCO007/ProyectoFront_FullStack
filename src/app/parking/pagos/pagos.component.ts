import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParkingService } from '../services/parking.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html'
})
export class PagosComponent implements OnInit {

  nameFile: string = '';

  constructor(private _snackBar: MatSnackBar,
              private serviceParking: ParkingService) { }

  ngOnInit(): void {
  }

  generarInforme(){
    if (this.nameFile.length <= 0) {
      this.openSnack('Error, no hay nombre de archivo!');
      return;
    }

    this.serviceParking.generateFile(this.nameFile)
      .subscribe(result=>{
        this.manageFile(result, this.nameFile);
        this.openSnack(`El archivo ${this.nameFile}.csv ha sido generado!`);
        this.nameFile = '';
      });

  }

  manageFile(result: Blob, fileName: string){
    const dataType = result.type;
    const binaryData = [];
    binaryData.push(result);

    const filePath = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  openSnack(message: string){
    this._snackBar.open(message, 'X', {
      duration: 3000
    })
  }

}
