import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { IniciousuarioComponent } from './iniciousuario/iniciousuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { NuevopedidoComponent } from './nuevopedido/nuevopedido.component';
import { FacturaComponent } from './factura/factura.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  declarations: [
    IniciousuarioComponent,
    PerfilComponent,
    PedidosComponent,
    NuevopedidoComponent,
    FacturaComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    HttpClientModule,
    InputNumberModule,
    CalendarModule,
    ToastModule,
    DialogModule,
    FlexLayoutModule
  ],
})
export class UsuarioModule {}
