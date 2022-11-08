import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {

  
  constructor(private dialogRef: MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  onYesClick(){
    this.dialogRef.close(true);
  }

}
