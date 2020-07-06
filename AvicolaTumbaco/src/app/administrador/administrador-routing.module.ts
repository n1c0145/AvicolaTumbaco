import { InicioadministradorComponent } from './inicioadministrador/inicioadministrador.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'inicioadministrador',
    component: InicioadministradorComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
