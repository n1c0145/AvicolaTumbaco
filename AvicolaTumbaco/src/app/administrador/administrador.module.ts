import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { InicioadministradorComponent } from './inicioadministrador/inicioadministrador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InventarioComponent } from './inventario/inventario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductosComponent } from './productos/productos.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import { DatosempresaComponent } from './datosempresa/datosempresa.component';
import { PedidosComponent } from '../administrador/pedidos/pedidos.component';
import { FacturaComponent } from '../administrador/factura/factura.component';
import { VentaproductoComponent } from './ventaproducto/ventaproducto.component';
import { FiltroPipe } from '../pipes/filtro.pipe';
import { Filtro2Pipe } from '../pipes/filtro2.pipe';
import {ToastModule} from 'primeng/toast';
import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  declarations: [
    InicioadministradorComponent,
    PerfilComponent,
    InventarioComponent,
    UsuariosComponent,
    ProveedorComponent,
    ProductosComponent,
    DatosempresaComponent,
    PedidosComponent,
    FacturaComponent,
    VentaproductoComponent,
    FiltroPipe,
    Filtro2Pipe,
  ],
  imports: [CommonModule, 
    AdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    InputNumberModule,
    RadioButtonModule,
    CalendarModule,
    ToastModule,
    FlexLayoutModule,
  ],
})
export class AdministradorModule {}
