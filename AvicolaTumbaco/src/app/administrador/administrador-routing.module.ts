import { VentaproductoComponent } from './ventaproducto/ventaproducto.component';
import { PedidosComponent } from '../administrador/pedidos/pedidos.component';
import { FacturaComponent } from './../administrador/factura/factura.component';
import { DatosempresaComponent } from './datosempresa/datosempresa.component';
import { ProductosComponent } from './productos/productos.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { InventarioComponent } from '../administrador/inventario/inventario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InicioadministradorComponent } from './inicioadministrador/inicioadministrador.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from "../administrador/usuarios/usuarios.component";
import { ProtectGuard } from "../../app/servicios/protect.guard";
const routes: Routes = [
  {
    path: 'inicioadministrador',
    component: InicioadministradorComponent,
    canActivate: [ProtectGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [ProtectGuard]

  },
  {
    path: 'inventario',
    component: InventarioComponent,
    canActivate: [ProtectGuard]

  },
   {
     path: 'productos',
     component: ProductosComponent,
     canActivate: [ProtectGuard]

   },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [ProtectGuard]

  },
  {
    path: 'proveedor',
    component: ProveedorComponent,
    canActivate: [ProtectGuard]

  },
  {
    path: 'datosempresa',
    component: DatosempresaComponent,
    canActivate: [ProtectGuard]

  },
  {
    path: 'factura',
    component: FacturaComponent,
    canActivate: [ProtectGuard]

  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    canActivate: [ProtectGuard]

  },
  {
    path: 'ventaproducto',
    component: VentaproductoComponent,
    canActivate: [ProtectGuard]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
