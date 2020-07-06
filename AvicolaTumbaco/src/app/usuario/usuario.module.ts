import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { IniciousuarioComponent } from './iniciousuario/iniciousuario.component';


@NgModule({
  declarations: [IniciousuarioComponent],
  providers:[],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
