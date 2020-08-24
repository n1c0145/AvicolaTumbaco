import { NuevopedidoComponent } from './nuevopedido/nuevopedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { FacturaComponent } from './factura/factura.component';
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
  {
    path: 'factura',
    component: FacturaComponent,

  },
  {
    path: 'pedidos',
    component: PedidosComponent,

  },
  {
    path: 'nuevopedido',
    component: NuevopedidoComponent,

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
