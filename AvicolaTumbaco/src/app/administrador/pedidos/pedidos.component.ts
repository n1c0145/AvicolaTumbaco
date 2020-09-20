import { Component, OnInit } from '@angular/core';
import { AvicolaService } from './../../servicios/avicola.service';
import { Router } from '@angular/router';
import { Factura } from "../../modelos/factura.interface";
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers: [MessageService]
})
export class PedidosComponent implements OnInit {
facturas;
facturasentregadas;
user;
id;
filterPost ='';
filterPost2 ='';
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this._AvicolaService
      .metodoGet('http://localhost:1337/factura?estado=activo')
      .subscribe((data) => {
        this.facturas = data;
        
      });
      this.user = localStorage.getItem('user');
      this._AvicolaService
        .metodoGet('http://localhost:1337/factura?estado=entregado')
        .subscribe((data) => {
          this.facturasentregadas = data;
          
        });
  }
cambiar(pedido:Factura){
this.id=pedido.id
this._AvicolaService
.metodoPut('http://localhost:1337/factura/' + this.id, {
  estado: 'entregado',
  nombreUsuarioActualizacion: this.user,
})
.subscribe(() => {
this.showSuccess()
});
}
eliminar(pedido:Factura){
  this.id=pedido.id
  this._AvicolaService
  .metodoPut('http://localhost:1337/factura/' + this.id, {
    estado: 'inactivo',
    nombreUsuarioActualizacion: this.user,
  })
  .subscribe(() => {
 this.showError()
  });
  }
  facturar(pedido:Factura){
    this.id=pedido.id
    localStorage.removeItem('idFactura');

    localStorage.setItem('idFactura', JSON.stringify(this.id));
    this._router.navigate(['administrador/factura/']);

  }
  showSuccess() {
    this.messageService.add({severity:'success', detail: 'Pedido entregado'});
return setTimeout('document.location.reload()',2200);


  }
  showError() {
    this.messageService.add({severity:'error', detail: 'Pedido eliminado'});
return setTimeout('document.location.reload()',2200);


  }
  cerrarSesion(){
    this._router.navigate(['inicio/']);
    localStorage.clear()

  }
}
