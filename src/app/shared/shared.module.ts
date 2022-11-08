import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

import { MaterialModule } from '../material/material.module';
import { ParkingRoutingModule } from '../parking/parking-routing.module';
import { IndexComponent } from './index/index.component';



@NgModule({
  declarations: [FooterComponent, SidebarComponent, HeaderComponent, IndexComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ParkingRoutingModule
  ],
  exports: [FooterComponent, HeaderComponent]
})
export class SharedModule { }
