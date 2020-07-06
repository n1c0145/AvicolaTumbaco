import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { InicioadministradorComponent } from './inicioadministrador/inicioadministrador.component';


@NgModule({
  declarations: [InicioadministradorComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule
  ]
})
export class AdministradorModule { }
