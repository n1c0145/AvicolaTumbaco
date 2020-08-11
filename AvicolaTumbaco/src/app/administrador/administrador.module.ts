import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { InicioadministradorComponent } from './inicioadministrador/inicioadministrador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { ProveedorComponent } from './proveedor/proveedor.component';
@NgModule({
  declarations: [
    InicioadministradorComponent,
    PerfilComponent,
    InventarioComponent,
    ProductosComponent,
    UsuariosComponent,
    ProveedorComponent,
  ],
  imports: [CommonModule, 
    AdministradorRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatDialogModule,
   
  ],
})
export class AdministradorModule {}
