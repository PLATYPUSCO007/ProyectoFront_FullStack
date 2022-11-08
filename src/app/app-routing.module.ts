import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './shared/index/index.component';

const routes: Routes = [{
  path: '',
  component: IndexComponent
},{
  path: 'parking',
  loadChildren: () => import('./parking/parking.module').then(m => m.ParkingModule)
},
  {
  path: '**',
  redirectTo: ''
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
