import { ProductosComponent } from './productos/productos.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { InventarioComponent } from '../administrador/inventario/inventario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InicioadministradorComponent } from './inicioadministrador/inicioadministrador.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from "../administrador/usuarios/usuarios.component";
const routes: Routes = [
  {
    path: 'inicioadministrador',
    component: InicioadministradorComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
