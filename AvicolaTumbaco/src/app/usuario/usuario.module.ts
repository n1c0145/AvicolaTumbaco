import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { IniciousuarioComponent } from './iniciousuario/iniciousuario.component';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [IniciousuarioComponent, PerfilComponent],
  providers:[],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
