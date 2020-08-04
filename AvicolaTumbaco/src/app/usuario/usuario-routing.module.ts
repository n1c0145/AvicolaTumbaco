import { IniciousuarioComponent } from './iniciousuario/iniciousuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from "./perfil/perfil.component";

const routes: Routes = [

  {
    path: 'iniciousuario',
    component: IniciousuarioComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,

  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
