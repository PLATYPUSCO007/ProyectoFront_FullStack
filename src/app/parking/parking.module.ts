import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AltaComponent } from './alta/alta.component';
import { HomeComponent } from './home/home.component';
import { PagosComponent } from './pagos/pagos.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ReiniciarComponent } from './reiniciar/reiniciar.component';

import { MaterialModule } from '../material/material.module';
import { ParkingRoutingModule } from './parking-routing.module';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AltaComponent,
    HomeComponent,
    PagosComponent,
    ReiniciarComponent,
    RegistrarComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    ParkingRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ParkingModule { }
