import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaComponent } from './alta/alta.component';

import { HomeComponent } from './home/home.component';
import { PagosComponent } from './pagos/pagos.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ReiniciarComponent } from './reiniciar/reiniciar.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {path: '', component: RegistrarComponent},
    {path: 'registrar/:type', component: RegistrarComponent},
    {path: 'alta/:type', component: AltaComponent},
    {path: 'reiniciar', component: ReiniciarComponent},
    {path: 'pagos', component: PagosComponent}
  ]
},
{
  path:'**',
  redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule { }
