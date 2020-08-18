import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { InicioadministradorComponent } from './inicioadministrador/inicioadministrador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InventarioComponent } from './inventario/inventario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductosComponent } from './productos/productos.component';
@NgModule({
  declarations: [
    InicioadministradorComponent,
    PerfilComponent,
    InventarioComponent,
    UsuariosComponent,
    ProveedorComponent,
    ProductosComponent,
  ],
  imports: [CommonModule, 
    AdministradorRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
   
  ],
})
export class AdministradorModule {}
