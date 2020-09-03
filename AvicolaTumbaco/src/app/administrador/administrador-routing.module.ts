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
  },
  {
    path: 'inventario',
    component: InventarioComponent,
  },
   {
     path: 'productos',
     component: ProductosComponent,
   },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'proveedor',
    component: ProveedorComponent,
  },
  {
    path: 'datosempresa',
    component: DatosempresaComponent,
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
    path: 'ventaproducto',
    component: VentaproductoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
