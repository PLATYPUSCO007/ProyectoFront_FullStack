import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Estacionamiento } from '../interfaces/estacionamiento.interface';
import { ParkingService } from '../services/parking.service';
import { switchMap } from 'rxjs';
import { Vehiculo } from '../interfaces/vehiculo.interface';

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
  negarRegistro: boolean = true;
  estacionamiento: Estacionamiento = {
    id: '',
    hora_entrada: '',
    hora_salida: '',
    importe: '0',
    total_tiempo: '0',
    vehiculo_placa: "AAA111",
    tipo_vehiculo_id: '',
    nombre: ''
  };

  constructor(private activatedRoute: ActivatedRoute, 
              private _snackBar: MatSnackBar,
              private serviceParking: ParkingService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({type}) => this.type = type);

    if (this.type == 'entrada') {
      this.estacionamiento.hora_entrada = this.transformDate();
    }
  }

  insert(){

    this.estacionamiento.hora_salida = this.estacionamiento.hora_entrada;

    //VALIDAMOS SI EXISTE EL VEHICULO, SI NO, LO CREAMOS
    this.serviceParking.getOrCreateVehiculo(this.estacionamiento.vehiculo_placa)
      .pipe(
        switchMap( vehiculo => this.serviceParking.setEstacionamiento(this.estacionamiento))
      ).subscribe(result =>{

        console.log('Res', result);

        if (result == 1) {
          this.openSnack('Creado con exito');
          this.router.navigate(['/']);
          return;
        }
        
        this.openSnack('Error al registrar la entrada');
    });
    
  }

  registrarSalida(){
    this.serviceParking.updateEstacionamiento(this.estacionamiento)
      .subscribe(result => {
        this.estacionamiento = result;
        this.openSnack('Salida registrada con exito! 👍');
        this.negarRegistro = true;
      });
  }

  openSnack(message: string){
    this._snackBar.open(message, 'X', {
      duration: 3000
    })
  }

  //OBTENER EL FORMATO CORRECTO DE LA FECHA PARA GUARDAR EN LA BD
  transformDate(){
    let date: Date = new Date();
    let fechaString: string = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return fechaString;
  }

  //CUANDO PULSAN LA TECLA ENTER SE DISPARA EL METODO PARA BUSCAR LA INFORMACION DEL ESTACIONAMIENTO
  buscarEstacionamiento(e: KeyboardEvent){
    if (e.key == 'Enter') {
      this.serviceParking.getLastEstacionamiento(this.estacionamiento.vehiculo_placa)
        .subscribe((result) =>{
          this.estacionamiento = result[0];
          //VALIDA SI EL IMPORTE YA HA SIDO CALCULADO, SI ES ASI, NO PERMITE REGISTRAR LA SALIDA, POR QUE ESTA YA SE REGISTRO, DE LO CONTRARIO, HABILITA EL BOTON PARA REGISTRAR LA SALIDA
          if (parseFloat(this.estacionamiento.importe) <= 0) {
            this.estacionamiento.hora_salida = this.transformDate();
            if (this.estacionamiento.nombre !== 'Oficial') {
              this.calcTiempo();
              this.calcImporte();
              this.negarRegistro = false;
              return;
            }
          }
          this.negarRegistro = true;
        });
    }
  }

  calcTiempo(){
    let milseg = new Date(this.estacionamiento.hora_salida).getTime() - new Date(this.estacionamiento.hora_entrada).getTime();
    let sec = milseg / 1000;
    let min = sec / 60;

    // if (this.estacionamiento.nombre == 'Residente') {
    //   this.estacionamiento.total_tiempo = (parseFloat(this.estacionamiento.total_tiempo) + min).toString();
    //   return;  
    // }

    this.estacionamiento.total_tiempo = min.toString();
  }

  calcImporte(){
    let importe = 0.0;

    if (this.estacionamiento.nombre == 'Residente') {
      importe = parseFloat(this.estacionamiento.total_tiempo) * 0.02;
      // this.estacionamiento.importe = (parseFloat(this.estacionamiento.importe) + importe).toString();
    }else{
      importe = parseFloat(this.estacionamiento.total_tiempo) * 0.2;
    }
    this.estacionamiento.importe = importe.toString();
  }

}
