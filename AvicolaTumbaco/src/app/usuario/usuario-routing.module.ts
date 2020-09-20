import { NuevopedidoComponent } from './nuevopedido/nuevopedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { FacturaComponent } from './factura/factura.component';
import { IniciousuarioComponent } from './iniciousuario/iniciousuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from "./perfil/perfil.component";
import { Protect2Guard } from "../servicios/protect2.guard";
const routes: Routes = [

  {
    path: 'iniciousuario',
    component: IniciousuarioComponent,
    canActivate: [Protect2Guard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [Protect2Guard]

  },
  {
    path: 'factura',
    component: FacturaComponent,
    canActivate: [Protect2Guard]

  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    canActivate: [Protect2Guard]

  },
  {
    path: 'nuevopedido',
    component: NuevopedidoComponent,
    canActivate: [Protect2Guard]

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
