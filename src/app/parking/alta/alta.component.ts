import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap } from 'rxjs';
import { Vehiculo, TipoVehiculoID } from '../interfaces/vehiculo.interface';
import { ParkingService } from '../services/parking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html'
})
export class AltaComponent implements OnInit {

  type: string = '';
  isDisabled: boolean = false;
  vehiculo: Vehiculo = {
    placa: '',
    tipo_vehiculo_id: TipoVehiculoID.No_Residente
  }

  constructor(private activatedRoute: ActivatedRoute,
              private serviceParking: ParkingService,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({type}) => this.type = type );
  }

  actualizar(){
    if (this.vehiculo.placa.length <= 0) {
      this.openSnack('Ingrese una placa valida!');
      return;
    }
    this.isDisabled = true;
    this.serviceParking.getOrCreateVehiculo(this.vehiculo.placa)
    .pipe(
      tap(result => {
        this.vehiculo.placa = result.placa;
      }),
      tap(result =>{
        if (this.type == 'oficial') {
          this.vehiculo.tipo_vehiculo_id = TipoVehiculoID.Oficial;
          return;
        }else{
          this.vehiculo.tipo_vehiculo_id = TipoVehiculoID.Residente;
          return;
        }
      }),
      switchMap(result => this.serviceParking.updateVehiculo(this.vehiculo))
    ).subscribe(result=>{
      if (result == 1) {
        this.openSnack('Actualizado con Exito!');
        this.vehiculo.placa = '';
        this.vehiculo.tipo_vehiculo_id = TipoVehiculoID.No_Residente;
        this.isDisabled = false;
        this.router.navigate(['/parking/alta/oficial']);
        return;
      }

      this.openSnack('Error, no se actualizo el registro!');
      this.isDisabled = false;
    });
  }

  openSnack(message: string){
    this._snackBar.open(message, 'X', {
      duration: 3000
    })
  }

}
